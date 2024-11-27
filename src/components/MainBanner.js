import React from "react";
import "../styles/MainBanner.css";
import bannerImage from "../assets/banner-image.jpg"; // Import the image

const MainBanner = () => {
  return (
    <div
      className="main-banner"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <h1>Welcome to Wibitech</h1>
      <p>Your Trusted Supplier of Electronic Components</p>
      <button className="cta-button">Shop Now</button>
    </div>
  );
};

export default MainBanner;
