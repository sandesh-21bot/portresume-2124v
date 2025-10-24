import { LayoutProps } from './index';

const TimelineLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-white w-[595px] h-[842px] mx-auto p-8 overflow-hidden flex flex-col" style={{ boxSizing: 'border-box' }}>
      <div className="text-center pb-3 border-b border-gray-300 flex-shrink-0">
        {photoUrl && visibilitySettings?.profilePhoto !== false ? (
          <img 
            src={photoUrl} 
            alt={data.fullName} 
            className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-2 border-blue-600"
            crossOrigin="anonymous"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg font-bold text-white mx-auto mb-2 border-2 border-blue-600">
            {data.fullName.charAt(0) || "?"}
          </div>
        )}
        
        {visibilitySettings?.fullName !== false && (
          <h2 className="text-xl font-bold text-gray-900">{data.fullName || "Your Name"}</h2>
        )}
        {visibilitySettings?.title !== false && (
          <p className="text-xs text-gray-600 mt-0.5">{data.title || "Your Title"}</p>
        )}
      </div>

      <div className="relative flex-1 mt-3 overflow-hidden">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200"></div>
        
        <div className="space-y-2.5 pl-12">
          {data.bio && visibilitySettings?.bio !== false && (
            <div className="relative">
              <div className="absolute -left-12 top-0.5 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white"></div>
              <h3 className="text-xs font-bold text-blue-600 mb-1">About</h3>
              <p className="text-[10px] text-gray-700 leading-tight">{data.bio}</p>
            </div>
          )}

          {skillsArray.length > 0 && visibilitySettings?.skills !== false && (
            <div className="relative">
              <div className="absolute -left-12 top-0.5 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white"></div>
              <h3 className="text-xs font-bold text-blue-600 mb-1.5">Skills</h3>
              <div className="flex flex-wrap gap-1">
                {skillsArray.map((skill, idx) => (
                  <span key={idx} className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-[9px] border border-blue-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.education && visibilitySettings?.education !== false && (
            <div className="relative">
              <div className="absolute -left-12 top-0.5 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white"></div>
              <h3 className="text-xs font-bold text-blue-600 mb-1">Education</h3>
              <p className="text-[10px] text-gray-700 leading-tight">{data.education}</p>
            </div>
          )}

          {data.projects && visibilitySettings?.projects !== false && (
            <div className="relative">
              <div className="absolute -left-12 top-0.5 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white"></div>
              <h3 className="text-xs font-bold text-blue-600 mb-1">Projects</h3>
              <p className="text-[10px] text-gray-700 leading-tight">{data.projects}</p>
            </div>
          )}

          {data.achievements && visibilitySettings?.achievements !== false && (
            <div className="relative">
              <div className="absolute -left-12 top-0.5 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white"></div>
              <h3 className="text-xs font-bold text-blue-600 mb-1">Achievements</h3>
              <p className="text-[10px] text-gray-700 leading-tight">{data.achievements}</p>
            </div>
          )}
        </div>
      </div>

      <div className="pt-2 border-t border-gray-300 mt-auto flex-shrink-0">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[9px] text-gray-600">
          {data.contactEmail && visibilitySettings?.contactEmail !== false && <span>{data.contactEmail}</span>}
          {data.contactPhone && visibilitySettings?.contactPhone !== false && <span>{data.contactPhone}</span>}
        </div>
      </div>
    </div>
  );
};

export default TimelineLayout;
