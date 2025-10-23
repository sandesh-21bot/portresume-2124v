import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Sparkles, LogOut, Upload, FileDown } from "lucide-react";
import { User, Session } from "@supabase/supabase-js";
import ResumePreview from "@/components/ResumePreview";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { layoutOptions, LayoutType } from "@/components/resume-layouts";
import { Checkbox } from "@/components/ui/checkbox";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>('classic');
  const previewRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    bio: "",
    skills: "",
    education: "",
    projects: "",
    contactEmail: "",
    contactPhone: "",
    dateOfBirth: "",
    linkedinUrl: "",
    address: "",
    careerObjective: "",
    achievements: "",
  });

  const [visibilitySettings, setVisibilitySettings] = useState({
    profilePhoto: true,
    fullName: true,
    title: true,
    bio: true,
    skills: true,
    education: true,
    projects: true,
    contactEmail: true,
    contactPhone: true,
    dateOfBirth: true,
    linkedinUrl: true,
    address: true,
    careerObjective: true,
    achievements: true,
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/auth");
      } else {
        loadUserData(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadUserData = async (userId: string) => {
    const { data: resume } = await supabase
      .from("resumes")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (resume) {
      setFormData({
        fullName: resume.full_name || "",
        title: resume.title || "",
        bio: resume.bio || "",
        skills: Array.isArray(resume.skills) ? resume.skills.join(", ") : "",
        education: typeof resume.education === 'string' ? resume.education : "",
        projects: typeof resume.projects === 'string' ? resume.projects : "",
        contactEmail: resume.contact_email || "",
        contactPhone: resume.contact_phone || "",
        dateOfBirth: resume.date_of_birth || "",
        linkedinUrl: resume.linkedin_url || "",
        address: resume.address || "",
        careerObjective: resume.career_objective || "",
        achievements: typeof resume.achievements === 'string' ? resume.achievements : "",
      });
      setPhotoUrl(resume.profile_photo_url || "");
      
      if (resume.visibility_settings) {
        setVisibilitySettings(resume.visibility_settings as any);
      }
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setPhotoFile(file);
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;
    
    const { error: uploadError, data } = await supabase.storage
      .from('profile-photos')
      .upload(fileName, file);

    if (uploadError) {
      toast.error("Failed to upload photo");
      return;
    }

    // Use signed URL for private bucket (expires in 1 year)
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from('profile-photos')
      .createSignedUrl(fileName, 31536000); // 1 year in seconds

    if (signedUrlError || !signedUrlData?.signedUrl) {
      toast.error("Failed to generate photo URL");
      return;
    }

    setPhotoUrl(signedUrlData.signedUrl);
    toast.success("Photo uploaded!");
  };

  const handleEnhanceContent = async () => {
    if (!formData.bio && !formData.projects) {
      toast.error("Please enter some content to enhance");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('enhance-content', {
        body: { 
          bio: formData.bio,
          projects: formData.projects,
          title: formData.title
        }
      });

      if (error) throw error;

      setFormData(prev => ({
        ...prev,
        bio: data.enhancedBio || prev.bio,
        projects: data.enhancedProjects || prev.projects
      }));

      toast.success("Content enhanced with AI!");
    } catch (error: any) {
      toast.error(error.message || "Failed to enhance content");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveResume = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const resumeData = {
        user_id: user.id,
        full_name: formData.fullName,
        title: formData.title,
        bio: formData.bio,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        education: formData.education || null,
        projects: formData.projects || null,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone,
        profile_photo_url: photoUrl,
        date_of_birth: formData.dateOfBirth || null,
        linkedin_url: formData.linkedinUrl || null,
        address: formData.address || null,
        career_objective: formData.careerObjective || null,
        achievements: formData.achievements || null,
        visibility_settings: visibilitySettings,
      };

      const { error } = await supabase
        .from('resumes')
        .upsert(resumeData);

      if (error) throw error;

      toast.success("Resume saved successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to save resume");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      if (!previewRef.current) {
        toast.error("Nothing to export");
        return;
      }

      const element = previewRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        onclone: (doc) => {
          // Ensure images are cloned with crossOrigin to avoid tainting
          doc.querySelectorAll('img').forEach((img) => {
            try { (img as HTMLImageElement).crossOrigin = 'anonymous'; } catch {}
          });
        },
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = -(imgHeight - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = `${formData.fullName.replace(/\s+/g, '_') || 'Resume'}_Resume.pdf`;
      pdf.save(fileName);

      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Resume Builder
          </h1>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>Fill in your details to create your resume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Checkbox
                      id="visibility-photo"
                      checked={visibilitySettings.profilePhoto}
                      onCheckedChange={(checked) => 
                        setVisibilitySettings({ ...visibilitySettings, profilePhoto: checked as boolean })
                      }
                    />
                    <Label htmlFor="photo" className="cursor-pointer">Profile Photo</Label>
                  </div>
                  <div className="flex gap-4 items-center">
                    {photoUrl && (
                      <img src={photoUrl} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                    )}
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="visibility-fullName"
                      checked={visibilitySettings.fullName}
                      onCheckedChange={(checked) => 
                        setVisibilitySettings({ ...visibilitySettings, fullName: checked as boolean })
                      }
                    />
                    <Label htmlFor="fullName" className="cursor-pointer">Full Name</Label>
                  </div>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="visibility-title"
                      checked={visibilitySettings.title}
                      onCheckedChange={(checked) => 
                        setVisibilitySettings({ ...visibilitySettings, title: checked as boolean })
                      }
                    />
                    <Label htmlFor="title" className="cursor-pointer">Professional Title</Label>
                  </div>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Software Engineer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="visibility-bio"
                      checked={visibilitySettings.bio}
                      onCheckedChange={(checked) => 
                        setVisibilitySettings({ ...visibilitySettings, bio: checked as boolean })
                      }
                    />
                    <Label htmlFor="bio" className="cursor-pointer">Bio</Label>
                  </div>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="visibility-skills"
                      checked={visibilitySettings.skills}
                      onCheckedChange={(checked) => 
                        setVisibilitySettings({ ...visibilitySettings, skills: checked as boolean })
                      }
                    />
                    <Label htmlFor="skills" className="cursor-pointer">Skills (comma-separated)</Label>
                  </div>
                  <Input
                    id="skills"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="React, TypeScript, Node.js"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="visibility-education"
                      checked={visibilitySettings.education}
                      onCheckedChange={(checked) => 
                        setVisibilitySettings({ ...visibilitySettings, education: checked as boolean })
                      }
                    />
                    <Label htmlFor="education" className="cursor-pointer">Education</Label>
                  </div>
                  <Textarea
                    id="education"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    placeholder='B.Tech in Computer Science - XYZ University (2020)'
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="visibility-projects"
                      checked={visibilitySettings.projects}
                      onCheckedChange={(checked) => 
                        setVisibilitySettings({ ...visibilitySettings, projects: checked as boolean })
                      }
                    />
                    <Label htmlFor="projects" className="cursor-pointer">Projects</Label>
                  </div>
                  <Textarea
                    id="projects"
                    value={formData.projects}
                    onChange={(e) => setFormData({ ...formData, projects: e.target.value })}
                    placeholder='E-commerce Website - Built with React and Node.js'
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="visibility-contactEmail"
                      checked={visibilitySettings.contactEmail}
                      onCheckedChange={(checked) => 
                        setVisibilitySettings({ ...visibilitySettings, contactEmail: checked as boolean })
                      }
                    />
                    <Label htmlFor="contactEmail" className="cursor-pointer">Contact Email</Label>
                  </div>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="visibility-contactPhone"
                      checked={visibilitySettings.contactPhone}
                      onCheckedChange={(checked) => 
                        setVisibilitySettings({ ...visibilitySettings, contactPhone: checked as boolean })
                      }
                    />
                    <Label htmlFor="contactPhone" className="cursor-pointer">Contact Phone</Label>
                  </div>
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="visibility-dateOfBirth"
                      checked={visibilitySettings.dateOfBirth}
                      onCheckedChange={(checked) => 
                        setVisibilitySettings({ ...visibilitySettings, dateOfBirth: checked as boolean })
                      }
                    />
                    <Label htmlFor="dateOfBirth" className="cursor-pointer">Date of Birth</Label>
                  </div>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="visibility-linkedinUrl"
                      checked={visibilitySettings.linkedinUrl}
                      onCheckedChange={(checked) => 
                        setVisibilitySettings({ ...visibilitySettings, linkedinUrl: checked as boolean })
                      }
                    />
                    <Label htmlFor="linkedinUrl" className="cursor-pointer">LinkedIn URL</Label>
                  </div>
                  <Input
                    id="linkedinUrl"
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="visibility-address"
                      checked={visibilitySettings.address}
                      onCheckedChange={(checked) => 
                        setVisibilitySettings({ ...visibilitySettings, address: checked as boolean })
                      }
                    />
                    <Label htmlFor="address" className="cursor-pointer">Address</Label>
                  </div>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="City, State, Country - Postal Code"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="visibility-careerObjective"
                      checked={visibilitySettings.careerObjective}
                      onCheckedChange={(checked) => 
                        setVisibilitySettings({ ...visibilitySettings, careerObjective: checked as boolean })
                      }
                    />
                    <Label htmlFor="careerObjective" className="cursor-pointer">Career Objective</Label>
                  </div>
                  <Textarea
                    id="careerObjective"
                    value={formData.careerObjective}
                    onChange={(e) => setFormData({ ...formData, careerObjective: e.target.value })}
                    placeholder="Your career goals and objectives..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="visibility-achievements"
                      checked={visibilitySettings.achievements}
                      onCheckedChange={(checked) => 
                        setVisibilitySettings({ ...visibilitySettings, achievements: checked as boolean })
                      }
                    />
                    <Label htmlFor="achievements" className="cursor-pointer">Achievements</Label>
                  </div>
                  <Textarea
                    id="achievements"
                    value={formData.achievements}
                    onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                    placeholder='Won first place in hackathon 2023'
                    rows={3}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleEnhanceContent}
                    disabled={isLoading}
                    variant="outline"
                    className="flex-1"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Enhance with AI
                  </Button>
                  <Button
                    onClick={handleSaveResume}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-primary to-primary-glow"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Save Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>Choose a layout and preview your resume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="layout" className="text-lg font-semibold text-primary">
                    Select Layout for the Resume
                  </Label>
                  <Select value={selectedLayout} onValueChange={(value) => setSelectedLayout(value as LayoutType)}>
                    <SelectTrigger id="layout" className="border-primary/50">
                      <SelectValue placeholder="Select a layout" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {layoutOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label} - {option.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div id="pdf-preview" ref={previewRef}>
                  <ResumePreview 
                    data={formData} 
                    photoUrl={photoUrl} 
                    layout={selectedLayout}
                    visibilitySettings={visibilitySettings}
                  />
                </div>
                
                <Button 
                  onClick={handleExportPDF}
                  className="w-full bg-gradient-to-r from-accent to-primary"
                >
                  <FileDown className="w-4 h-4 mr-2" />
                  Export as PDF
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;