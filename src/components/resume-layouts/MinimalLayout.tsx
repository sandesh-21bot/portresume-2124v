import { LayoutProps } from './index';

const MinimalLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-card rounded-lg p-5 border shadow-soft space-y-3 max-w-4xl mx-auto">
      <div className="space-y-1.5 border-b pb-3">
        <h2 className="text-2xl font-light tracking-tight">{data.fullName || "Your Name"}</h2>
        <p className="text-sm text-muted-foreground">{data.title || "Your Title"}</p>
        {data.dateOfBirth && (
          <p className="text-xs text-muted-foreground">DOB: {new Date(data.dateOfBirth).toLocaleDateString()}</p>
        )}
      </div>

      {data.careerObjective && (
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Career Objective</p>
          <p className="text-xs text-muted-foreground leading-snug">{data.careerObjective}</p>
        </div>
      )}

      {data.bio && (
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">About Me</p>
          <p className="text-xs text-muted-foreground leading-snug">{data.bio}</p>
        </div>
      )}

      {skillsArray.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Expertise</p>
          <p className="text-xs">{skillsArray.join(' · ')}</p>
        </div>
      )}

      {data.achievements && visibilitySettings?.achievements !== false && (
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Achievements</p>
          <p className="text-xs leading-snug">{data.achievements}</p>
        </div>
      )}

      {data.education && visibilitySettings?.education !== false && (
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Education</p>
          <p className="text-xs leading-snug">{data.education}</p>
        </div>
      )}

      {data.projects && visibilitySettings?.projects !== false && (
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Projects</p>
          <p className="text-xs leading-snug">{data.projects}</p>
        </div>
      )}

      {(data.contactEmail || data.contactPhone || data.linkedinUrl || data.address) && (
        <div className="space-y-1 pt-2 border-t">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Contact</p>
          {data.contactEmail && (
            <p className="text-xs text-muted-foreground">{data.contactEmail}</p>
          )}
          {data.contactPhone && (
            <p className="text-xs text-muted-foreground">{data.contactPhone}</p>
          )}
          {data.linkedinUrl && (
            <p className="text-xs text-muted-foreground break-all">{data.linkedinUrl}</p>
          )}
          {data.address && (
            <p className="text-xs text-muted-foreground">{data.address}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MinimalLayout;
