import { LayoutProps } from './index';

const ClassicLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-card rounded-xl p-8 border-2 shadow-soft space-y-6">
      <div className="flex flex-col items-center text-center space-y-4">
        {visibilitySettings?.profilePhoto !== false && photoUrl ? (
          <img 
            src={photoUrl} 
            alt={data.fullName} 
            className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
          />
        ) : visibilitySettings?.profilePhoto !== false && (
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-bold text-primary-foreground">
            {data.fullName.charAt(0) || "?"}
          </div>
        )}
        
        <div>
          {visibilitySettings?.fullName !== false && <h2 className="text-3xl font-bold">{data.fullName || "Your Name"}</h2>}
          {visibilitySettings?.title !== false && <p className="text-lg text-muted-foreground">{data.title || "Your Title"}</p>}
        </div>
      </div>

      {visibilitySettings?.careerObjective !== false && data.careerObjective && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold border-b pb-2">Career Objective</h3>
          <p className="text-muted-foreground leading-relaxed">{data.careerObjective}</p>
        </div>
      )}

      {visibilitySettings?.bio !== false && data.bio && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold border-b pb-2">About Me</h3>
          <p className="text-muted-foreground leading-relaxed">{data.bio}</p>
        </div>
      )}

      {visibilitySettings?.skills !== false && skillsArray.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold border-b pb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skillsArray.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {visibilitySettings?.education !== false && data.education && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold border-b pb-2">Education</h3>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{data.education}</p>
        </div>
      )}

      {visibilitySettings?.projects !== false && data.projects && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold border-b pb-2">Projects</h3>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{data.projects}</p>
        </div>
      )}

      {visibilitySettings?.achievements !== false && data.achievements && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold border-b pb-2">Achievements</h3>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{data.achievements}</p>
        </div>
      )}

      {((visibilitySettings?.contactEmail !== false && data.contactEmail) || 
        (visibilitySettings?.contactPhone !== false && data.contactPhone) ||
        (visibilitySettings?.linkedinUrl !== false && data.linkedinUrl) ||
        (visibilitySettings?.address !== false && data.address) ||
        (visibilitySettings?.dateOfBirth !== false && data.dateOfBirth)) && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold border-b pb-2">Contact</h3>
          <div className="space-y-1 text-muted-foreground">
            {visibilitySettings?.contactEmail !== false && data.contactEmail && (
              <p className="flex items-center gap-2">
                <span className="font-medium">Email:</span>
                <a href={`mailto:${data.contactEmail}`} className="hover:text-primary transition-colors">
                  {data.contactEmail}
                </a>
              </p>
            )}
            {visibilitySettings?.contactPhone !== false && data.contactPhone && (
              <p className="flex items-center gap-2">
                <span className="font-medium">Phone:</span>
                <span>{data.contactPhone}</span>
              </p>
            )}
            {visibilitySettings?.linkedinUrl !== false && data.linkedinUrl && (
              <p className="flex items-center gap-2">
                <span className="font-medium">LinkedIn:</span>
                <a href={data.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {data.linkedinUrl}
                </a>
              </p>
            )}
            {visibilitySettings?.address !== false && data.address && (
              <p className="flex items-center gap-2">
                <span className="font-medium">Address:</span>
                <span>{data.address}</span>
              </p>
            )}
            {visibilitySettings?.dateOfBirth !== false && data.dateOfBirth && (
              <p className="flex items-center gap-2">
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
