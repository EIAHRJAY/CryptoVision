import React, { useEffect, useState } from "react";

const TrendingSection = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch("https://api.coinmarketcap.com/v2/ticker/?start=0&limit=12");
        const data = await response.json();
        setCryptoData(Object.values(data.data));
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };
    fetchCryptoData();
  }, []);

  return (
    <section className="section-bg-light-grey section-spacing-md">
      <div className="container max-lg padding-a-xsm">
        <h1>Here's what trending right now</h1>
        <p className="margin-bottom-md">This is just some placeholder text</p>
      </div>
      <div className="results">
        <div className="container max-lg text-center">
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
      </div>
    </section>
  );
};

export default TrendingSection;
