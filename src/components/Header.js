import React from "react";
import "../styles/Header.css"; // We will create this CSS file
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="nav-links">
        <li>
          <Link to="/">
            <img
              src="../assets/logo2.png"
              className="logo"
              alt="description of image"
            />
          </Link>
        </li>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about-us">About Us</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/why-choose-us">Why Choose Us</Link>
          </li>
          <li>
            <Link to="/testimonials">Testimonials</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
