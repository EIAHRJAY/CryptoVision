import React, { useEffect, useState } from "react";

const NewsSection = () => {
  const [articles, setArticles] = useState([]);

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const response = await fetch("https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=YOUR_API_KEY");
//         const data = await response.json();
//         setArticles(data.articles);
//       } catch (error) {
//         console.error("Error fetching news articles:", error);
//       }
//     };
//     fetchArticles();
//   }, []);

  return (
    <section className="section-spacing-md bg-bg-main max-lg" id="news">
    <div className="container d-flex justify-content-between">
        <h1 className="margin-bottom-md padding-a-xsm">Frequently Asked Questions?</h1>
    </div>
      {/* Pregunta 1 */}
      <div className="mb-3 container d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <a 
            className="btn btn-my me-2" // Añadido margen derecho para el botón
            data-bs-toggle="collapse" 
            href="#collapseExample1" 
            role="button" 
            aria-expanded="false" 
            aria-controls="collapseExample1">
              +
          </a>
          <h5>What is Crypto Vision?</h5>
        </div>
        <div className="collapse" id="collapseExample1">
          <div className="card card-body">
          Crypto Vision is a platform that allows you to track the performance of your favorite cryptocurrencies and talk to an AI specialized in the subject.
          </div>
        </div>
      </div>

      {/* Pregunta 2 */}
      <div className="mb-3 container d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <a 
            className="btn btn-my me-2" 
            data-bs-toggle="collapse" 
            href="#collapseExample2" 
            role="button" 
            aria-expanded="false" 
            aria-controls="collapseExample2">
              +
          </a>
          <h5>How does AI chat work?</h5>
        </div>
        <div className="collapse" id="collapseExample2">
          <div className="card card-body">
          Our chat enables interaction with AI for insightful conversations, providing personalized recommendations and analysis in real-time.
          </div>
        </div>
      </div>

      {/* Pregunta 3 */}
      <div className="mb-3 container d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <a 
            className="btn btn-my me-2" 
            data-bs-toggle="collapse" 
            href="#collapseExample3" 
            role="button" 
            aria-expanded="false" 
            aria-controls="collapseExample3">
              +
          </a>
          <h5>Can I add my favorite cryptocurrencies?</h5>
        </div>
        <div className="collapse" id="collapseExample3">
          <div className="card card-body">
          Yes, you can add your preferred cryptocurrencies to a personalized list to closely track their performance and updates.
          </div>
        </div>
      </div>
    
  </section>
  );
};

export default NewsSection;
