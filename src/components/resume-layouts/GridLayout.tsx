import { LayoutProps } from './index';

const GridLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="grid grid-cols-2 gap-2 max-w-4xl mx-auto">
      <div className="col-span-2 bg-gradient-to-r from-primary to-accent rounded-lg p-4 text-primary-foreground">
        <div className="flex items-center gap-3">
          {photoUrl && (
            <img 
              src={photoUrl} 
              alt={data.fullName} 
              className="w-16 h-16 rounded-lg object-cover border-2 border-primary-foreground/20"
            />
          )}
          <div>
            <h2 className="text-2xl font-bold">{data.fullName || "Your Name"}</h2>
            <p className="text-sm mt-1 opacity-90">{data.title || "Your Title"}</p>
          </div>
        </div>
      </div>

      {data.bio && (
        <div className="col-span-2 bg-card rounded-lg p-3 border shadow-soft">
          <h3 className="text-xs font-semibold mb-1.5 text-primary">About</h3>
          <p className="text-xs text-muted-foreground leading-snug">{data.bio}</p>
        </div>
      )}

      {skillsArray.length > 0 && (
        <div className="bg-card rounded-lg p-3 border shadow-soft">
          <h3 className="text-xs font-semibold mb-2 text-primary">Skills</h3>
          <div className="space-y-1">
            {skillsArray.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span className="text-xs">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.education && (
        <div className="bg-card rounded-lg p-3 border shadow-soft">
          <h3 className="text-xs font-semibold mb-1.5 text-primary">Education</h3>
          <p className="text-xs text-muted-foreground leading-snug">{data.education}</p>
        </div>
      )}

      {data.projects && (
        <div className="bg-card rounded-lg p-3 border shadow-soft">
          <h3 className="text-xs font-semibold mb-1.5 text-primary">Projects</h3>
          <p className="text-xs text-muted-foreground leading-snug">{data.projects}</p>
        </div>
      )}

      {data.achievements && (
        <div className="bg-card rounded-lg p-3 border shadow-soft">
          <h3 className="text-xs font-semibold mb-1.5 text-primary">Achievements</h3>
          <p className="text-xs text-muted-foreground leading-snug">{data.achievements}</p>
        </div>
      )}

      {(data.contactEmail || data.contactPhone) && (
        <div className="bg-card rounded-lg p-3 border shadow-soft">
          <h3 className="text-xs font-semibold mb-2 text-primary">Contact</h3>
          <div className="space-y-2">
            {data.contactEmail && (
              <div>
                <p className="text-[10px] text-muted-foreground mb-0.5">Email</p>
                <p className="text-xs">{data.contactEmail}</p>
              </div>
            )}
            {data.contactPhone && (
              <div>
                <p className="text-[10px] text-muted-foreground mb-0.5">Phone</p>
                <p className="text-xs">{data.contactPhone}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GridLayout;
