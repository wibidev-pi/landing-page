import React, { useState, useEffect } from "react";
import "../styles/HeroSection.css";

// Replace these with your actual image paths
const bannerImages = [
  "../assets/pic00.jpg",
  "../assets/pic01.jpg",
  "../assets/pic02.jpg",
  "../assets/pic04.jpg",
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Change the banner image every 2 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % bannerImages.length,
      );
    }, 4000); // 2 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="hero-section">
      <img
        src={bannerImages[currentImageIndex]}
        alt="Banner"
        className="hero-image"
      />
      <div className="hero-text">
        <h1>Welcome to Wibitec</h1>
        <p>Specialists in Electrical and Electronic Components</p>
      </div>
    </div>
  );
};

export default HeroSection;
