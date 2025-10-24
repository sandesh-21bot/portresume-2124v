import { LayoutProps } from './index';

const TechLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-gray-900 w-[595px] h-[842px] mx-auto overflow-auto flex flex-col" style={{ boxSizing: 'border-box' }}>
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          {photoUrl && (
            <img 
              src={photoUrl} 
              alt={data.fullName} 
              className="w-20 h-20 rounded object-cover border-2 border-white"
              crossOrigin="anonymous"
            />
          )}
          
          <div className="flex-1 text-white min-w-0">
            <h2 className="text-2xl font-mono font-bold truncate">{data.fullName || "Your Name"}</h2>
            <p className="text-sm font-mono opacity-90 mt-1">{data.title || "Your Title"}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4 flex-1">
        {data.bio && (
          <div className="border-l-2 border-cyan-500 pl-3">
            <h3 className="text-sm font-mono font-bold text-cyan-400 mb-1.5">// ABOUT</h3>
            <p className="text-xs text-gray-300 leading-relaxed font-mono">{data.bio}</p>
          </div>
        )}

        {skillsArray.length > 0 && (
          <div className="border-l-2 border-cyan-500 pl-3">
            <h3 className="text-sm font-mono font-bold text-cyan-400 mb-2">// SKILLS</h3>
            <div className="flex flex-wrap gap-1.5">
              {skillsArray.map((skill, idx) => (
                <span key={idx} className="px-2 py-1 bg-cyan-900/50 text-cyan-300 rounded text-xs font-mono border border-cyan-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.education && (
          <div className="border-l-2 border-cyan-500 pl-3">
            <h3 className="text-sm font-mono font-bold text-cyan-400 mb-1.5">// EDUCATION</h3>
            <p className="text-xs text-gray-300 leading-relaxed font-mono">{data.education}</p>
          </div>
        )}

        {data.projects && (
          <div className="border-l-2 border-cyan-500 pl-3">
            <h3 className="text-sm font-mono font-bold text-cyan-400 mb-1.5">// PROJECTS</h3>
            <p className="text-xs text-gray-300 leading-relaxed font-mono">{data.projects}</p>
          </div>
        )}

        {data.achievements && (
          <div className="border-l-2 border-cyan-500 pl-3">
            <h3 className="text-sm font-mono font-bold text-cyan-400 mb-1.5">// ACHIEVEMENTS</h3>
            <p className="text-xs text-gray-300 leading-relaxed font-mono">{data.achievements}</p>
          </div>
        )}
      </div>

      <div className="px-6 py-4 bg-gray-950 border-t border-cyan-900 flex-shrink-0">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-cyan-400 font-mono">
          {data.contactEmail && <span>📧 {data.contactEmail}</span>}
          {data.contactPhone && <span>📱 {data.contactPhone}</span>}
        </div>
      </div>
    </div>
  );
};

export default TechLayout;
