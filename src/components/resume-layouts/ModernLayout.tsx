import { LayoutProps } from './index';

const ModernLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-card rounded-xl border-2 shadow-soft overflow-hidden">
      <div className="grid grid-cols-3 gap-0">
        <div className="col-span-1 bg-gradient-to-b from-primary to-accent p-6 text-primary-foreground">
          <div className="space-y-6">
            {photoUrl ? (
              <img 
                src={photoUrl} 
                alt={data.fullName} 
                className="w-full aspect-square rounded-lg object-cover"
              />
            ) : (
              <div className="w-full aspect-square rounded-lg bg-primary-foreground/20 flex items-center justify-center text-6xl font-bold">
                {data.fullName.charAt(0) || "?"}
              </div>
            )}
            
            {(data.contactEmail || data.contactPhone) && (
              <div className="space-y-3">
                <h3 className="font-bold text-lg">Contact</h3>
                {data.contactEmail && (
                  <p className="text-sm break-all">{data.contactEmail}</p>
                )}
                {data.contactPhone && (
                  <p className="text-sm">{data.contactPhone}</p>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="col-span-2 p-8 space-y-6">
          <div>
            <h2 className="text-4xl font-bold">{data.fullName || "Your Name"}</h2>
            <p className="text-xl text-muted-foreground mt-2">{data.title || "Your Title"}</p>
          </div>

          {data.bio && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">About</h3>
              <p className="text-muted-foreground leading-relaxed">{data.bio}</p>
            </div>
          )}

          {skillsArray.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-primary">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skillsArray.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.education && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">Education</h3>
              <p className="text-muted-foreground leading-relaxed">{data.education}</p>
            </div>
          )}

          {data.projects && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">Projects</h3>
              <p className="text-muted-foreground leading-relaxed">{data.projects}</p>
            </div>
          )}

          {data.achievements && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">Achievements</h3>
              <p className="text-muted-foreground leading-relaxed">{data.achievements}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernLayout;
