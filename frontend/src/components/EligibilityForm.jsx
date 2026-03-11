import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkEligibility } from '../services/api';
import Loader from './Loader';

const EligibilityForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    income: '',
    occupation: '',
    gender: '',
    state: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const occupations = [
    'all',
    'farmer',
    'student',
    'entrepreneur',
    'self-employed',
    'unemployed',
    'artisan',
    'craftsman',
    'weaver',
    'fisherman',
    'health_worker',
    'professional',
    'researcher',
    'street vendor',
    'unorganized worker',
    'artist',
    'child',
    'women',
  ];

  const states = [
    'all',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Delhi',
    'Jammu and Kashmir',
    'Ladakh',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.age || !formData.income || !formData.occupation || !formData.gender || !formData.state) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (formData.age < 0 || formData.age > 120) {
      setError('Please enter a valid age (0-120)');
      setLoading(false);
      return;
    }

    if (formData.income < 0) {
      setError('Please enter a valid income');
      setLoading(false);
      return;
    }

    try {
      const requestData = {
        age: parseInt(formData.age),
        income: parseInt(formData.income),
        occupation: formData.occupation,
        gender: formData.gender,
        state: formData.state,
      };
      
      console.log('Sending eligibility check request:', requestData);
      
      const response = await checkEligibility(requestData);
      
      console.log('Received response:', response);
      
      // Navigate to results page with data
      navigate('/results', { state: { schemes: response.eligible_schemes, totalCount: response.total_count } });
    } catch (err) {
      console.error('Error checking eligibility:', err);
      // Handle different error formats
      let errorMessage = 'An error occurred. Please try again.';
      if (err.detail) {
        errorMessage = err.detail;
      } else if (typeof err === 'string') {
        errorMessage = err;
      } else if (err.message) {
        errorMessage = err.message;
      } else if (err.response?.data?.detail) {
        errorMessage = err.response.data.detail;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Check Your Eligibility
      </h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <div className="font-semibold mb-1">Error:</div>
          <div>{error}</div>
          <div className="mt-2 text-sm text-red-600">
            💡 Tip: Make sure the backend server is running on http://localhost:8000
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
            Age *
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="0"
            max="120"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter your age"
          />
        </div>

        <div>
          <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-2">
            Annual Income (₹) *
          </label>
          <input
            type="number"
            id="income"
            name="income"
            value={formData.income}
            onChange={handleChange}
            min="0"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter your annual income"
          />
        </div>

        <div>
          <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-2">
            Occupation *
          </label>
          <select
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Select occupation</option>
            {occupations.map((occ) => (
              <option key={occ} value={occ}>
                {occ.charAt(0).toUpperCase() + occ.slice(1).replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
            Gender *
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Select state</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state.charAt(0).toUpperCase() + state.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Checking Eligibility...
            </span>
          ) : (
            'Check Eligible Schemes'
          )}
        </button>
      </form>
    </div>
  );
};

export default EligibilityForm;
