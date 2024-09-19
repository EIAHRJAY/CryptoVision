// src/context/CryptoContext.js
import React, { createContext, useState, useContext } from 'react';
import { fetchCryptoData } from '../fluxo'; // Asegúrate de tener las funciones necesarias importadas

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState([]);

  const loadCryptoData = async () => {
    try {
      const data = await fetchCryptoData();
      setCryptoData(data);
    } catch (error) {
      console.error('Error loading crypto data:', error);
    }
  };

  return (
    <CryptoContext.Provider value={{ cryptoData, loadCryptoData }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => useContext(CryptoContext);
