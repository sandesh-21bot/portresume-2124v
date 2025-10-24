import { LayoutProps } from './index';

const ArtisticLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="relative bg-white w-[595px] h-[842px] mx-auto p-8 overflow-hidden flex flex-col" style={{ boxSizing: 'border-box' }}>
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-200 to-blue-200 rounded-full blur-3xl opacity-50"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="text-center pb-3 border-b-2 border-blue-600 flex-shrink-0">
          {photoUrl && visibilitySettings?.profilePhoto !== false ? (
            <img 
              src={photoUrl} 
              alt={data.fullName} 
              className="w-20 h-20 rounded-full object-cover mx-auto mb-2 ring-2 ring-blue-600 ring-offset-2"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xl font-bold text-white mx-auto mb-2 ring-2 ring-blue-600 ring-offset-2">
              {data.fullName.charAt(0) || "?"}
            </div>
          )}
          
          {visibilitySettings?.fullName !== false && (
            <h2 className="text-2xl font-bold text-gray-900">{data.fullName || "Your Name"}</h2>
          )}
          {visibilitySettings?.title !== false && (
            <p className="text-xs text-gray-600 mt-1">{data.title || "Your Title"}</p>
          )}
        </div>

        <div className="space-y-2.5 mt-3 flex-1 overflow-hidden">
          {data.bio && visibilitySettings?.bio !== false && (
            <div>
              <h3 className="text-xs font-bold text-blue-600 mb-1">About</h3>
              <p className="text-[10px] text-gray-700 leading-tight">{data.bio}</p>
            </div>
          )}

          {skillsArray.length > 0 && visibilitySettings?.skills !== false && (
            <div>
              <h3 className="text-xs font-bold text-blue-600 mb-1.5">Skills</h3>
              <div className="flex flex-wrap gap-1">
                {skillsArray.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-[9px] border border-blue-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.education && visibilitySettings?.education !== false && (
            <div>
              <h3 className="text-xs font-bold text-blue-600 mb-1">Education</h3>
              <p className="text-[10px] text-gray-700 leading-tight">{data.education}</p>
            </div>
          )}

          {data.projects && visibilitySettings?.projects !== false && (
            <div>
              <h3 className="text-xs font-bold text-blue-600 mb-1">Projects</h3>
              <p className="text-[10px] text-gray-700 leading-tight">{data.projects}</p>
            </div>
          )}

          {data.achievements && visibilitySettings?.achievements !== false && (
            <div>
              <h3 className="text-xs font-bold text-blue-600 mb-1">Achievements</h3>
              <p className="text-[10px] text-gray-700 leading-tight">{data.achievements}</p>
            </div>
          )}
        </div>

        {(data.contactEmail || data.contactPhone) && (
          <div className="pt-2 border-t border-gray-300 mt-auto flex-shrink-0">
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[9px] text-gray-600 justify-center">
              {data.contactEmail && visibilitySettings?.contactEmail !== false && <span>{data.contactEmail}</span>}
              {data.contactPhone && visibilitySettings?.contactPhone !== false && <span>{data.contactPhone}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtisticLayout;
