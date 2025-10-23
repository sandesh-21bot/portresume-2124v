import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-6xl mx-auto text-center space-y-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Resume Builder</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Build Your Dream
          <span className="block bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            Resume in Minutes
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Create stunning resumes with AI-powered content generation. 
          Export to PDF instantly. No design skills required.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary-glow hover:shadow-elegant transition-all duration-300 hover:scale-105"
            onClick={() => navigate("/auth")}
          >
            <Zap className="w-5 h-5 mr-2" />
            Get Started Free
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg px-8 py-6 border-2 hover:bg-secondary transition-all duration-300"
            onClick={() => navigate("/auth")}
          >
            <Download className="w-5 h-5 mr-2" />
            View Demo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto">
          {[
            {
              icon: Sparkles,
              title: "AI Content Generation",
              description: "Let AI craft professional descriptions for your projects and experience"
            },
            {
              icon: Zap,
              title: "Instant Resume",
              description: "Generate a beautiful resume in seconds with your information"
            },
            {
              icon: Download,
              title: "PDF Export",
              description: "Download your resume as a professionally formatted PDF"
            }
          ].map((feature, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-2xl bg-card border border-border hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;