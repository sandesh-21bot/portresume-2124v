import { LayoutProps } from './index';

const TechLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-card rounded-lg border-2 border-primary/20 shadow-soft font-mono">
      <div className="bg-primary/5 p-4 border-b-2 border-primary/20">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-4 text-sm text-muted-foreground">portfolio.tsx</span>
        </div>
      </div>

      <div className="p-8 space-y-6">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            {photoUrl && (
              <img 
                src={photoUrl} 
                alt={data.fullName} 
                className="w-20 h-20 rounded object-cover border-2 border-primary"
              />
            )}
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">const <span className="text-primary">developer</span> = {'{'}</p>
              <p className="text-sm ml-4 mt-1">name: <span className="text-accent">"{data.fullName || "Your Name"}"</span>,</p>
              <p className="text-sm ml-4">role: <span className="text-accent">"{data.title || "Your Title"}"</span>,</p>
            </div>
          </div>

          {data.bio && (
            <div className="ml-4">
              <p className="text-sm">bio: <span className="text-accent">"{data.bio}"</span>,</p>
            </div>
          )}

          {skillsArray.length > 0 && (
            <div className="ml-4">
              <p className="text-sm">skills: [</p>
              {skillsArray.map((skill, idx) => (
                <p key={idx} className="text-sm ml-4 text-accent">
                  "{skill}"{idx < skillsArray.length - 1 ? ',' : ''}
                </p>
              ))}
              <p className="text-sm">],</p>
            </div>
          )}

          {data.education && (
            <div className="ml-4">
              <p className="text-sm">education: <span className="text-accent">"{data.education}"</span>,</p>
            </div>
          )}

          {data.projects && (
            <div className="ml-4">
              <p className="text-sm">projects: <span className="text-accent">"{data.projects}"</span>,</p>
            </div>
          )}

          {data.achievements && (
            <div className="ml-4">
              <p className="text-sm">achievements: <span className="text-accent">"{data.achievements}"</span>,</p>
            </div>
          )}

          {(data.contactEmail || data.contactPhone) && (
            <div className="ml-4">
              <p className="text-sm">contact: {'{'}</p>
              {data.contactEmail && (
                <p className="text-sm ml-4">email: <span className="text-accent">"{data.contactEmail}"</span>,</p>
              )}
              {data.contactPhone && (
                <p className="text-sm ml-4">phone: <span className="text-accent">"{data.contactPhone}"</span>,</p>
              )}
              <p className="text-sm">{'}'}</p>
            </div>
          )}

          <p className="text-sm">{'}'}</p>
        </div>
      </div>
    </div>
  );
};

export default TechLayout;
