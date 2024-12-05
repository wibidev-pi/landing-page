import React from "react";
import "../styles/contact.css";

function Contact() {
  return (
    <section className="contact">
      <h2>Contact</h2>
      <div className="phone-section">
        <address></address>
        <p>
          Phone: <a href="tel:+xxx-xxx-xxxx">+xxx xxx xxxxxx</a>
        </p>
        <p>
          Email: <a href="mailto:sales@wibitec.com">sales@wibitec.com</a>
        </p>
        <p>Working Hours: Monday-Saturday, 8:00 AM - 6:00 PM</p>
      </div>

      {/* Social Media and Footer Bottom */}
      <div className="footer-bottom">
        <div className="social-icons">
          <a href="#" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i> {/* Facebook Icon */}
          </a>
          <a href="#" aria-label="Twitter (X)">
            <i className="fab fa-x-twitter"></i> {/* Twitter (X) Icon */}
          </a>
          <a href="#" aria-label="Instagram">
            <i className="fab fa-instagram"></i> {/* Instagram Icon */}
          </a>
          <a
            href="https://wa.me/your-phone-number"
            aria-label="WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-whatsapp"></i> {/* WhatsApp Icon */}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
