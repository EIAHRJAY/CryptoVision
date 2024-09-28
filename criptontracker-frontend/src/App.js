// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CryptoList from './pages/CryptoList';
import CryptoDetails from './pages/Cryptodetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cryptos" element={<CryptoList />} />
          <Route path="/cryptos/:id" element={<CryptoDetails />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;