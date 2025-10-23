import { LayoutProps } from './index';

const CreativeLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-gradient-to-br from-primary via-accent to-primary/80 rounded-2xl p-1 shadow-elegant max-w-4xl mx-auto">
      <div className="bg-card rounded-[14px] p-5 space-y-3">
        <div className="flex items-start gap-4">
          {photoUrl ? (
            <img 
              src={photoUrl} 
              alt={data.fullName} 
              className="w-16 h-16 rounded-xl object-cover ring-2 ring-primary/20"
            />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl font-bold text-primary-foreground ring-2 ring-primary/20">
              {data.fullName.charAt(0) || "?"}
            </div>
          )}
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {data.fullName || "Your Name"}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">{data.title || "Your Title"}</p>
          </div>
        </div>

        {data.bio && (
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-3">
            <p className="text-xs text-muted-foreground leading-snug">{data.bio}</p>
          </div>
        )}

        {skillsArray.length > 0 && (
          <div className="space-y-1.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {skillsArray.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.education && (
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Education</h3>
            <p className="text-xs text-muted-foreground leading-snug">{data.education}</p>
          </div>
        )}

        {data.projects && (
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Projects</h3>
            <p className="text-xs text-muted-foreground leading-snug">{data.projects}</p>
          </div>
        )}

        {data.achievements && (
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Achievements</h3>
            <p className="text-xs text-muted-foreground leading-snug">{data.achievements}</p>
          </div>
        )}

        {(data.contactEmail || data.contactPhone) && (
          <div className="flex gap-4 pt-2 border-t">
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
  );
};

export default CreativeLayout;
