import React from "react";
import ReactDOM from "react-dom/client"; // Use the 'react-dom/client' module
import App from "./App";
import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
