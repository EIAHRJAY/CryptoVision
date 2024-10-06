// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import { CryptoProvider } from './context/CryptoContext'; // Importa el proveedor

const root = createRoot(document.getElementById('root')); // Crea la raíz
root.render(
  <React.StrictMode>
    <CryptoProvider>
      <App />
    </CryptoProvider>
  </React.StrictMode>
);
