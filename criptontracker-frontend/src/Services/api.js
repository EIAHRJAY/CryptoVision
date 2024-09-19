
import axios from 'axios';

const API_URL = 'http://localhost:3001/';  // Cambia esta URL según sea necesario

export const registerUser = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const getCryptoData = () => {
  return axios.get(`${API_URL}/crypto`);
};
