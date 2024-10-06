import React, { useEffect, useState } from "react";
import "../style/TrendingSection.css"
const TrendingSection = () => {
  const [cryptoData, setCryptoData] = useState([]);

//   useEffect(() => {
//     const fetchCryptoData = async () => {
//       try {
//         const response = await fetch("https://api.coinmarketcap.com/v2/ticker/?start=0&limit=12");
//         const data = await response.json();
//         setCryptoData(Object.values(data.data));
//       } catch (error) {
//         console.error("Error fetching crypto data:", error);
//       }
//     };
//     fetchCryptoData();
//   }, []);

  return (
    <section className="section-bg-light-grey section-spacing-md">
      <div className="container max-lg padding-a-xsm">
    <div className="d-flex align-items-center justify-content-between">
      <div className="text-container">
        <h1>Welcome to Crypto Vision</h1>
        <p className="margin-bottom-md">
          Here, we offer a cryptocurrency expert AI to guide you with everything you need. Use our chat to get recommendations and analysis on the coins you're interested in. Track the growth of your cryptocurrencies and take advantage of the option to add your favorite coins to a personalized list, allowing you to follow them closely and have better control over their performance.
        </p>
      </div>
      <div className="carousel-container">
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://static.vecteezy.com/system/resources/previews/010/874/292/non_2x/bitcoin-usdt-and-usdc-coin-cryptocurrency-cartoon-concept-vector.jpg" className="carousel-img" alt="Crypto Image 1"/>
            </div>
            <div className="carousel-item">
              <img src="https://png.pngtree.com/png-vector/20221023/ourlarge/pngtree-green-arrow-up-economy-grow-chart-design-png-image_6385481.png" className="carousel-img" alt="Crypto Image 2"/>
            </div>
            <div className="carousel-item">
              <img src="https://png.pngtree.com/png-vector/20220611/ourlarge/pngtree-chatbot-icon-chat-bot-robot-png-image_4841963.png" className="carousel-img" alt="Crypto Image 3"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
      
      {/* <div className="results">
        <div className="container max-lg text-center">
            <h1>helo</h1>
          {cryptoData.map(price => (
            <div className="col-4" key={price.id}>
              <div className="card">
                <h1>{price.name}</h1>
                <span><b>Symbol:</b> {price.symbol}</span>
                <p><b>Price:</b> <span className="dollar-amount">${price.quotes.USD.price}</span></p>
                <p className="change">Change (24hr) {price.quotes.USD.percent_change_24h}%</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

    </section>
  );
};

export default TrendingSection;
