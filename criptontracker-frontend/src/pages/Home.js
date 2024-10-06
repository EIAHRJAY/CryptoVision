// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import TrendingSection from '../components/TrendingSection';
import NewsSection from '../components/NewsSection';
import TrendingSection2 from '../components/TrendingSection2';
import "../style/Img.css"

const Home = () => {
  return (
    <div>
      <Hero/>
      <section id="services">
        <TrendingSection/>
      </section>
      <section id="about">
        <TrendingSection2/>
      </section>
      <section id="NewsSection">
      <NewsSection/>
      </section>
    </div>
  );
};

export default Home;
