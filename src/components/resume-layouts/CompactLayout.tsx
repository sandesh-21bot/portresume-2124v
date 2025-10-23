import { LayoutProps } from './index';

const CompactLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-card rounded-lg border shadow-soft p-4 space-y-2.5 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        {photoUrl ? (
          <img 
            src={photoUrl} 
            alt={data.fullName} 
            className="w-14 h-14 rounded object-cover border border-primary/20"
          />
        ) : (
          <div className="w-14 h-14 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg font-bold text-primary-foreground border border-primary/20">
            {data.fullName.charAt(0) || "?"}
          </div>
        )}
        
        <div className="flex-1">
          <h2 className="text-xl font-bold">{data.fullName || "Your Name"}</h2>
          <p className="text-xs text-muted-foreground">{data.title || "Your Title"}</p>
          <div className="flex gap-2 mt-1 text-[10px] text-muted-foreground">
            {data.contactEmail && <span>{data.contactEmail}</span>}
            {data.contactPhone && <span>{data.contactPhone}</span>}
          </div>
        </div>
      </div>

      {data.bio && (
        <p className="text-xs text-muted-foreground leading-snug">{data.bio}</p>
      )}

      {skillsArray.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold text-primary mb-1">SKILLS</p>
          <div className="flex flex-wrap gap-1">
            {skillsArray.map((skill, idx) => (
              <span
                key={idx}
                className="px-1.5 py-0.5 bg-primary/10 text-primary rounded text-[10px]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.education && (
        <div>
          <p className="text-[10px] font-semibold text-primary mb-1">EDUCATION</p>
          <p className="text-xs text-muted-foreground leading-snug">{data.education}</p>
        </div>
      )}

      {data.projects && (
        <div>
          <p className="text-[10px] font-semibold text-primary mb-1">PROJECTS</p>
          <p className="text-xs text-muted-foreground leading-snug">{data.projects}</p>
        </div>
      )}

      {data.achievements && (
        <div>
          <p className="text-[10px] font-semibold text-primary mb-1">ACHIEVEMENTS</p>
          <p className="text-xs text-muted-foreground leading-snug">{data.achievements}</p>
        </div>
      )}
    </div>
  );
};


export default CompactLayout;
