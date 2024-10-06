// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CryptoList from './pages/CryptoList';
import CryptoDetails from './pages/CryptoDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginSingup from './pages/LoginSignup';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
          <ChatBot/>
        <main>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<LoginSingup />} />
          <Route path="/cryptos" element={<CryptoList />} />
          <Route path="/cryptos/:id" element={<CryptoDetails />} />
        </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;