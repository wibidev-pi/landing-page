import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css"; // Ensure this file contains the styles below

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserRole } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 55); // Scroll to the position just below the header
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      setUserRole("admin");
      navigate("/");
    } else if (username === "customer" && password === "customer123") {
      setUserRole("customer");
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="checkbox-container">
            <input type="checkbox" id="keep-signed-in" />
            <label htmlFor="keep-signed-in">Keep me signed in</label>
          </div>
          <button type="submit">Login</button>
        </form>
        <Link to="/unlock" className="unlock-link">
          Unlock account?
        </Link>
        <p className="signup-text">
          Don’t have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
