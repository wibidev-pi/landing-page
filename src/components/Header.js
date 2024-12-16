import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import "../styles/Header.css"; // Ensure your CSS is updated accordingly

const Header = () => {
  const { userRole, setUserRole } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    setUserRole(null); // Clear user role
    setDropdownOpen(false); // Close dropdown after logout
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = (e) => {
    if (!e.target.closest(".user-info")) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img
            src="../assets/l11.png"
            className="logo"
            alt="description of image"
          />
        </Link>
      </div>

      {/* Hamburger icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
      </div>

      {/* Navigation */}
      <nav>
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          {userRole === "admin" && (
            <li>
              <Link to="/addproduct">Add Products</Link>
            </li>
          )}
          {userRole !== "admin" && (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="products">Products</Link>
              </li>
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              <li>
                <Link to="/testimonials">Testimonials</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </>
          )}
          {userRole ? (
            <li className="user-info">
              <span onClick={toggleDropdown}>Logged in as {userRole}</span>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/profile" className="profile-btn">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="settings-btn">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="logout-btn">
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <li>
              <Link to="/login">Login/Signup</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
