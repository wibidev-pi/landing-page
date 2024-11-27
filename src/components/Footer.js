import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="contact-info">
        <p>Contact Us: info@wibitech.com</p>
        <p>Phone: +123 456 7890</p>
      </div>
      <div className="social-media">
        <a href="#" className="social-icon">
          FB
        </a>
        <a href="#" className="social-icon">
          TW
        </a>
        <a href="#" className="social-icon">
          IN
        </a>
      </div>
    </footer>
  );
};

export default Footer;
