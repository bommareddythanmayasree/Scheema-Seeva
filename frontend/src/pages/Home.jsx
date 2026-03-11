import EligibilityForm from '../components/EligibilityForm';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to SchemeSeva
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Discover Government Welfare Schemes You're Eligible For
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Simply enter your details and find out which government schemes you qualify for.
            Get access to benefits, subsidies, and support programs designed for you.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Easy Eligibility Check</h3>
            <p className="text-gray-600">
              Quick and simple eligibility verification based on your profile
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">100+ Schemes</h3>
            <p className="text-gray-600">
              Comprehensive database of government welfare schemes
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-xl font-semibold mb-2">Direct Apply Links</h3>
            <p className="text-gray-600">
              Get direct links to official application portals
            </p>
          </div>
        </div>

        {/* Eligibility Form */}
        <EligibilityForm />
      </div>
    </div>
  );
};

export default Home;
