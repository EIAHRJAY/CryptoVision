import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoAnalyticsSharp } from 'react-icons/io5';
import "../style/Navbar.css"

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [favoritesCount, setFavoritesCount] = useState(0);

  // Actualiza el token cuando cambia en el localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
      updateFavoritesCount();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Función para actualizar la cuenta de favoritos
  const updateFavoritesCount = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/favorites`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFavoritesCount(data.length); // Actualiza el número de favoritos
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  // Llama a updateFavoritesCount al cargar el componente o cada vez que el token cambia
  useEffect(() => {
    if (token) updateFavoritesCount();
  }, [token]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand ms-3" to="/">
        CRYPTO VISION <IoAnalyticsSharp className="Icon" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>

          {token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/favorites">
                  Favorites
                  {favoritesCount > 0 && (
                    <span className="badge  ms-1">
                      {favoritesCount}
                    </span>
                  )}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cryptos">
                  Crypto List
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login/Sign Up
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
