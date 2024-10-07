import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa6";

const CryptoList = () => {
  const [cryptos, setCryptos] = useState([]); // Lista de criptomonedas
  const [searchTerm, setSearchTerm] = useState(''); // Valor del buscador

  // Simulamos una llamada API para obtener las criptomonedas
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
      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar criptomoneda..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="crypto-search-input"
      />

      {/* Lista de criptomonedas filtradas */}
      <div >
        <ul className="crypto-list list-unstyled">
          {filteredCryptos.map((crypto) => (
            <li key={crypto.id} className="crypto-item">
                
                <div className='d-md-flex justify-content-md-end'>
                  <button className='btn btn-outline-secondary ' type='button'><FaHeart /></button>
                </div>
                <br/>
              <Link to={`/cryptos/${crypto.id}`} className="text-decoration-none text-dark">
                <div className="d-flex justify-content-between align-items-center">
                  <div>{crypto.name}</div> 
                  <div>${crypto.current_price}</div>
                </div>
              </Link>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CryptoList;
