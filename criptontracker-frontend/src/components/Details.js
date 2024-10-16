import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { useCrypto } from '../context/CryptoContext';
import axios from 'axios';
import 'chart.js/auto'; // Importación necesaria para que funcione Chart.js


const Details = () => {
    const { id } = useParams();
    const { cryptoData } = useCrypto();
    const crypto = cryptoData.find((c) => c.id === id);
    const [historicalData, setHistoricalData] = useState([]);
  
    useEffect(() => {
      const fetchHistoricalData = async () => {
        try {
          const response = await axios.get(`/api/crypto/${id}/historical`);
          setHistoricalData(response.data.prices);
        } catch (error) {
          console.error('Error fetching historical data', error);
        }
      };
  
      fetchHistoricalData();
    }, [id]);
  
    if (!crypto) {
      return <div>Crypto not found!</div>;
    }
  
    // Configuración del gráfico
    const chartData = {
      labels: historicalData.map((data) => data.date),
      datasets: [
        {
          label: `${crypto.name} Price`,
          data: historicalData.map((data) => data.price),
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1,
        },
      ],
    };
  
    return (
      <div>
        <h2>{crypto.name} Details</h2>
        <p>Price: ${crypto.price}</p>
        <p>Market Cap: ${crypto.marketCap}</p>
  
        {/* Gráfico de precio histórico */}
        <div>
          <h3>Price History</h3>
          <Line data={chartData} />
        </div>
      </div>
    );
  };
  
  export default Details;