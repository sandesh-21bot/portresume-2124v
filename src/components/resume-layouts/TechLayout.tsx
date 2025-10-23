import { LayoutProps } from './index';

const TechLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-card rounded-lg border border-primary/20 shadow-soft font-mono max-w-4xl mx-auto">
      <div className="bg-primary/5 p-2 border-b border-primary/20">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="ml-2 text-xs text-muted-foreground">resume.tsx</span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="space-y-1.5">
          <div className="flex items-start gap-3">
            {photoUrl && (
              <img 
                src={photoUrl} 
                alt={data.fullName} 
                className="w-12 h-12 rounded object-cover border border-primary"
              />
            )}
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">const <span className="text-primary">developer</span> = {'{'}</p>
              <p className="text-xs ml-3 mt-0.5">name: <span className="text-accent">"{data.fullName || "Your Name"}"</span>,</p>
              <p className="text-xs ml-3">role: <span className="text-accent">"{data.title || "Your Title"}"</span>,</p>
            </div>
          </div>

          {data.bio && (
            <div className="ml-3">
              <p className="text-xs">bio: <span className="text-accent">"{data.bio}"</span>,</p>
            </div>
          )}

          {skillsArray.length > 0 && (
            <div className="ml-3">
              <p className="text-xs">skills: [</p>
              {skillsArray.map((skill, idx) => (
                <p key={idx} className="text-xs ml-3 text-accent">
                  "{skill}"{idx < skillsArray.length - 1 ? ',' : ''}
                </p>
              ))}
              <p className="text-xs">],</p>
            </div>
          )}

          {data.education && (
            <div className="ml-3">
              <p className="text-xs">education: <span className="text-accent">"{data.education}"</span>,</p>
            </div>
          )}

          {data.projects && (
            <div className="ml-3">
              <p className="text-xs">projects: <span className="text-accent">"{data.projects}"</span>,</p>
            </div>
          )}

          {data.achievements && (
            <div className="ml-3">
              <p className="text-xs">achievements: <span className="text-accent">"{data.achievements}"</span>,</p>
            </div>
          )}

          {(data.contactEmail || data.contactPhone) && (
            <div className="ml-3">
              <p className="text-xs">contact: {'{'}</p>
              {data.contactEmail && (
                <p className="text-xs ml-3">email: <span className="text-accent">"{data.contactEmail}"</span>,</p>
              )}
              {data.contactPhone && (
                <p className="text-xs ml-3">phone: <span className="text-accent">"{data.contactPhone}"</span>,</p>
              )}
              <p className="text-xs">{'}'}</p>
            </div>
          )}

          <p className="text-xs">{'}'}</p>
        </div>
      </div>
    </div>
  );
};

export default TechLayout;
