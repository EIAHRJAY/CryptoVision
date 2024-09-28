// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../style/Navbar.css"
import { IoAnalyticsSharp } from "react-icons/io5";

const Navbar = () => {  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand ms-3" href="/">  CRYPTO VISION <IoAnalyticsSharp className='Icon'/></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">Favorites</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/cryptolist">Crypto List</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;