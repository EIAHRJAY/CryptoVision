import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoAnalyticsSharp } from 'react-icons/io5';

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem('token')); // Inicializar con el token si ya está en localStorage

  // Usamos useEffect para escuchar los cambios en el localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token')); // Actualiza el token cuando cambie en localStorage
    };

    // Añadir un event listener que escuche cuando se actualiza el localStorage
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange); // Limpiar el event listener cuando se desmonte
    };
  }, []);

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
          {/* Este siempre estará visible */}
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>

          {/* Si el token está presente, muestra estos botones */}
          {token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/favorites">
                  Favorites
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cryptos">
                  Crypto List
                </Link>
              </li>
            </>
          ) : (
            // Si no hay token, muestra solo el botón de Login/Sign Up
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
