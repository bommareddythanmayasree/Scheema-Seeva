import { useLocation, useNavigate } from 'react-router-dom';
import SchemeCard from '../components/SchemeCard';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const schemes = location.state?.schemes || [];
  const totalCount = location.state?.totalCount || 0;

  if (!location.state) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">No Results Found</h2>
          <p className="text-gray-600 mb-6">Please check your eligibility first.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-primary-600 hover:text-primary-700 font-medium mb-4 flex items-center"
          >
            ← Back to Home
          </button>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Eligible Schemes
          </h2>
          <p className="text-xl text-gray-600">
            You are eligible for <span className="font-semibold text-primary-600">{totalCount}</span> scheme{totalCount !== 1 ? 's' : ''}
          </p>
        </div>

        {schemes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No Eligible Schemes Found
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any schemes matching your profile. Try checking all available schemes.
            </p>
            <button
              onClick={() => navigate('/schemes')}
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
            >
              Browse All Schemes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
