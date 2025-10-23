import { LayoutProps } from './index';

const ClassicLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-card rounded-lg p-5 border shadow-soft space-y-3 max-w-4xl mx-auto">
      <div className="flex flex-col items-center text-center space-y-2">
        {visibilitySettings?.profilePhoto !== false && photoUrl ? (
          <img 
            src={photoUrl} 
            alt={data.fullName} 
            className="w-20 h-20 rounded-full object-cover border-2 border-primary/20"
          />
        ) : visibilitySettings?.profilePhoto !== false && (
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground">
            {data.fullName.charAt(0) || "?"}
          </div>
        )}
        
        <div>
          {visibilitySettings?.fullName !== false && <h2 className="text-2xl font-bold">{data.fullName || "Your Name"}</h2>}
          {visibilitySettings?.title !== false && <p className="text-sm text-muted-foreground">{data.title || "Your Title"}</p>}
        </div>
      </div>

      {visibilitySettings?.careerObjective !== false && data.careerObjective && (
        <div className="space-y-1">
          <h3 className="text-sm font-semibold border-b pb-1">Career Objective</h3>
          <p className="text-xs text-muted-foreground leading-snug">{data.careerObjective}</p>
        </div>
      )}

      {visibilitySettings?.bio !== false && data.bio && (
        <div className="space-y-1">
          <h3 className="text-sm font-semibold border-b pb-1">About Me</h3>
          <p className="text-xs text-muted-foreground leading-snug">{data.bio}</p>
        </div>
      )}

      {visibilitySettings?.skills !== false && skillsArray.length > 0 && (
        <div className="space-y-1">
          <h3 className="text-sm font-semibold border-b pb-1">Skills</h3>
          <div className="flex flex-wrap gap-1.5">
            {skillsArray.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {visibilitySettings?.education !== false && data.education && (
        <div className="space-y-1">
          <h3 className="text-sm font-semibold border-b pb-1">Education</h3>
          <p className="text-xs text-muted-foreground leading-snug whitespace-pre-wrap">{data.education}</p>
        </div>
      )}

      {visibilitySettings?.projects !== false && data.projects && (
        <div className="space-y-1">
          <h3 className="text-sm font-semibold border-b pb-1">Projects</h3>
          <p className="text-xs text-muted-foreground leading-snug whitespace-pre-wrap">{data.projects}</p>
        </div>
      )}

      {visibilitySettings?.achievements !== false && data.achievements && (
        <div className="space-y-1">
          <h3 className="text-sm font-semibold border-b pb-1">Achievements</h3>
          <p className="text-xs text-muted-foreground leading-snug whitespace-pre-wrap">{data.achievements}</p>
        </div>
      )}

      {((visibilitySettings?.contactEmail !== false && data.contactEmail) || 
        (visibilitySettings?.contactPhone !== false && data.contactPhone) ||
        (visibilitySettings?.linkedinUrl !== false && data.linkedinUrl) ||
        (visibilitySettings?.address !== false && data.address) ||
        (visibilitySettings?.dateOfBirth !== false && data.dateOfBirth)) && (
        <div className="space-y-1">
          <h3 className="text-sm font-semibold border-b pb-1">Contact</h3>
          <div className="space-y-0.5 text-muted-foreground text-xs">
            {visibilitySettings?.contactEmail !== false && data.contactEmail && (
              <p className="flex items-center gap-1.5">
                <span className="font-medium">Email:</span>
                <a href={`mailto:${data.contactEmail}`} className="hover:text-primary transition-colors">
                  {data.contactEmail}
                </a>
              </p>
            )}
            {visibilitySettings?.contactPhone !== false && data.contactPhone && (
              <p className="flex items-center gap-1.5">
                <span className="font-medium">Phone:</span>
                <span>{data.contactPhone}</span>
              </p>
            )}
            {visibilitySettings?.linkedinUrl !== false && data.linkedinUrl && (
              <p className="flex items-center gap-1.5">
                <span className="font-medium">LinkedIn:</span>
                <a href={data.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors break-all">
                  {data.linkedinUrl}
                </a>
              </p>
            )}
            {visibilitySettings?.address !== false && data.address && (
              <p className="flex items-center gap-1.5">
                <span className="font-medium">Address:</span>
                <span>{data.address}</span>
              </p>
            )}
            {visibilitySettings?.dateOfBirth !== false && data.dateOfBirth && (
              <p className="flex items-center gap-1.5">
                <span className="font-medium">Date of Birth:</span>
                <span>{new Date(data.dateOfBirth).toLocaleDateString()}</span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassicLayout;
