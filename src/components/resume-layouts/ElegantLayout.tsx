import { LayoutProps } from './index';

const ElegantLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-card rounded-xl border shadow-elegant p-10 space-y-8">
      <div className="text-center space-y-4 pb-6 border-b-2">
        {photoUrl ? (
          <img 
            src={photoUrl} 
            alt={data.fullName} 
            className="w-32 h-32 rounded-full object-cover mx-auto ring-2 ring-primary/30 ring-offset-4 ring-offset-card"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-bold text-primary-foreground mx-auto ring-2 ring-primary/30 ring-offset-4 ring-offset-card">
            {data.fullName.charAt(0) || "?"}
          </div>
        )}
        
        <div>
          <h2 className="text-4xl font-serif font-bold tracking-wide">{data.fullName || "Your Name"}</h2>
          <p className="text-lg text-muted-foreground italic mt-2">{data.title || "Your Title"}</p>
        </div>
      </div>

      {data.bio && (
        <div className="space-y-3">
          <h3 className="text-center text-sm font-serif uppercase tracking-widest text-primary">About</h3>
          <p className="text-center text-muted-foreground leading-relaxed max-w-xl mx-auto">{data.bio}</p>
        </div>
      )}

      {skillsArray.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-center text-sm font-serif uppercase tracking-widest text-primary">Expertise</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skillsArray.map((skill, idx) => (
              <span
                key={idx}
                className="px-4 py-1.5 border-2 border-primary/20 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.education && (
        <div className="space-y-3">
          <h3 className="text-center text-sm font-serif uppercase tracking-widest text-primary">Education</h3>
          <p className="text-center text-muted-foreground leading-relaxed max-w-xl mx-auto">{data.education}</p>
        </div>
      )}

      {data.projects && (
        <div className="space-y-3">
          <h3 className="text-center text-sm font-serif uppercase tracking-widest text-primary">Projects</h3>
          <p className="text-center text-muted-foreground leading-relaxed max-w-xl mx-auto">{data.projects}</p>
        </div>
      )}

      {data.achievements && (
        <div className="space-y-3">
          <h3 className="text-center text-sm font-serif uppercase tracking-widest text-primary">Achievements</h3>
          <p className="text-center text-muted-foreground leading-relaxed max-w-xl mx-auto">{data.achievements}</p>
        </div>
      )}

      {(data.contactEmail || data.contactPhone) && (
        <div className="space-y-2 pt-6 border-t-2 text-center">
          {data.contactEmail && (
            <p className="text-sm text-muted-foreground">{data.contactEmail}</p>
          )}
          {data.contactPhone && (
            <p className="text-sm text-muted-foreground">{data.contactPhone}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ElegantLayout;
