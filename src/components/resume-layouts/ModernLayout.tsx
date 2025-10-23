import { LayoutProps } from './index';

const ModernLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-card rounded-lg border shadow-soft overflow-hidden max-w-4xl mx-auto">
      <div className="grid grid-cols-3 gap-0">
        <div className="col-span-1 bg-gradient-to-b from-primary to-accent p-4 text-primary-foreground">
          <div className="space-y-3">
            {photoUrl ? (
              <img 
                src={photoUrl} 
                alt={data.fullName} 
                className="w-full aspect-square rounded-lg object-cover"
              />
            ) : (
              <div className="w-full aspect-square rounded-lg bg-primary-foreground/20 flex items-center justify-center text-4xl font-bold">
                {data.fullName.charAt(0) || "?"}
              </div>
            )}
            
            {(data.contactEmail || data.contactPhone) && (
              <div className="space-y-2">
                <h3 className="font-bold text-sm">Contact</h3>
                {data.contactEmail && (
                  <p className="text-xs break-all">{data.contactEmail}</p>
                )}
                {data.contactPhone && (
                  <p className="text-xs">{data.contactPhone}</p>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="col-span-2 p-5 space-y-3">
          <div>
            <h2 className="text-2xl font-bold">{data.fullName || "Your Name"}</h2>
            <p className="text-sm text-muted-foreground mt-1">{data.title || "Your Title"}</p>
          </div>

          {data.bio && (
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-primary">About</h3>
              <p className="text-xs text-muted-foreground leading-snug">{data.bio}</p>
            </div>
          )}

          {skillsArray.length > 0 && (
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-primary">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {skillsArray.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gradient-to-r from-primary/10 to-accent/10 rounded text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.education && (
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-primary">Education</h3>
              <p className="text-xs text-muted-foreground leading-snug">{data.education}</p>
            </div>
          )}

          {data.projects && (
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-primary">Projects</h3>
              <p className="text-xs text-muted-foreground leading-snug">{data.projects}</p>
            </div>
          )}

          {data.achievements && (
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-primary">Achievements</h3>
              <p className="text-xs text-muted-foreground leading-snug">{data.achievements}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernLayout;
