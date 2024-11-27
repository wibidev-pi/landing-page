import React from "react";
import "../styles/Header.css"; // We will create this CSS file

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Wibitech</h1> {/* Your company name */}
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#products">Products</a>
          </li>
          <li>
            <a href="#about">About Us</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
