import { LayoutProps } from './index';

const ArtisticLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-card rounded-3xl border-2 shadow-elegant overflow-hidden">
      <div className="relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/20 to-transparent rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/20 to-transparent rounded-full -ml-24 -mb-24"></div>
        
        <div className="relative p-10 space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h2 className="text-5xl font-bold leading-tight max-w-md">
                {data.fullName || "Your Name"}
              </h2>
              <p className="text-xl text-primary font-medium">{data.title || "Your Title"}</p>
            </div>
            
            {photoUrl && (
              <img 
                src={photoUrl} 
                alt={data.fullName} 
                className="w-32 h-32 rounded-2xl object-cover shadow-elegant rotate-3 hover:rotate-0 transition-transform"
              />
            )}
          </div>

          {data.bio && (
            <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-2xl -mx-2">
              <p className="text-muted-foreground leading-relaxed">{data.bio}</p>
            </div>
          )}

          {skillsArray.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-3">
                {skillsArray.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-card border-2 border-primary/20 hover:border-primary rounded-2xl text-sm font-medium transition-colors"
                    style={{
                      transform: `rotate(${(idx % 2 === 0 ? 1 : -1) * (idx % 3)}deg)`
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.education && (
            <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-2xl -mx-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Education</h3>
              <p className="text-muted-foreground leading-relaxed">{data.education}</p>
            </div>
          )}

          {data.projects && (
            <div className="bg-gradient-to-r from-accent/5 to-transparent p-6 rounded-2xl -mx-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Projects</h3>
              <p className="text-muted-foreground leading-relaxed">{data.projects}</p>
            </div>
          )}

          {data.achievements && (
            <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-2xl -mx-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Achievements</h3>
              <p className="text-muted-foreground leading-relaxed">{data.achievements}</p>
            </div>
          )}

          {(data.contactEmail || data.contactPhone) && (
            <div className="flex flex-wrap gap-4 pt-4">
              {data.contactEmail && (
                <a href={`mailto:${data.contactEmail}`} className="text-sm text-primary hover:underline">
                  {data.contactEmail}
                </a>
              )}
              {data.contactPhone && (
                <span className="text-sm text-muted-foreground">{data.contactPhone}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtisticLayout;
