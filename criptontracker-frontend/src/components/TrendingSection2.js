import React, { useEffect, useState } from "react";
import "../style/TrendingSection.css"

const TrendingSection2 = () => {
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
      <div className="carousel-container">
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://img.freepik.com/vector-premium/cripto-concepto-purpura-escena-personas-estilo-dibujos-animados-planos_198565-3074.jpg?w=2000" className="carousel-img" alt="Crypto Image 1"/>
            </div>
            <div className="carousel-item">
              <img src="https://img.freepik.com/vector-premium/concepto-analitico-recopilacion-informacion-analisis-datos-negocios-infografia-ilustracion-dibujos-animados-hombres-mujeres-oficinistas_121223-936.jpg?w=1380" className="carousel-img" alt="Crypto Image 2"/>
            </div>
            <div className="carousel-item">
              <img src="https://www.aulafacil.com/uploads/cursos/3406/editor/rrhh009.jpg" className="carousel-img" alt="Crypto Image 3"/>
            </div>
          </div>
        </div>
      </div>
      <div className="text-container">
        <h1>ABOUT US</h1>
        <p className="margin-bottom-md">
        We are committed to helping you take a close look at the cryptocurrency market in a free and accessible way. Our platform uses artificial intelligence to answer key questions about coin performance, allowing you to make more informed decisions. In addition, we offer the possibility to add your favorite coins to a personalized list, so you always have a detailed control over their evolution. Initially conceived as a site for cryptocurrency analysis, we have grown to offer recommendations on the best places to buy your favorite coins. Our goal is to provide you with all the tools necessary to explore the world of cryptocurrencies with confidence, from price monitoring to detailed analysis, while remaining a simple and practical platform. Whether you are just starting out in the world of cryptocurrencies or are an experienced investor, at [Site Name] you will find a versatile and easy-to-use tool to keep up with the market and make data-driven decisions.
        </p>
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

export default TrendingSection2;