// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";  // Importación por defecto (sin llaves)

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Crypto Tracker</h1>
      <Link to="/cryptos">View Cryptos</Link>
      <Navbar />  {/* Renderizando NavBar */}
    </div>
  );
};

export default Home;
