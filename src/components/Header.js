import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Papa from "papaparse";
import "../styles/Header.css";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchInput) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch("/assets/csv/1.csv");
        const csvData = await response.text();

        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const filteredSuggestions = results.data.filter((item) =>
              item.ProductName?.toLowerCase().includes(
                searchInput.toLowerCase(),
              ),
            );

            setSuggestions(filteredSuggestions);
          },
        });
      } catch (error) {
        console.error("Error fetching suggestions:", error.message);
      }
    };

    fetchSuggestions();
  }, [searchInput]);

  const handleSuggestionClick = (partNumber) => {
    navigate(`/products/${partNumber}`);
    setSearchInput("");
    setSuggestions([]);
    setIsMenuOpen(false); // Close hamburger menu after navigation
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput) {
      navigate(`/products/${searchInput}`);
      setIsMenuOpen(false); // Close menu after search
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false); // Function to close the hamburger menu
  };

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          <img src="../assets/l11.png" className="logo" alt="Logo" />
        </Link>
      </div>

      {/* Hamburger Menu */}
      <div
        className={`hamburger ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search by product name or part number"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <i className="fas fa-search"></i>
        </button>
        {suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map((item, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(item.PartNumber)}
              >
                {item.ProductName} - {item.PartNumber}
              </div>
            ))}
          </div>
        )}
      </form>

      {/* Navigation */}
      <nav>
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={closeMenu}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/about-us" onClick={closeMenu}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
