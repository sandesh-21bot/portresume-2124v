import { LayoutProps } from './index';

const ArtisticLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-card rounded-2xl border shadow-elegant overflow-hidden max-w-4xl mx-auto">
      <div className="relative">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/20 to-transparent rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent/20 to-transparent rounded-full -ml-16 -mb-16"></div>
        
        <div className="relative p-5 space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold leading-tight max-w-md">
                {data.fullName || "Your Name"}
              </h2>
              <p className="text-sm text-primary font-medium">{data.title || "Your Title"}</p>
            </div>
            
            {photoUrl && (
              <img 
                src={photoUrl} 
                alt={data.fullName} 
                className="w-20 h-20 rounded-xl object-cover shadow-elegant rotate-2"
              />
            )}
          </div>

          {data.bio && (
            <div className="bg-gradient-to-r from-primary/5 to-transparent p-3 rounded-xl">
              <p className="text-xs text-muted-foreground leading-snug">{data.bio}</p>
            </div>
          )}

          {skillsArray.length > 0 && (
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-1.5">
                {skillsArray.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-card border border-primary/20 hover:border-primary rounded-lg text-xs font-medium transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.education && (
            <div className="bg-gradient-to-r from-primary/5 to-transparent p-3 rounded-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Education</h3>
              <p className="text-xs text-muted-foreground leading-snug">{data.education}</p>
            </div>
          )}

          {data.projects && (
            <div className="bg-gradient-to-r from-accent/5 to-transparent p-3 rounded-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Projects</h3>
              <p className="text-xs text-muted-foreground leading-snug">{data.projects}</p>
            </div>
          )}

          {data.achievements && (
            <div className="bg-gradient-to-r from-primary/5 to-transparent p-3 rounded-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Achievements</h3>
              <p className="text-xs text-muted-foreground leading-snug">{data.achievements}</p>
            </div>
          )}

          {(data.contactEmail || data.contactPhone) && (
            <div className="flex flex-wrap gap-3 pt-2">
              {data.contactEmail && (
                <a href={`mailto:${data.contactEmail}`} className="text-xs text-primary hover:underline">
                  {data.contactEmail}
                </a>
              )}
              {data.contactPhone && (
                <span className="text-xs text-muted-foreground">{data.contactPhone}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtisticLayout;
