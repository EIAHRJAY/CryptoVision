// src/fluxo.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/';  // Cambia esta URL según sea necesario

export const fetchCryptoData = async () => {
  try {
    const response = await axios.get(`${API_URL}/crypto`);
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};
