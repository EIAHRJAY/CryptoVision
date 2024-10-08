import React from "react";
import { IoAnalyticsSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero">
      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1385789/cryptocurrency-cannabis-1280x800.jpg" alt="" />
      <div className="container max-lg">
        <div className="hero-text">
          <h1 className="hero-title">CRYPTO VISION <IoAnalyticsSharp style={{ fontSize: '50px' }}/></h1>
          <p className="hero-headline">Live updates on cryptocurrency</p>
          <Link to="/cryptos">
            <a className="btn-main" style={{background :"#7F7F7F"}} >Trending</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
