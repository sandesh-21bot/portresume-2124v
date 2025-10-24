import { LayoutProps } from './index';

const MinimalLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-white w-[595px] h-[842px] mx-auto p-8 overflow-hidden flex flex-col" style={{ boxSizing: 'border-box' }}>
      <div className="pb-3 border-b border-gray-300 flex-shrink-0">
        <h2 className="text-2xl font-light tracking-tight text-gray-900">{data.fullName || "Your Name"}</h2>
        <p className="text-sm text-gray-600 mt-1">{data.title || "Your Title"}</p>
        {data.dateOfBirth && (
          <p className="text-xs text-gray-500 mt-0.5">DOB: {new Date(data.dateOfBirth).toLocaleDateString()}</p>
        )}
      </div>

      <div className="space-y-2.5 mt-3 flex-1 overflow-hidden">
        {data.careerObjective && (
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-0.5">Career Objective</p>
            <p className="text-[10px] text-gray-700 leading-tight">{data.careerObjective}</p>
          </div>
        )}

        {data.bio && (
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-0.5">About Me</p>
            <p className="text-[10px] text-gray-700 leading-tight">{data.bio}</p>
          </div>
        )}

        {skillsArray.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-0.5">Expertise</p>
            <p className="text-[10px] text-gray-700">{skillsArray.join(' · ')}</p>
          </div>
        )}

        {data.achievements && visibilitySettings?.achievements !== false && (
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-0.5">Achievements</p>
            <p className="text-[10px] text-gray-700 leading-tight">{data.achievements}</p>
          </div>
        )}

        {data.education && visibilitySettings?.education !== false && (
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-0.5">Education</p>
            <p className="text-[10px] text-gray-700 leading-tight">{data.education}</p>
          </div>
        )}

        {data.projects && visibilitySettings?.projects !== false && (
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-0.5">Projects</p>
            <p className="text-[10px] text-gray-700 leading-tight">{data.projects}</p>
          </div>
        )}
      </div>

      {(data.contactEmail || data.contactPhone || data.linkedinUrl || data.address) && (
        <div className="pt-2 border-t border-gray-300 mt-auto flex-shrink-0">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Contact</p>
          <div className="space-y-0.5">
            {data.contactEmail && (
              <p className="text-[10px] text-gray-600">{data.contactEmail}</p>
            )}
            {data.contactPhone && (
              <p className="text-[10px] text-gray-600">{data.contactPhone}</p>
            )}
            {data.linkedinUrl && (
              <p className="text-[10px] text-gray-600 break-all">{data.linkedinUrl}</p>
            )}
            {data.address && (
              <p className="text-[10px] text-gray-600">{data.address}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalLayout;
