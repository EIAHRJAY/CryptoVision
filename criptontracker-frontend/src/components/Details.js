import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'chart.js/auto';
import '../style/Details.css'; // Asumiendo que tengas un archivo CSS en styles
import { FaRegHeart } from "react-icons/fa";

const Details = () => {
    const { id } = useParams();
    const [crypto, setCrypto] = useState(null);
    const [historicalData, setHistoricalData] = useState([]);
    const apiUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetchCryptoDetails = async () => {
            try {
                const response = await axios.get(`${apiUrl}/cryptos/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
                    },
                });
                setCrypto(response.data);
            } catch (error) {
                console.error('Error fetching crypto details:', error);
            }
        };

        const fetchHistoricalData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/cryptos/${id}/history`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
                    },
                });
                setHistoricalData(response.data.history);
            } catch (error) {
                console.error('Error fetching historical data:', error);
            }
        };

        fetchCryptoDetails();
        fetchHistoricalData();
    }, [id, apiUrl]);

    const addToFavorites = () => {
        console.log(`${crypto.name} añadido a favoritos.`);
    };

    if (!crypto) {
        return <div>Crypto not found or loading...</div>;
    }

    return (
     
        <div className="details-container mt-5">
            <div className="header">
                <h2>{crypto.name}</h2>
                <button className="favorites-button" onClick={addToFavorites}>
                    <FaRegHeart />
                </button>
            </div>

            <div className="content">
                <div className="crypto-info">
                    <p><strong>Price:</strong> ${parseFloat(crypto.priceUsd).toFixed(2)}</p>
                    <p><strong>Market Cap:</strong> ${parseFloat(crypto.marketCapUsd).toFixed(2)}</p>
                </div>

                <div className="chart-container">
                    <Line
                        data={{
                            labels: historicalData.map((data) => data.date),
                            datasets: [
                                {
                                    label: `${crypto.name} Price`,
                                    data: historicalData.map((data) => data.price),
                                    borderColor: 'rgba(75, 192, 192, 1)',
                                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                    pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                                    pointBorderColor: 'rgba(75, 192, 192, 1)',
                                    tension: 0.4,
                                    borderWidth: 2,
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                            scales: {
                                x: {
                                    grid: {
                                        display: true,
                                    },
                                },
                                y: {
                                    grid: {
                                        borderDash: [8, 4],
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Details;
