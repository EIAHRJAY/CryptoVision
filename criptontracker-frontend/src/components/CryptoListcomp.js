import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';
import { HiMiniPlusSmall } from "react-icons/hi2";

const CryptoList = () => {
  const [cryptos, setCryptos] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch(`${apiUrl}/cryptos`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  // Token JWT si es necesario
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cryptos');
        }

        const data = await response.json();
        setCryptos(data);
      } catch (error) {
        console.error('Error fetching cryptos:', error);
      }
    };

    fetchCryptos();
  }, [apiUrl]);

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
                <td>${parseFloat(crypto.priceUsd).toFixed(2)}</td>
                <td>
                  <Link to={`/cryptos/${crypto.id}`} className="text-decoration-none">
                    <HiMiniPlusSmall className='Icon' />Details 
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