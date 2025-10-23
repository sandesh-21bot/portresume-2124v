import { LayoutProps } from './index';

const TimelineLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-card rounded-xl border shadow-soft p-8">
      <div className="relative pl-8 border-l-4 border-primary space-y-8">
        <div className="relative">
          <div className="absolute -left-[38px] w-6 h-6 bg-primary rounded-full border-4 border-card"></div>
          <div className="flex items-start gap-4">
            {photoUrl && (
              <img 
                src={photoUrl} 
                alt={data.fullName} 
                className="w-24 h-24 rounded-lg object-cover border-2 border-primary/20"
              />
            )}
            <div>
              <h2 className="text-3xl font-bold">{data.fullName || "Your Name"}</h2>
              <p className="text-lg text-primary mt-1">{data.title || "Your Title"}</p>
            </div>
          </div>
        </div>

        {data.bio && (
          <div className="relative">
            <div className="absolute -left-[38px] w-6 h-6 bg-accent rounded-full border-4 border-card"></div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Profile</h3>
              <p className="text-muted-foreground leading-relaxed">{data.bio}</p>
            </div>
          </div>
        )}

        {skillsArray.length > 0 && (
          <div className="relative">
            <div className="absolute -left-[38px] w-6 h-6 bg-primary rounded-full border-4 border-card"></div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Skills</h3>
              <div className="grid grid-cols-2 gap-2">
                {skillsArray.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span className="text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {data.education && (
          <div className="relative">
            <div className="absolute -left-[38px] w-6 h-6 bg-accent rounded-full border-4 border-card"></div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Education</h3>
              <p className="text-muted-foreground leading-relaxed">{data.education}</p>
            </div>
          </div>
        )}

        {data.projects && (
          <div className="relative">
            <div className="absolute -left-[38px] w-6 h-6 bg-primary rounded-full border-4 border-card"></div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Projects</h3>
              <p className="text-muted-foreground leading-relaxed">{data.projects}</p>
            </div>
          </div>
        )}

        {data.achievements && (
          <div className="relative">
            <div className="absolute -left-[38px] w-6 h-6 bg-accent rounded-full border-4 border-card"></div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Achievements</h3>
              <p className="text-muted-foreground leading-relaxed">{data.achievements}</p>
            </div>
          </div>
        )}

        {(data.contactEmail || data.contactPhone) && (
          <div className="relative">
            <div className="absolute -left-[38px] w-6 h-6 bg-accent rounded-full border-4 border-card"></div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Contact</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
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
