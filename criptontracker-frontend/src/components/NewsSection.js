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
      <h1 className="margin-bottom-md padding-a-xsm">Latest Articles</h1>
      <div className="container max-lg">
        <div className="articles">
          {articles.slice(0, 4).map((article, index) => (
            <div className="col-6" key={index}>
              <div className="article-card">
                <img src={article.urlToImage} alt={article.title} />
                <div className="article-card-body">
                  <h2>{article.title}</h2>
                  <p className="margin-bottom-md">{article.description}</p>
                  <a className="read-more-btn" href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
