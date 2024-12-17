import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { cleanPartNumber } from "./utils"; // Utility function for cleaning input
import "../styles/Header.css";

const Header = () => {
  const { userRole, setUserRole } = useContext(UserContext);
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const cleanedInput = cleanPartNumber(searchInput);
    if (cleanedInput) {
      console.log("Navigating with Cleaned Part Number:", cleanedInput);
      navigate(`/products/${cleanedInput}`);
    }
  };

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img
            src="../assets/l11.png"
            className="logo"
            alt="description of image"
          />
        </Link>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <i className="fas fa-search"></i> {/* FontAwesome Icon */}
        </button>
      </form>

      {/* Navigation */}
      <nav>
        <ul className="nav-links">
          {userRole === "admin" && (
            <li>
              <Link to="/addproduct">Add Products</Link>
            </li>
          )}
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/about-us">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          {userRole && (
            <li className="user-info">
              <span>Logged in as {userRole}</span>
              <button onClick={() => setUserRole(null)} className="logout-btn">
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
