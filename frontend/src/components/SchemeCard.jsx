const normalizeUrl = (url) => {
  if (!url) return '';
  const trimmed = String(url).trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  // Fallback: assume https if protocol is missing
  return `https://${trimmed}`;
};

const SchemeCard = ({ scheme }) => {
  const getCategoryColor = (category) => {
    const colors = {
      agriculture: 'bg-green-100 text-green-800',
      health: 'bg-red-100 text-red-800',
      education: 'bg-blue-100 text-blue-800',
      housing: 'bg-purple-100 text-purple-800',
      business: 'bg-yellow-100 text-yellow-800',
      employment: 'bg-indigo-100 text-indigo-800',
      pension: 'bg-pink-100 text-pink-800',
      women: 'bg-rose-100 text-rose-800',
      insurance: 'bg-cyan-100 text-cyan-800',
      default: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || colors.default;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {scheme.scheme_name}
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(scheme.category)}`}>
            {scheme.category}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4">{scheme.benefit}</p>
        
        <div className="space-y-2 mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <span className="font-medium mr-2">Age:</span>
            <span>Min {scheme.min_age} years</span>
            {scheme.max_age && <span className="ml-2">- Max {scheme.max_age} years</span>}
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-2">Income:</span>
            <span>Up to ₹{scheme.max_income.toLocaleString('en-IN')}/year</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-2">Occupation:</span>
            <span>{scheme.occupation.join(', ')}</span>
          </div>
        </div>
        
        <a
          href={normalizeUrl(scheme.apply_link)}
          className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default SchemeCard;
