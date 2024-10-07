// src/components/CryptoList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCrypto } from '../context/CryptoContext';
import "../style/CryptoList.css"
import CriptoList from "../components/CryptoListcomp"

const CryptoList = () => {
  const { cryptoData } = useCrypto();

  return (
    <div>
      <CriptoList/>
      {/* <h2>Crypto List</h2>
      <ul className="list-group">
        <li className="list-group-item active" aria-current="true">An active item</li>
        <li className="list-group-item">A second item</li>
        <li className="list-group-item">A third item</li>
        <li className="list-group-item">A fourth item</li>
        <li className="list-group-item">And a fifth one</li>
      </ul> */}
    </div>
  );
};

export default CryptoList;
