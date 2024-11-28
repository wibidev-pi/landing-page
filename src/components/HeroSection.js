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
    <section className="hero-section">
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
      <div className="container">
        <div className="hero-content">
          <h1>Welcome to Our Amazing Platform</h1>
          <p>
            Discover our products and services that make life easier and better.
            We prioritize quality and innovation to exceed your expectations.
          </p>
          <div className="hero-buttons">
            <a href="/products" className="btn btn-primary">
              View Products
            </a>
          </div>
        </div>
        <div className="hero-image">
          {/* Replace this with the relevant image in your `images` folder */}
          <img src={bannerImages[currentImageIndex]} alt="Hero" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
