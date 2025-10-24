import { LayoutProps } from './index';

const ElegantLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-white w-[595px] h-[842px] mx-auto p-6 overflow-auto flex flex-col" style={{ boxSizing: 'border-box' }}>
      <div className="text-center pb-4 border-b border-gray-300 flex-shrink-0">
        {photoUrl ? (
          <img 
            src={photoUrl} 
            alt={data.fullName} 
            className="w-24 h-24 rounded-full object-cover mx-auto ring-2 ring-blue-600 ring-offset-2"
            crossOrigin="anonymous"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white mx-auto ring-2 ring-blue-600 ring-offset-2">
            {data.fullName.charAt(0) || "?"}
          </div>
        )}
        
        <div className="mt-3">
          <h2 className="text-2xl font-serif font-bold tracking-wide text-gray-900">{data.fullName || "Your Name"}</h2>
          <p className="text-sm text-gray-600 italic mt-1">{data.title || "Your Title"}</p>
        </div>
      </div>

      <div className="space-y-3 mt-4 flex-1">
        {data.bio && (
          <div>
            <h3 className="text-center text-sm font-serif uppercase tracking-widest text-blue-600 mb-1.5">About</h3>
            <p className="text-center text-xs text-gray-700 leading-relaxed max-w-xl mx-auto">{data.bio}</p>
          </div>
        )}

        {skillsArray.length > 0 && (
          <div>
            <h3 className="text-center text-sm font-serif uppercase tracking-widest text-blue-600 mb-2">Expertise</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {skillsArray.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 border border-blue-600 rounded-full text-xs text-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.education && (
          <div>
            <h3 className="text-center text-sm font-serif uppercase tracking-widest text-blue-600 mb-1.5">Education</h3>
            <p className="text-center text-xs text-gray-700 leading-relaxed max-w-xl mx-auto">{data.education}</p>
          </div>
        )}

        {data.projects && (
          <div>
            <h3 className="text-center text-sm font-serif uppercase tracking-widest text-blue-600 mb-1.5">Projects</h3>
            <p className="text-center text-xs text-gray-700 leading-relaxed max-w-xl mx-auto">{data.projects}</p>
          </div>
        )}

        {data.achievements && (
          <div>
            <h3 className="text-center text-sm font-serif uppercase tracking-widest text-blue-600 mb-1.5">Achievements</h3>
            <p className="text-center text-xs text-gray-700 leading-relaxed max-w-xl mx-auto">{data.achievements}</p>
          </div>
        )}
      </div>

      {(data.contactEmail || data.contactPhone) && (
        <div className="pt-3 border-t border-gray-300 mt-4 text-center flex-shrink-0">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-600">
            {data.contactEmail && <span>{data.contactEmail}</span>}
            {data.contactPhone && <span>{data.contactPhone}</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ElegantLayout;
