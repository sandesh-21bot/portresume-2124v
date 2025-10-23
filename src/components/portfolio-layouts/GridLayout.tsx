import { LayoutProps } from './index';

const GridLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 bg-gradient-to-r from-primary to-accent rounded-xl p-8 text-primary-foreground">
        <div className="flex items-center gap-6">
          {photoUrl && (
            <img 
              src={photoUrl} 
              alt={data.fullName} 
              className="w-24 h-24 rounded-lg object-cover border-4 border-primary-foreground/20"
            />
          )}
          <div>
            <h2 className="text-4xl font-bold">{data.fullName || "Your Name"}</h2>
            <p className="text-xl mt-2 opacity-90">{data.title || "Your Title"}</p>
          </div>
        </div>
      </div>

      {data.bio && (
        <div className="col-span-2 bg-card rounded-xl p-6 border shadow-soft">
          <h3 className="text-lg font-semibold mb-3 text-primary">About</h3>
          <p className="text-muted-foreground leading-relaxed">{data.bio}</p>
        </div>
      )}

      {skillsArray.length > 0 && (
        <div className="bg-card rounded-xl p-6 border shadow-soft">
          <h3 className="text-lg font-semibold mb-4 text-primary">Skills</h3>
          <div className="space-y-2">
            {skillsArray.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.education && (
        <div className="bg-card rounded-xl p-6 border shadow-soft">
          <h3 className="text-lg font-semibold mb-3 text-primary">Education</h3>
          <p className="text-muted-foreground leading-relaxed">{data.education}</p>
        </div>
      )}

      {data.projects && (
        <div className="bg-card rounded-xl p-6 border shadow-soft">
          <h3 className="text-lg font-semibold mb-3 text-primary">Projects</h3>
          <p className="text-muted-foreground leading-relaxed">{data.projects}</p>
        </div>
      )}

      {data.achievements && (
        <div className="bg-card rounded-xl p-6 border shadow-soft">
          <h3 className="text-lg font-semibold mb-3 text-primary">Achievements</h3>
          <p className="text-muted-foreground leading-relaxed">{data.achievements}</p>
        </div>
      )}

      {(data.contactEmail || data.contactPhone) && (
        <div className="bg-card rounded-xl p-6 border shadow-soft">
          <h3 className="text-lg font-semibold mb-4 text-primary">Contact</h3>
          <div className="space-y-3">
            {data.contactEmail && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Email</p>
                <p className="text-sm">{data.contactEmail}</p>
              </div>
            )}
            {data.contactPhone && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Phone</p>
                <p className="text-sm">{data.contactPhone}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GridLayout;
