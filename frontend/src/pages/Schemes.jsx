import { useState, useEffect } from 'react';
import { getAllSchemes, searchSchemes } from '../services/api';
import SchemeCard from '../components/SchemeCard';
import Loader from '../components/Loader';

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      setLoading(true);
      const data = await getAllSchemes();
      setSchemes(data);
      setError('');
    } catch (err) {
      setError('Failed to load schemes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchSchemes();
      return;
    }

    try {
      setLoading(true);
      const data = await searchSchemes(searchQuery);
      setSchemes(data);
      setError('');
    } catch (err) {
      setError('Failed to search schemes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            All Government Schemes
          </h2>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search schemes by name or category..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
              >
                Search
              </button>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    fetchSchemes();
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-md transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </form>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
        </div>

        {loading ? (
          <Loader />
        ) : schemes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No Schemes Found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search query or browse all schemes.
            </p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              Showing <span className="font-semibold">{schemes.length}</span> scheme{schemes.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schemes.map((scheme) => (
                <SchemeCard key={scheme.id} scheme={scheme} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Schemes;
