import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/brands">Our Brands</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Products Section */}
        <div className="footer-section">
          <h4>Our Products</h4>
          <ul>
            <li>Pneumatics</li>
            <li>Hydraulics</li>
            <li>Industrial Automation</li>
            <li>Conveyor belts and parts</li>
            <li>Gas Springs</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h4>Get In Touch</h4>
          <address></address>
          <p>
            Phone: <a href="tel">+xxx xxx xxxxxx</a>
          </p>
          <p>
            Email:{" "}
            <a href="mailto:sales@targetindoman.com">sales@wibitec.com</a>
          </p>
          <p>Working Hours: Monday-Saturday, 8:00 AM - 6:00 PM</p>
        </div>
      </div>

      {/* Social Media and Footer Bottom */}
      <div className="footer-bottom">
        <div className="social-icons">
          <a href="#">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
        <p>&copy; 2024 wibitec Industrial Equipments. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
