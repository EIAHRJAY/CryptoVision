// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import TrendingSection from '../components/TrendingSection';
import NewsSection from '../components/NewsSection';
import Footer from '../components/Footer';
import "../style/Img.css"

const Home = () => {
  return (
    <div>
      <Hero/>
      <TrendingSection/>
      <NewsSection/>
    </div>
  );
};

export default Home;
