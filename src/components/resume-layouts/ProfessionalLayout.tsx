import { LayoutProps } from './index';

const ProfessionalLayout = ({ data, photoUrl, visibilitySettings }: LayoutProps) => {
  const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-white w-[595px] h-[842px] mx-auto overflow-auto flex flex-col" style={{ boxSizing: 'border-box' }}>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white flex-shrink-0">
        <div className="flex items-center gap-4">
          {photoUrl ? (
            <img 
              src={photoUrl} 
              alt={data.fullName} 
              className="w-20 h-20 rounded-lg object-cover border-2 border-white/50"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="w-20 h-20 rounded-lg bg-white/20 flex items-center justify-center text-xl font-bold border-2 border-white/50">
              {data.fullName.charAt(0) || "?"}
            </div>
          )}
          
          <div>
            <h2 className="text-2xl font-bold">{data.fullName || "Your Name"}</h2>
            <p className="text-sm mt-1 opacity-90">{data.title || "Your Title"}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-3 flex-1">
        {data.bio && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-1.5 text-blue-600">Professional Summary</h3>
            <p className="text-xs text-gray-700 leading-relaxed">{data.bio}</p>
          </div>
        )}

        {skillsArray.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-1.5 text-blue-600">Core Competencies</h3>
            <div className="grid grid-cols-2 gap-1.5">
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
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-1.5 text-blue-600">Education</h3>
            <p className="text-xs text-gray-700 leading-relaxed">{data.education}</p>
          </div>
        )}

        {data.projects && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-1.5 text-blue-600">Projects</h3>
            <p className="text-xs text-gray-700 leading-relaxed">{data.projects}</p>
          </div>
        )}

        {data.achievements && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-1.5 text-blue-600">Achievements</h3>
            <p className="text-xs text-gray-700 leading-relaxed">{data.achievements}</p>
          </div>
        )}
      </div>

      {(data.contactEmail || data.contactPhone) && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex-shrink-0">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-1.5 text-blue-600">Contact Information</h3>
          <div className="space-y-1">
            {data.contactEmail && (
              <p className="text-xs text-gray-700">Email: {data.contactEmail}</p>
            )}
            {data.contactPhone && (
              <p className="text-xs text-gray-700">Phone: {data.contactPhone}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalLayout;
