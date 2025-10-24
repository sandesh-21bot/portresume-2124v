import { LayoutProps } from './index';

const CreativeLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="w-[595px] h-[842px] mx-auto bg-white overflow-hidden" style={{ boxSizing: 'border-box' }}>
      <div className="grid grid-cols-3 gap-0 h-full">
        <div className="col-span-1 bg-gradient-to-b from-blue-600 to-purple-600 p-4 text-white flex flex-col">
          <div className="text-center mb-4 flex-shrink-0">
            {photoUrl ? (
              <img 
                src={photoUrl} 
                alt={data.fullName} 
                className="w-20 h-20 rounded-full object-cover mx-auto mb-2 border-2 border-white"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold mx-auto mb-2 border-2 border-white">
                {data.fullName.charAt(0) || "?"}
              </div>
            )}
            {visibilitySettings?.fullName !== false && (
              <h2 className="text-sm font-bold">{data.fullName || "Your Name"}</h2>
            )}
            {visibilitySettings?.title !== false && (
              <p className="text-[10px] opacity-90 mt-1">{data.title || "Your Title"}</p>
            )}
          </div>

          <div className="space-y-3 flex-1 overflow-hidden">
            {data.contactEmail && visibilitySettings?.contactEmail !== false && (
              <div>
                <h3 className="text-[10px] font-bold mb-1 opacity-80">EMAIL</h3>
                <p className="text-[9px] break-all">{data.contactEmail}</p>
              </div>
            )}

            {data.contactPhone && visibilitySettings?.contactPhone !== false && (
              <div>
                <h3 className="text-[10px] font-bold mb-1 opacity-80">PHONE</h3>
                <p className="text-[9px]">{data.contactPhone}</p>
              </div>
            )}

            {skillsArray.length > 0 && visibilitySettings?.skills !== false && (
              <div>
                <h3 className="text-[10px] font-bold mb-1.5 opacity-80">SKILLS</h3>
                <div className="space-y-1">
                  {skillsArray.map((skill, idx) => (
                    <div key={idx} className="text-[9px] flex items-center gap-1">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-2 p-4 bg-white flex flex-col overflow-hidden">
          <div className="space-y-2.5 flex-1 overflow-hidden">
            {data.bio && visibilitySettings?.bio !== false && (
              <div>
                <h3 className="text-xs font-bold text-blue-600 mb-1 pb-0.5 border-b border-gray-200">ABOUT</h3>
                <p className="text-[10px] text-gray-700 leading-tight">{data.bio}</p>
              </div>
            )}

            {data.education && visibilitySettings?.education !== false && (
              <div>
                <h3 className="text-xs font-bold text-blue-600 mb-1 pb-0.5 border-b border-gray-200">EDUCATION</h3>
                <p className="text-[10px] text-gray-700 leading-tight">{data.education}</p>
              </div>
            )}

            {data.projects && visibilitySettings?.projects !== false && (
              <div>
                <h3 className="text-xs font-bold text-blue-600 mb-1 pb-0.5 border-b border-gray-200">PROJECTS</h3>
                <p className="text-[10px] text-gray-700 leading-tight">{data.projects}</p>
              </div>
            )}

            {data.achievements && visibilitySettings?.achievements !== false && (
              <div>
                <h3 className="text-xs font-bold text-blue-600 mb-1 pb-0.5 border-b border-gray-200">ACHIEVEMENTS</h3>
                <p className="text-[10px] text-gray-700 leading-tight">{data.achievements}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeLayout;
