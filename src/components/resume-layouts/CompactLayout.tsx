import { LayoutProps } from './index';

const CompactLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-white w-[595px] h-[842px] mx-auto p-6 overflow-hidden flex flex-col" style={{ boxSizing: 'border-box' }}>
      <div className="flex items-center gap-3 flex-shrink-0 pb-2 border-b border-gray-300">
        {photoUrl ? (
          <img 
            src={photoUrl} 
            alt={data.fullName} 
            className="w-14 h-14 rounded object-cover border border-blue-600"
            crossOrigin="anonymous"
          />
        ) : (
          <div className="w-14 h-14 rounded bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg font-bold text-white border border-blue-600">
            {data.fullName.charAt(0) || "?"}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-gray-900 truncate">{data.fullName || "Your Name"}</h2>
          <p className="text-xs text-gray-600">{data.title || "Your Title"}</p>
          <div className="flex gap-2 mt-1 text-[10px] text-gray-600">
            {data.contactEmail && <span>{data.contactEmail}</span>}
            {data.contactPhone && <span>{data.contactPhone}</span>}
          </div>
        </div>
      </div>

      <div className="space-y-2.5 mt-3 flex-1 overflow-hidden">
        {data.bio && (
          <div>
            <p className="text-[10px] text-gray-700 leading-tight">{data.bio}</p>
          </div>
        )}

        {skillsArray.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold text-blue-600 mb-1">SKILLS</p>
            <div className="flex flex-wrap gap-1">
              {skillsArray.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] border border-blue-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.education && (
          <div>
            <p className="text-[10px] font-semibold text-blue-600 mb-1">EDUCATION</p>
            <p className="text-[10px] text-gray-700 leading-tight">{data.education}</p>
          </div>
        )}

        {data.projects && (
          <div>
            <p className="text-[10px] font-semibold text-blue-600 mb-1">PROJECTS</p>
            <p className="text-[10px] text-gray-700 leading-tight">{data.projects}</p>
          </div>
        )}

        {data.achievements && (
          <div>
            <p className="text-[10px] font-semibold text-blue-600 mb-1">ACHIEVEMENTS</p>
            <p className="text-[10px] text-gray-700 leading-tight">{data.achievements}</p>
          </div>
        )}
      </div>
    </div>
  );
};


export default CompactLayout;
