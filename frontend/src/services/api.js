import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const checkEligibility = async (userData) => {
  try {
    const response = await api.post('/check-eligibility', userData);
    return response.data;
  } catch (error) {
    // Better error handling for FastAPI errors
    if (error.response) {
      const errorData = error.response.data;
      // FastAPI returns errors in different formats
      if (errorData.detail) {
        throw { detail: errorData.detail };
      } else if (typeof errorData === 'string') {
        throw { detail: errorData };
      } else if (errorData.message) {
        throw { detail: errorData.message };
      } else {
        throw { detail: JSON.stringify(errorData) };
      }
    } else if (error.request) {
      throw { detail: 'Unable to connect to server. Please make sure the backend is running on http://localhost:8000' };
    } else {
      throw { detail: error.message || 'An unexpected error occurred' };
    }
  }
};

export const getAllSchemes = async () => {
  try {
    const response = await api.get('/schemes');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const searchSchemes = async (query) => {
  try {
    const response = await api.get(`/search?query=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;
