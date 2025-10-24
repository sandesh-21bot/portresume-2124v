import { LayoutProps } from './index';

const ClassicLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-white w-[595px] h-[842px] mx-auto p-8 overflow-hidden flex flex-col" style={{ boxSizing: 'border-box' }}>
      <div className="flex flex-col items-center text-center pb-3 border-b border-gray-300 flex-shrink-0">
        {visibilitySettings?.profilePhoto !== false && photoUrl ? (
          <img 
            src={photoUrl} 
            alt={data.fullName} 
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-600 mb-2"
            crossOrigin="anonymous"
          />
        ) : visibilitySettings?.profilePhoto !== false && (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg font-bold text-white mb-2">
            {data.fullName.charAt(0) || "?"}
          </div>
        )}
        
        <div>
          {visibilitySettings?.fullName !== false && <h2 className="text-xl font-bold text-gray-900">{data.fullName || "Your Name"}</h2>}
          {visibilitySettings?.title !== false && <p className="text-xs text-gray-600 mt-0.5">{data.title || "Your Title"}</p>}
        </div>
      </div>

      <div className="space-y-2 mt-3 flex-1 overflow-hidden">
        {visibilitySettings?.careerObjective !== false && data.careerObjective && (
          <div>
            <h3 className="text-xs font-semibold text-blue-600 mb-0.5">Career Objective</h3>
            <p className="text-[10px] text-gray-700 leading-tight">{data.careerObjective}</p>
          </div>
        )}

        {visibilitySettings?.bio !== false && data.bio && (
          <div>
            <h3 className="text-xs font-semibold text-blue-600 mb-0.5">About Me</h3>
            <p className="text-[10px] text-gray-700 leading-tight">{data.bio}</p>
          </div>
        )}

        {visibilitySettings?.skills !== false && skillsArray.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-blue-600 mb-1">Skills</h3>
            <div className="flex flex-wrap gap-1">
              {skillsArray.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[9px] border border-blue-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {visibilitySettings?.education !== false && data.education && (
          <div>
            <h3 className="text-xs font-semibold text-blue-600 mb-0.5">Education</h3>
            <p className="text-[10px] text-gray-700 leading-tight whitespace-pre-wrap">{data.education}</p>
          </div>
        )}

        {visibilitySettings?.projects !== false && data.projects && (
          <div>
            <h3 className="text-xs font-semibold text-blue-600 mb-0.5">Projects</h3>
            <p className="text-[10px] text-gray-700 leading-tight whitespace-pre-wrap">{data.projects}</p>
          </div>
        )}

        {visibilitySettings?.achievements !== false && data.achievements && (
          <div>
            <h3 className="text-xs font-semibold text-blue-600 mb-0.5">Achievements</h3>
            <p className="text-[10px] text-gray-700 leading-tight whitespace-pre-wrap">{data.achievements}</p>
          </div>
        )}
      </div>

      {((visibilitySettings?.contactEmail !== false && data.contactEmail) || 
        (visibilitySettings?.contactPhone !== false && data.contactPhone) ||
        (visibilitySettings?.linkedinUrl !== false && data.linkedinUrl) ||
        (visibilitySettings?.address !== false && data.address) ||
        (visibilitySettings?.dateOfBirth !== false && data.dateOfBirth)) && (
        <div className="pt-2 border-t border-gray-300 mt-auto flex-shrink-0">
          <h3 className="text-xs font-semibold text-blue-600 mb-1">Contact</h3>
          <div className="space-y-0.5 text-gray-700 text-[10px]">
            {visibilitySettings?.contactEmail !== false && data.contactEmail && (
              <p>{data.contactEmail}</p>
            )}
            {visibilitySettings?.contactPhone !== false && data.contactPhone && (
              <p>{data.contactPhone}</p>
            )}
            {visibilitySettings?.linkedinUrl !== false && data.linkedinUrl && (
              <p className="break-all">{data.linkedinUrl}</p>
            )}
            {visibilitySettings?.address !== false && data.address && (
              <p>{data.address}</p>
            )}
            {visibilitySettings?.dateOfBirth !== false && data.dateOfBirth && (
              <p>DOB: {new Date(data.dateOfBirth).toLocaleDateString()}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassicLayout;
