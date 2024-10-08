import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Favorites.css'; 
import { FaRegTrashCan } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

const Favorites = () => {
  // Esto es solo temporal, aquí más adelante tendrás los favoritos que vienen del backend
  const [favoritos, setFavoritos] = useState([
    { id: 1, name: 'Bitcoin', price: '43.000' },
    { id: 2, name: 'Ethereum', price: '3.000' },
    { id: 3, name: 'Cardano', price: '2.15' }
  ]);

  return (
    <div className="favoritos-container">
      <h2> Favorites <FaHeart /> </h2>
      <ul className="favoritos-list">
        {favoritos.map(favorito => (
          <li key={favorito.id} className="favorito-item">
            <Link to="/cryptos/:id">
            <div className="favorito-info">
              <h3>{favorito.name}</h3>
              <p>Price: ${favorito.price}</p>
            </div>
            </Link>
            <button className="remove-favorite-btn"><FaRegTrashCan /></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
