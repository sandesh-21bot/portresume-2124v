import { LayoutProps } from './index';

const ModernLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="w-[595px] h-[842px] mx-auto bg-white overflow-hidden" style={{ boxSizing: 'border-box' }}>
      <div className="grid grid-cols-3 gap-0 h-full">
        <div className="col-span-1 bg-gradient-to-b from-blue-600 to-purple-600 p-4 text-white flex flex-col">
          <div className="space-y-3 flex-1 overflow-hidden">
            {photoUrl ? (
              <img 
                src={photoUrl} 
                alt={data.fullName} 
                className="w-full aspect-square rounded-lg object-cover"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="w-full aspect-square rounded-lg bg-white/20 flex items-center justify-center text-4xl font-bold">
                {data.fullName.charAt(0) || "?"}
              </div>
            )}
            
            {(data.contactEmail || data.contactPhone) && (
              <div className="space-y-2">
                <h3 className="font-bold text-xs">Contact</h3>
                {data.contactEmail && (
                  <p className="text-[10px] break-all">{data.contactEmail}</p>
                )}
                {data.contactPhone && (
                  <p className="text-[10px]">{data.contactPhone}</p>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="col-span-2 p-4 space-y-2.5 flex flex-col overflow-hidden">
          <div className="flex-shrink-0">
            <h2 className="text-xl font-bold text-gray-900">{data.fullName || "Your Name"}</h2>
            <p className="text-xs text-gray-600 mt-0.5">{data.title || "Your Title"}</p>
          </div>

          <div className="space-y-2 flex-1 overflow-hidden">
            {data.bio && (
              <div>
                <h3 className="text-xs font-semibold text-blue-600 mb-0.5">About</h3>
                <p className="text-[10px] text-gray-700 leading-tight">{data.bio}</p>
              </div>
            )}

            {skillsArray.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-blue-600 mb-1">Skills</h3>
                <div className="flex flex-wrap gap-1">
                  {skillsArray.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 bg-gradient-to-r from-blue-50 to-purple-50 rounded text-[9px] border border-blue-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {data.education && (
              <div>
                <h3 className="text-xs font-semibold text-blue-600 mb-0.5">Education</h3>
                <p className="text-[10px] text-gray-700 leading-tight">{data.education}</p>
              </div>
            )}

            {data.projects && (
              <div>
                <h3 className="text-xs font-semibold text-blue-600 mb-0.5">Projects</h3>
                <p className="text-[10px] text-gray-700 leading-tight">{data.projects}</p>
              </div>
            )}

            {data.achievements && (
              <div>
                <h3 className="text-xs font-semibold text-blue-600 mb-0.5">Achievements</h3>
                <p className="text-[10px] text-gray-700 leading-tight">{data.achievements}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernLayout;
