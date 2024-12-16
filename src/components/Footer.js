import React from "react";
import "../styles/Footer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Quick Links Section */}
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
          <p>
            Phone: <a href="tel:+xxx-xxx-xxxx">+xxx xxx xxxxxx</a>
            <br />
          </p>
          <p>
            Email: <a href="mailto:sales@wibitec.com">sales@wibitec.com</a>
          </p>
          <p>Working Hours: Monday-Saturday, 8:00 AM - 6:00 PM</p>
        </div>
      </div>

      <div className="social-icons-footer">
        <a
          href="https://wa.me/your-phone-number"
          aria-label="WhatsApp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-x-twitter"></i>
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2024 Wibitec Industrial Equipment, All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
