import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/Favorites.css';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

const Favorites = () => {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/favorites`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          },
        });

        // Verifica si 'data' contiene el formato esperado
        if (response.data) {
          const favoritosConPrecio = response.data.map(favorito => ({
            id: favorito.id,
            name: favorito.name,
            price: parseFloat(favorito.priceUsd).toFixed(2) // Asegura que el precio esté formateado
          }));
          setFavoritos(favoritosConPrecio);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/favorite/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });
      setFavoritos(favoritos.filter(favorito => favorito.id !== id));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div className="favoritos-container">
      <h2>Favorites <FaHeart /></h2>
      <ul className="favoritos-list">
        {favoritos.map(favorito => (
          <li key={favorito.id} className="favorito-item">
            <Link to={`/cryptos/${favorito.id}`}>
              <div className="favorito-info">
                <h3>{favorito.name}</h3>
                <p>Price: ${favorito.price}</p>
              </div>
            </Link>
            <button className="remove-favorite-btn" onClick={() => removeFavorite(favorito.id)}>
              <FaRegTrashCan />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
