import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Papa from "papaparse";
import "../styles/Header.css";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu
  const navigate = useNavigate();

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(searchInput); // Update debounced input
    }, 300); // Adjust delay as needed

    return () => {
      clearTimeout(handler); // Clear timeout if the user types again
    };
  }, [searchInput]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedInput) {
        setSuggestions([]);
        return;
      }
      try {
        // Fetch the merged CSV file
        const response = await fetch("/products.csv");

        // Check if the fetch was successful
        if (!response.ok) {
          throw new Error("Failed to fetch the CSV file.");
        }

        // Parse the CSV file as text
        const csvData = await response.text();

        // Parse the CSV file using Papa.parse
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const combinedData = results.data || [];

            // Filter the data based on the search input
            const filteredSuggestions = combinedData.filter(
              (item) =>
                item.productTitle
                  ?.toLowerCase()
                  .includes(searchInput.toLowerCase()) ||
                item.productNumber
                  ?.toLowerCase()
                  .includes(searchInput.toLowerCase()),
            );

            // Update the suggestions state
            setSuggestions(filteredSuggestions);
          },
        });
      } catch (error) {
        console.error("Error fetching suggestions:", error.message);
      }
    };

    fetchSuggestions();
  }, [searchInput]);

  const handleSuggestionClick = (productNumber) => {
    navigate(`/products/${productNumber}`);
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
          <img src="../assets/WibiTeclogo.png" className="logo" alt="Logo" />
        </Link>
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
                onClick={() => handleSuggestionClick(item.productNumber)}
              >
                {item.productTitle} - {item.productNumber}
              </div>
            ))}
          </div>
        )}

        {/* Hamburger Menu */}
        <div
          className={`hamburger ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
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
            <Link to="/products-page" onClick={closeMenu}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={closeMenu}>
              Brands
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
