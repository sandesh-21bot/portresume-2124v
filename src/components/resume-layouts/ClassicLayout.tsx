import { LayoutProps } from './index';

const ClassicLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-white w-[595px] h-[842px] mx-auto p-6 overflow-auto flex flex-col" style={{ boxSizing: 'border-box' }}>
      <div className="flex flex-col items-center text-center pb-4 border-b border-gray-300 flex-shrink-0">
        {visibilitySettings?.profilePhoto !== false && photoUrl ? (
          <img 
            src={photoUrl} 
            alt={data.fullName} 
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-600 mb-3"
            crossOrigin="anonymous"
          />
        ) : visibilitySettings?.profilePhoto !== false && (
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xl font-bold text-white mb-3">
            {data.fullName.charAt(0) || "?"}
          </div>
        )}
        
        <div>
          {visibilitySettings?.fullName !== false && <h2 className="text-2xl font-bold text-gray-900">{data.fullName || "Your Name"}</h2>}
          {visibilitySettings?.title !== false && <p className="text-sm text-gray-600 mt-1">{data.title || "Your Title"}</p>}
        </div>
      </div>

      <div className="space-y-3 mt-4 flex-1">
        {visibilitySettings?.careerObjective !== false && data.careerObjective && (
          <div>
            <h3 className="text-sm font-semibold text-blue-600 mb-1">Career Objective</h3>
            <p className="text-xs text-gray-700 leading-relaxed">{data.careerObjective}</p>
          </div>
        )}

        {visibilitySettings?.bio !== false && data.bio && (
          <div>
            <h3 className="text-sm font-semibold text-blue-600 mb-1">About Me</h3>
            <p className="text-xs text-gray-700 leading-relaxed">{data.bio}</p>
          </div>
        )}

        {visibilitySettings?.skills !== false && skillsArray.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-blue-600 mb-1.5">Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {skillsArray.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs border border-blue-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {visibilitySettings?.education !== false && data.education && (
          <div>
            <h3 className="text-sm font-semibold text-blue-600 mb-1">Education</h3>
            <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">{data.education}</p>
          </div>
        )}

        {visibilitySettings?.projects !== false && data.projects && (
          <div>
            <h3 className="text-sm font-semibold text-blue-600 mb-1">Projects</h3>
            <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">{data.projects}</p>
          </div>
        )}

        {visibilitySettings?.achievements !== false && data.achievements && (
          <div>
            <h3 className="text-sm font-semibold text-blue-600 mb-1">Achievements</h3>
            <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">{data.achievements}</p>
          </div>
        )}
      </div>

      {((visibilitySettings?.contactEmail !== false && data.contactEmail) || 
        (visibilitySettings?.contactPhone !== false && data.contactPhone) ||
        (visibilitySettings?.linkedinUrl !== false && data.linkedinUrl) ||
        (visibilitySettings?.address !== false && data.address) ||
        (visibilitySettings?.dateOfBirth !== false && data.dateOfBirth)) && (
        <div className="pt-3 border-t border-gray-300 mt-4 flex-shrink-0">
          <h3 className="text-sm font-semibold text-blue-600 mb-1.5">Contact</h3>
          <div className="space-y-1 text-gray-700 text-xs">
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
