import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import'../style/Navbar.css';
import { HiMiniPlusSmall } from "react-icons/hi2";

const CryptoList = () => {
  const [cryptos, setCryptos] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');

  
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
      .then((response) => response.json())
      .then((data) => setCryptos(data));
  }, []);

  // Filtrar criptomonedas según el término de búsqueda
  const filteredCryptos = cryptos.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="crypto-list-container">
     
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="crypto-search-input form-control mb-3"
      />

      
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Current Price(USD)</th>
              <th>More Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredCryptos.map((crypto, index) => (
              <tr key={crypto.id}>
                <td>{index + 1}</td>
                <td>{crypto.name}</td>
                <td>{crypto.symbol.toUpperCase()}</td>
                <td>${crypto.current_price.toFixed(2)}</td>
                <td>
                  <Link to={`/cryptos/${crypto.id}`} className="text-decoration-none">
                  <HiMiniPlusSmall className='Icon'/>Details 
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoList;
