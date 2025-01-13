import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Papa from "papaparse";
import Fuse from "fuse.js";
import { debounce } from "lodash";
import "../../styles/Header.css";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(""); // For debounced search input
  const [suggestions, setSuggestions] = useState([]);
  const [fuse, setFuse] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch and parse the CSV file
  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch("/products.csv");
        if (!response.ok) throw new Error("Failed to fetch CSV file.");

        const csvData = await response.text();
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const combinedData = results.data || [];
            console.log("Loaded Data Example:", combinedData[0]); // Debug a single row

            // Initialize Fuse.js
            const options = {
              keys: ["productTitle", "productNumber"], // Use exact keys from CSV
              includeScore: true,
              threshold: 0.5, // Adjust as needed
            };
            setFuse(new Fuse(combinedData, options));
          },
        });
      } catch (error) {
        console.error("Error loading data:", error.message);
      }
    };

    fetchCSV();
  }, []);

  // Debounce the search input to improve performance
  useEffect(() => {
    const debouncedSearch = debounce((query) => setDebouncedQuery(query), 300);
    debouncedSearch(searchInput);

    return () => {
      debouncedSearch.cancel(); // Clean up debounce timer
    };
  }, [searchInput]);

  // Perform the search when the debounced query changes
  useEffect(() => {
    if (!fuse || !debouncedQuery) {
      setSuggestions([]);
      return;
    }

    const results = fuse.search(debouncedQuery).slice(0, 10); // Limit to top 10 results
    const matchedItems = results.map((result) => result.item); // Extract matched items
    setSuggestions(matchedItems);
  }, [fuse, debouncedQuery]);

  const handleSuggestionClick = (productNumber) => {
    navigate(`/products/${productNumber}`);
    setSearchInput("");
    setSuggestions([]);
    setIsMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput) {
      navigate(`/products/${searchInput}`);
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          <img src="../assets/WibiTeclogo.png" className="logo" alt="Logo" />
        </Link>
      </div>
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
