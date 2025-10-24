import { LayoutProps } from './index';

const ElegantLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-white w-[595px] h-[842px] mx-auto p-8 overflow-hidden flex flex-col" style={{ boxSizing: 'border-box' }}>
      <div className="text-center pb-3 border-b border-gray-300 flex-shrink-0">
        {photoUrl ? (
          <img 
            src={photoUrl} 
            alt={data.fullName} 
            className="w-20 h-20 rounded-full object-cover mx-auto ring-2 ring-blue-600 ring-offset-2"
            crossOrigin="anonymous"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white mx-auto ring-2 ring-blue-600 ring-offset-2">
            {data.fullName.charAt(0) || "?"}
          </div>
        )}
        
        <div className="mt-2">
          <h2 className="text-2xl font-serif font-bold tracking-wide text-gray-900">{data.fullName || "Your Name"}</h2>
          <p className="text-sm text-gray-600 italic mt-1">{data.title || "Your Title"}</p>
        </div>
      </div>

      <div className="space-y-2.5 mt-3 flex-1 overflow-hidden">
        {data.bio && (
          <div>
            <h3 className="text-center text-xs font-serif uppercase tracking-widest text-blue-600 mb-1">About</h3>
            <p className="text-center text-[10px] text-gray-700 leading-tight max-w-xl mx-auto">{data.bio}</p>
          </div>
        )}

        {skillsArray.length > 0 && (
          <div>
            <h3 className="text-center text-xs font-serif uppercase tracking-widest text-blue-600 mb-1.5">Expertise</h3>
            <div className="flex flex-wrap justify-center gap-1.5">
              {skillsArray.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 border border-blue-600 rounded-full text-[9px] text-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.education && (
          <div>
            <h3 className="text-center text-xs font-serif uppercase tracking-widest text-blue-600 mb-1">Education</h3>
            <p className="text-center text-[10px] text-gray-700 leading-tight max-w-xl mx-auto">{data.education}</p>
          </div>
        )}

        {data.projects && (
          <div>
            <h3 className="text-center text-xs font-serif uppercase tracking-widest text-blue-600 mb-1">Projects</h3>
            <p className="text-center text-[10px] text-gray-700 leading-tight max-w-xl mx-auto">{data.projects}</p>
          </div>
        )}

        {data.achievements && (
          <div>
            <h3 className="text-center text-xs font-serif uppercase tracking-widest text-blue-600 mb-1">Achievements</h3>
            <p className="text-center text-[10px] text-gray-700 leading-tight max-w-xl mx-auto">{data.achievements}</p>
          </div>
        )}
      </div>

      {(data.contactEmail || data.contactPhone) && (
        <div className="pt-2 border-t border-gray-300 mt-auto text-center flex-shrink-0">
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] text-gray-600">
            {data.contactEmail && <span>{data.contactEmail}</span>}
            {data.contactPhone && <span>{data.contactPhone}</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ElegantLayout;
