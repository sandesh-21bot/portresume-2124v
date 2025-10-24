import { LayoutProps } from './index';

const TechLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-gray-900 w-[595px] h-[842px] mx-auto overflow-hidden flex flex-col" style={{ boxSizing: 'border-box' }}>
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          {photoUrl && (
            <img 
              src={photoUrl} 
              alt={data.fullName} 
              className="w-16 h-16 rounded object-cover border-2 border-white"
              crossOrigin="anonymous"
            />
          )}
          
          <div className="flex-1 text-white min-w-0">
            <h2 className="text-xl font-mono font-bold truncate">{data.fullName || "Your Name"}</h2>
            <p className="text-xs font-mono opacity-90 mt-0.5">{data.title || "Your Title"}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-3 flex-1 overflow-hidden">
        {data.bio && (
          <div className="border-l-2 border-cyan-500 pl-2">
            <h3 className="text-xs font-mono font-bold text-cyan-400 mb-1">// ABOUT</h3>
            <p className="text-[10px] text-gray-300 leading-tight font-mono">{data.bio}</p>
          </div>
        )}

        {skillsArray.length > 0 && (
          <div className="border-l-2 border-cyan-500 pl-2">
            <h3 className="text-xs font-mono font-bold text-cyan-400 mb-1.5">// SKILLS</h3>
            <div className="flex flex-wrap gap-1">
              {skillsArray.map((skill, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-cyan-900/50 text-cyan-300 rounded text-[9px] font-mono border border-cyan-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.education && (
          <div className="border-l-2 border-cyan-500 pl-2">
            <h3 className="text-xs font-mono font-bold text-cyan-400 mb-1">// EDUCATION</h3>
            <p className="text-[10px] text-gray-300 leading-tight font-mono">{data.education}</p>
          </div>
        )}

        {data.projects && (
          <div className="border-l-2 border-cyan-500 pl-2">
            <h3 className="text-xs font-mono font-bold text-cyan-400 mb-1">// PROJECTS</h3>
            <p className="text-[10px] text-gray-300 leading-tight font-mono">{data.projects}</p>
          </div>
        )}

        {data.achievements && (
          <div className="border-l-2 border-cyan-500 pl-2">
            <h3 className="text-xs font-mono font-bold text-cyan-400 mb-1">// ACHIEVEMENTS</h3>
            <p className="text-[10px] text-gray-300 leading-tight font-mono">{data.achievements}</p>
          </div>
        )}
      </div>

      <div className="px-6 py-3 bg-gray-950 border-t border-cyan-900 flex-shrink-0">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[9px] text-cyan-400 font-mono">
          {data.contactEmail && <span>📧 {data.contactEmail}</span>}
          {data.contactPhone && <span>📱 {data.contactPhone}</span>}
        </div>
      </div>
    </div>
  );
};

export default TechLayout;
