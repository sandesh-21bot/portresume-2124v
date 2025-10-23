import { LayoutProps } from './index';

const CompactLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-card rounded-lg border shadow-soft p-6 space-y-4">
      <div className="flex items-center gap-4">
        {photoUrl ? (
          <img 
            src={photoUrl} 
            alt={data.fullName} 
            className="w-20 h-20 rounded object-cover border-2 border-primary/20"
          />
        ) : (
          <div className="w-20 h-20 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground border-2 border-primary/20">
            {data.fullName.charAt(0) || "?"}
          </div>
        )}
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{data.fullName || "Your Name"}</h2>
          <p className="text-sm text-muted-foreground">{data.title || "Your Title"}</p>
          <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
            {data.contactEmail && <span>{data.contactEmail}</span>}
            {data.contactPhone && <span>{data.contactPhone}</span>}
          </div>
        </div>
      </div>

      {data.bio && (
        <p className="text-sm text-muted-foreground leading-relaxed">{data.bio}</p>
      )}

      {skillsArray.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-primary mb-2">SKILLS</p>
          <div className="flex flex-wrap gap-1.5">
            {skillsArray.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.education && (
        <div>
          <p className="text-xs font-semibold text-primary mb-2">EDUCATION</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{data.education}</p>
        </div>
      )}

      {data.projects && (
        <div>
          <p className="text-xs font-semibold text-primary mb-2">PROJECTS</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{data.projects}</p>
        </div>
      )}

      {data.achievements && (
        <div>
          <p className="text-xs font-semibold text-primary mb-2">ACHIEVEMENTS</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{data.achievements}</p>
        </div>
      )}
    </div>
  );
};


export default CompactLayout;
