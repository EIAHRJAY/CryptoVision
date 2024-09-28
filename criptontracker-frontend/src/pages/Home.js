// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";  // Importación por defecto (sin llaves)

const Home = () => {
  return (
    <div>
      <Navbar />  {/* Renderizando NavBar */}
      <h1>Welcome to the Crypto Tracker</h1>
    </div>
  );
};

export default Home;
