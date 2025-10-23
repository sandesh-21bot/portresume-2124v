import { LayoutProps } from './index';

const ProfessionalLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-card rounded-lg border shadow-soft max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-primary to-accent p-4 text-primary-foreground">
        <div className="flex items-center gap-4">
          {photoUrl ? (
            <img 
              src={photoUrl} 
              alt={data.fullName} 
              className="w-20 h-20 rounded-lg object-cover border-2 border-primary-foreground/20"
            />
          ) : (
            <div className="w-20 h-20 rounded-lg bg-primary-foreground/20 flex items-center justify-center text-2xl font-bold border-2 border-primary-foreground/20">
              {data.fullName.charAt(0) || "?"}
            </div>
          )}
          
          <div>
            <h2 className="text-2xl font-bold">{data.fullName || "Your Name"}</h2>
            <p className="text-sm mt-1 opacity-90">{data.title || "Your Title"}</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-3">
        {data.bio && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-1.5 text-primary">Professional Summary</h3>
            <p className="text-xs text-muted-foreground leading-snug">{data.bio}</p>
          </div>
        )}

        {skillsArray.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-1.5 text-primary">Core Competencies</h3>
            <div className="grid grid-cols-2 gap-1.5">
              {skillsArray.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span className="text-xs">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-1.5 text-primary">Education</h3>
            <p className="text-xs text-muted-foreground leading-snug">{data.education}</p>
          </div>
        )}

        {data.projects && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-1.5 text-primary">Projects</h3>
            <p className="text-xs text-muted-foreground leading-snug">{data.projects}</p>
          </div>
        )}

        {data.achievements && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-1.5 text-primary">Achievements</h3>
            <p className="text-xs text-muted-foreground leading-snug">{data.achievements}</p>
          </div>
        )}

        {(data.contactEmail || data.contactPhone) && (
          <div className="pt-2 border-t">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-1.5 text-primary">Contact Information</h3>
            <div className="space-y-1">
              {data.contactEmail && (
                <p className="text-xs text-muted-foreground">Email: {data.contactEmail}</p>
              )}
              {data.contactPhone && (
                <p className="text-xs text-muted-foreground">Phone: {data.contactPhone}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalLayout;
