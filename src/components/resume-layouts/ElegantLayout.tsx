import { LayoutProps } from './index';

const ElegantLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-card rounded-lg border shadow-elegant p-5 space-y-3 max-w-4xl mx-auto">
      <div className="text-center space-y-2 pb-3 border-b">
        {photoUrl ? (
          <img 
            src={photoUrl} 
            alt={data.fullName} 
            className="w-20 h-20 rounded-full object-cover mx-auto ring-2 ring-primary/30 ring-offset-2 ring-offset-card"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto ring-2 ring-primary/30 ring-offset-2 ring-offset-card">
            {data.fullName.charAt(0) || "?"}
          </div>
        )}
        
        <div>
          <h2 className="text-2xl font-serif font-bold tracking-wide">{data.fullName || "Your Name"}</h2>
          <p className="text-sm text-muted-foreground italic mt-1">{data.title || "Your Title"}</p>
        </div>
      </div>

      {data.bio && (
        <div className="space-y-1">
          <h3 className="text-center text-xs font-serif uppercase tracking-widest text-primary">About</h3>
          <p className="text-center text-xs text-muted-foreground leading-snug max-w-xl mx-auto">{data.bio}</p>
        </div>
      )}

      {skillsArray.length > 0 && (
        <div className="space-y-1.5">
          <h3 className="text-center text-xs font-serif uppercase tracking-widest text-primary">Expertise</h3>
          <div className="flex flex-wrap justify-center gap-1.5">
            {skillsArray.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 border border-primary/20 rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.education && (
        <div className="space-y-1">
          <h3 className="text-center text-xs font-serif uppercase tracking-widest text-primary">Education</h3>
          <p className="text-center text-xs text-muted-foreground leading-snug max-w-xl mx-auto">{data.education}</p>
        </div>
      )}

      {data.projects && (
        <div className="space-y-1">
          <h3 className="text-center text-xs font-serif uppercase tracking-widest text-primary">Projects</h3>
          <p className="text-center text-xs text-muted-foreground leading-snug max-w-xl mx-auto">{data.projects}</p>
        </div>
      )}

      {data.achievements && (
        <div className="space-y-1">
          <h3 className="text-center text-xs font-serif uppercase tracking-widest text-primary">Achievements</h3>
          <p className="text-center text-xs text-muted-foreground leading-snug max-w-xl mx-auto">{data.achievements}</p>
        </div>
      )}

      {(data.contactEmail || data.contactPhone) && (
        <div className="space-y-1 pt-3 border-t text-center">
          {data.contactEmail && (
            <p className="text-xs text-muted-foreground">{data.contactEmail}</p>
          )}
          {data.contactPhone && (
            <p className="text-xs text-muted-foreground">{data.contactPhone}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ElegantLayout;
