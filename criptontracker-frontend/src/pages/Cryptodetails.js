// src/components/CryptoDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useCrypto } from '../context/CryptoContext';

const CryptoDetails = () => {
  const { id } = useParams();
  const { cryptoData } = useCrypto();
  const crypto = cryptoData.find((c) => c.id === id);

  if (!crypto) {
    return <div>Crypto not found!</div>;
  }

  return (
    <div>
      <h2>{crypto.name} Details</h2>
      <p>Price: ${crypto.price}</p>
      <p>Market Cap: ${crypto.marketCap}</p>
    </div>
  );
};

export default CryptoDetails;
