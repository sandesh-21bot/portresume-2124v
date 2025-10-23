import { LayoutProps } from './index';

const CreativeLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-gradient-to-br from-primary via-accent to-primary/80 rounded-3xl p-1 shadow-elegant">
      <div className="bg-card rounded-[22px] p-8 space-y-6">
        <div className="flex items-start gap-6">
          {photoUrl ? (
            <img 
              src={photoUrl} 
              alt={data.fullName} 
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-primary/20"
            />
          ) : (
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-primary-foreground ring-4 ring-primary/20">
              {data.fullName.charAt(0) || "?"}
            </div>
          )}
          
          <div className="flex-1">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {data.fullName || "Your Name"}
            </h2>
            <p className="text-lg text-muted-foreground mt-1">{data.title || "Your Title"}</p>
          </div>
        </div>

        {data.bio && (
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6">
            <p className="text-muted-foreground leading-relaxed">{data.bio}</p>
          </div>
        )}

        {skillsArray.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skillsArray.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full text-sm font-medium shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.education && (
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Education</h3>
            <p className="text-muted-foreground leading-relaxed">{data.education}</p>
          </div>
        )}

        {data.projects && (
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Projects</h3>
            <p className="text-muted-foreground leading-relaxed">{data.projects}</p>
          </div>
        )}

        {data.achievements && (
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Achievements</h3>
            <p className="text-muted-foreground leading-relaxed">{data.achievements}</p>
          </div>
        )}

        {(data.contactEmail || data.contactPhone) && (
          <div className="flex gap-6 pt-4 border-t">
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
  );
};

export default CreativeLayout;
