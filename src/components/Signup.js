import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../App";
import "./../styles/Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);
  const [error, setError] = useState("");

  const { setUserRole } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 55); // Scroll to the position just below the header
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Basic validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert("All required fields must be filled.");
      return;
    }

    // Save user to localStorage
    const newUser = { ...formData };
    localStorage.setItem("user", JSON.stringify(newUser));
    alert("Account created successfully!");
    setUserRole("customer");
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          {/* Row 1: First Name and Last Name */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name *"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name *"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Row 2: Email and Phone Number */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number (Optional)"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 3: Password and Confirm Password */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password *"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setShowPasswordRequirements(true)}
                onBlur={() => setShowPasswordRequirements(false)}
                required
              />
              {showPasswordRequirements && (
                <div className="password-requirements">
                  <p>Password requirements:</p>
                  <ul>
                    <li>At least 12 characters</li>
                    <li>A lowercase letter</li>
                    <li>An uppercase letter</li>
                    <li>A number</li>
                    <li>A symbol</li>
                    <li>No parts of your username</li>
                    <li>Does not include your first or last name</li>
                  </ul>
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password *"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Error message */}
          {error && <p className="error-message">{error}</p>}

          <p className="privacy-text">
            Information on processing of your personal data can be found in our{" "}
            <Link to="/privacy-policy" className="privacy-link">
              Privacy Policy
            </Link>
          </p>
          <button type="submit" className="btn-submit">
            CREATE ACCOUNT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
