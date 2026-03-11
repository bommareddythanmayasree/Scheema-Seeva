const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About SchemeSeva</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-4">
              SchemeSeva is a comprehensive platform designed to help Indian citizens discover 
              which government welfare schemes they are eligible for based on their personal 
              information such as age, income, occupation, gender, and state.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h3>
            <p className="text-gray-700 mb-4">
              To bridge the gap between citizens and government welfare schemes by providing 
              an easy-to-use platform that helps people identify and access the benefits they 
              are entitled to.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How It Works</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
              <li>Enter your personal details (age, income, occupation, gender, state)</li>
              <li>Our eligibility engine matches your profile with available schemes</li>
              <li>View all eligible schemes with detailed information</li>
              <li>Access direct application links to official government portals</li>
            </ol>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Quick eligibility checking based on multiple criteria</li>
              <li>Comprehensive database of 100+ government schemes</li>
              <li>Search functionality to find specific schemes</li>
              <li>Direct links to official application portals</li>
              <li>User-friendly interface with modern design</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Categories Covered</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-700">
              <div>• Agriculture</div>
              <div>• Health</div>
              <div>• Education</div>
              <div>• Housing</div>
              <div>• Employment</div>
              <div>• Business</div>
              <div>• Pension</div>
              <div>• Women Welfare</div>
              <div>• Insurance</div>
              <div>• And many more...</div>
            </div>

            <div className="mt-8 p-4 bg-primary-50 rounded-lg">
              <p className="text-gray-700">
                <strong>Note:</strong> This platform is for informational purposes only. 
                Please verify all details and eligibility criteria on the official government 
                portals before applying for any scheme.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
