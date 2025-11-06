import axios from 'axios';

// Use environment variable for API URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const getWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather?city=${city}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
  }
};

export const convertCurrency = async (amount, from = 'INR', to) => {
  try {
    const response = await axios.get(`${BASE_URL}/currency?amount=${amount}&from=${from}&to=${to}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to convert currency');
  }
};

export const getQuote = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/quote`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch quote');
  }
};