import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Extract and verify user from JWT
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Rate limiting: Check last 10 enhancements in the past hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { data: recentLogs, error: logsError } = await supabase
      .from('ai_enhancement_logs')
      .select('id')
      .eq('user_id', user.id)
      .gte('enhanced_at', oneHourAgo);

    if (logsError) {
      console.error('Error checking rate limit:', logsError);
    } else if (recentLogs && recentLogs.length >= 10) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Maximum 10 enhancements per hour.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Log the enhancement request
    const { error: logError } = await supabase
      .from('ai_enhancement_logs')
      .insert({ user_id: user.id, enhanced_at: new Date().toISOString() });

    if (logError) {
      console.error('Error logging enhancement:', logError);
    }

    const { bio, projects, title } = await req.json();

    // Input validation
    const MAX_BIO_LENGTH = 2000;
    const MAX_PROJECTS_LENGTH = 5000;
    const MAX_TITLE_LENGTH = 200;

    if (bio && (typeof bio !== 'string' || bio.length > MAX_BIO_LENGTH)) {
      return new Response(
        JSON.stringify({ error: `Bio must be a string with maximum ${MAX_BIO_LENGTH} characters` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (projects && (typeof projects !== 'string' || projects.length > MAX_PROJECTS_LENGTH)) {
      return new Response(
        JSON.stringify({ error: `Projects must be a string with maximum ${MAX_PROJECTS_LENGTH} characters` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (title && (typeof title !== 'string' || title.length > MAX_TITLE_LENGTH)) {
      return new Response(
        JSON.stringify({ error: `Title must be a string with maximum ${MAX_TITLE_LENGTH} characters` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('Enhancing content with AI...');

    const bioPrompt = bio ? `Enhance this professional bio to sound more professional and engaging while keeping it concise (max 150 words): "${bio}"` : null;
    const projectsPrompt = projects ? `Enhance these project descriptions to sound more professional and highlight key achievements: "${projects}"` : null;
    const titleContext = title ? ` (Professional title: ${title})` : '';

    let enhancedBio = bio;
    let enhancedProjects = projects;

    if (bioPrompt) {
      const bioResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { role: 'system', content: `You are a professional portfolio content writer${titleContext}. Enhance the provided content to be more professional, engaging, and impactful while maintaining authenticity. Keep responses concise.` },
            { role: 'user', content: bioPrompt }
          ],
        }),
      });

      if (bioResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (bioResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (!bioResponse.ok) {
        const errorText = await bioResponse.text();
        console.error('Bio enhancement error:', bioResponse.status, errorText);
        throw new Error(`AI gateway error: ${bioResponse.status}`);
      }

      const bioData = await bioResponse.json();
      enhancedBio = bioData.choices[0].message.content;
      console.log('Bio enhanced successfully');
    }

    if (projectsPrompt) {
      const projectsResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { role: 'system', content: 'You are a professional portfolio content writer. Enhance project descriptions to highlight technical skills, impact, and achievements. Be concise and professional.' },
            { role: 'user', content: projectsPrompt }
          ],
        }),
      });

      if (!projectsResponse.ok) {
        const errorText = await projectsResponse.text();
        console.error('Projects enhancement error:', projectsResponse.status, errorText);
      } else {
        const projectsData = await projectsResponse.json();
        enhancedProjects = projectsData.choices[0].message.content;
        console.log('Projects enhanced successfully');
      }
    }

    return new Response(
      JSON.stringify({ enhancedBio, enhancedProjects }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in enhance-content function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});