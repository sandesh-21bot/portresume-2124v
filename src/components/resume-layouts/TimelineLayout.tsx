import { LayoutProps } from './index';

const TimelineLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-card rounded-lg border shadow-soft p-5 max-w-4xl mx-auto">
      <div className="relative pl-6 border-l-2 border-primary space-y-3">
        <div className="relative">
          <div className="absolute -left-[26px] w-4 h-4 bg-primary rounded-full border-2 border-card"></div>
          <div className="flex items-start gap-3">
            {photoUrl && (
              <img 
                src={photoUrl} 
                alt={data.fullName} 
                className="w-16 h-16 rounded-lg object-cover border border-primary/20"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold">{data.fullName || "Your Name"}</h2>
              <p className="text-sm text-primary mt-0.5">{data.title || "Your Title"}</p>
            </div>
          </div>
        </div>

        {data.bio && (
          <div className="relative">
            <div className="absolute -left-[26px] w-4 h-4 bg-accent rounded-full border-2 border-card"></div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Profile</h3>
              <p className="text-xs text-muted-foreground leading-snug">{data.bio}</p>
            </div>
          </div>
        )}

        {skillsArray.length > 0 && (
          <div className="relative">
            <div className="absolute -left-[26px] w-4 h-4 bg-primary rounded-full border-2 border-card"></div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">Skills</h3>
              <div className="grid grid-cols-2 gap-1.5">
                {skillsArray.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                    <span className="text-xs">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {data.education && (
          <div className="relative">
            <div className="absolute -left-[26px] w-4 h-4 bg-accent rounded-full border-2 border-card"></div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Education</h3>
              <p className="text-xs text-muted-foreground leading-snug">{data.education}</p>
            </div>
          </div>
        )}

        {data.projects && (
          <div className="relative">
            <div className="absolute -left-[26px] w-4 h-4 bg-primary rounded-full border-2 border-card"></div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Projects</h3>
              <p className="text-xs text-muted-foreground leading-snug">{data.projects}</p>
            </div>
          </div>
        )}

        {data.achievements && (
          <div className="relative">
            <div className="absolute -left-[26px] w-4 h-4 bg-accent rounded-full border-2 border-card"></div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Achievements</h3>
              <p className="text-xs text-muted-foreground leading-snug">{data.achievements}</p>
            </div>
          </div>
        )}

        {(data.contactEmail || data.contactPhone) && (
          <div className="relative">
            <div className="absolute -left-[26px] w-4 h-4 bg-accent rounded-full border-2 border-card"></div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Contact</h3>
              <div className="space-y-0.5 text-xs text-muted-foreground">
                {data.contactEmail && <p>{data.contactEmail}</p>}
                {data.contactPhone && <p>{data.contactPhone}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineLayout;
