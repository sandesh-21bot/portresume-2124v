import { LayoutProps } from './index';

const ProfessionalLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-card rounded-lg border-2 shadow-soft">
      <div className="bg-gradient-to-r from-primary to-accent p-8 text-primary-foreground">
        <div className="flex items-center gap-6">
          {photoUrl ? (
            <img 
              src={photoUrl} 
              alt={data.fullName} 
              className="w-28 h-28 rounded-lg object-cover border-4 border-primary-foreground/20"
            />
          ) : (
            <div className="w-28 h-28 rounded-lg bg-primary-foreground/20 flex items-center justify-center text-4xl font-bold border-4 border-primary-foreground/20">
              {data.fullName.charAt(0) || "?"}
            </div>
          )}
          
          <div>
            <h2 className="text-4xl font-bold">{data.fullName || "Your Name"}</h2>
            <p className="text-xl mt-2 opacity-90">{data.title || "Your Title"}</p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {data.bio && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-primary">Professional Summary</h3>
            <p className="text-muted-foreground leading-relaxed">{data.bio}</p>
          </div>
        )}

        {skillsArray.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-primary">Core Competencies</h3>
            <div className="grid grid-cols-2 gap-2">
              {skillsArray.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-primary">Education</h3>
            <p className="text-muted-foreground leading-relaxed">{data.education}</p>
          </div>
        )}

        {data.projects && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-primary">Projects</h3>
            <p className="text-muted-foreground leading-relaxed">{data.projects}</p>
          </div>
        )}

        {data.achievements && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-primary">Achievements</h3>
            <p className="text-muted-foreground leading-relaxed">{data.achievements}</p>
          </div>
        )}

        {(data.contactEmail || data.contactPhone) && (
          <div className="pt-4 border-t">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-primary">Contact Information</h3>
            <div className="space-y-2">
              {data.contactEmail && (
                <p className="text-sm text-muted-foreground">Email: {data.contactEmail}</p>
              )}
              {data.contactPhone && (
                <p className="text-sm text-muted-foreground">Phone: {data.contactPhone}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalLayout;
