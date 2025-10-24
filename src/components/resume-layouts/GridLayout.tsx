import { LayoutProps } from './index';

const GridLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="w-[595px] h-[842px] mx-auto bg-white overflow-auto flex flex-col" style={{ boxSizing: 'border-box' }}>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white flex-shrink-0">
        <div className="flex items-center gap-4">
          {photoUrl && (
            <img 
              src={photoUrl} 
              alt={data.fullName} 
              className="w-20 h-20 rounded-lg object-cover border-2 border-white/50"
              crossOrigin="anonymous"
            />
          )}
          <div>
            <h2 className="text-2xl font-bold">{data.fullName || "Your Name"}</h2>
            <p className="text-sm mt-1 opacity-90">{data.title || "Your Title"}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-5 overflow-auto">
        <div className="grid grid-cols-2 gap-3">
          {data.bio && (
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <h3 className="text-sm font-semibold mb-1.5 text-blue-600">About</h3>
              <p className="text-xs text-gray-700 leading-relaxed">{data.bio}</p>
            </div>
          )}

          {skillsArray.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <h3 className="text-sm font-semibold mb-2 text-blue-600">Skills</h3>
              <div className="space-y-1">
                {skillsArray.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    <span className="text-xs text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.education && (
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <h3 className="text-sm font-semibold mb-1.5 text-blue-600">Education</h3>
              <p className="text-xs text-gray-700 leading-relaxed">{data.education}</p>
            </div>
          )}

          {data.projects && (
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <h3 className="text-sm font-semibold mb-1.5 text-blue-600">Projects</h3>
              <p className="text-xs text-gray-700 leading-relaxed">{data.projects}</p>
            </div>
          )}

          {data.achievements && (
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <h3 className="text-sm font-semibold mb-1.5 text-blue-600">Achievements</h3>
              <p className="text-xs text-gray-700 leading-relaxed">{data.achievements}</p>
            </div>
          )}

          {(data.contactEmail || data.contactPhone) && (
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <h3 className="text-sm font-semibold mb-2 text-blue-600">Contact</h3>
              <div className="space-y-1.5">
                {data.contactEmail && (
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Email</p>
                    <p className="text-xs text-gray-700">{data.contactEmail}</p>
                  </div>
                )}
                {data.contactPhone && (
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                    <p className="text-xs text-gray-700">{data.contactPhone}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GridLayout;
