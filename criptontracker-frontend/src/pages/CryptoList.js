// src/components/CryptoList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCrypto } from '../context/CryptoContext';

const CryptoList = () => {
  const { cryptoData } = useCrypto();

  return (
    <div>
      <h2>Crypto List</h2>
      <ul>
        {cryptoData.map((crypto) => (
          <li key={crypto.id}>
            <Link to={`/cryptos/${crypto.id}`}>{crypto.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoList;
