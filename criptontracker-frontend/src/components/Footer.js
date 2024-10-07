import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import '../style/Footer.css'

const Footer = () => {
  const date = new Date();

  return (
    <div className="footer-basic">
      <footer>
        <div className="social">
          <a href="https://wa.me/34611283538"><FaWhatsapp  className="icon-footer"/></a>
          <a href="mailto:er70302409@gmail.com"><BiLogoGmail className="icon-footer"/></a>
          <a href="https://github.com/EIAHRJAY"><FaGithub className="icon-footer"/></a>
          <a href="https://www.linkedin.com/in/eduardoribeiro-eiahrjay/"><FaLinkedin className="icon-footer"/></a>
        </div>
        <hr style={{ height: '2px', borderWidth: 0, color: 'gray', backgroundColor: 'white' }} />
        <ul className="list-inline">
          <li className="list-inline-item"><a href="/">Home</a></li>
          <li className="list-inline-item"><a href="#services">Services</a></li>
          <li className="list-inline-item"><a href="#about">About</a></li>
        </ul>
        <p className="copyright">Eduardo Ribeiro © Crypto Vision  2024</p>
      </footer>
    </div>
  );
};

export default Footer;
