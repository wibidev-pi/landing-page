import React, { useState, useEffect } from "react";
import "../styles/HeroSection.css";

// Replace these with your actual image paths
const banner1Images = [
  "../assets/pic00.jpg",
  "../assets/pic01.jpg",
  "../assets/pic02.jpg",
  "../assets/pic04.jpg",
];

const bannerImages = [
  "../assets/111.jpg",
  "../assets/112.jpg",
  "../assets/113.png",
  "../assets/114.jpeg",
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Change the banner image every 4 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % bannerImages.length,
      );
    }, 4000); // 4 seconds

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);

  return (
    <section className="hero-section">
      {/* Top Banner */}
      <div className="banner-section">
        <img
          src={banner1Images[currentImageIndex]}
          alt="Top Banner"
          className="banner-image"
        />
        <div className="banner-text">
          <h1>Welcome to Wibitec</h1>
          <p>Specialists in Electrical and Electronic Components</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        <div className="text-content">
          <h1>Welcome to Our Amazing Platform</h1>
          <p>
            Discover our products and services that make life easier and better.
            We prioritize quality and innovation to exceed your expectations.
          </p>
          <a href="/products" className="btn btn-primary">
            View Products
          </a>
        </div>
        <div className="image-slider">
          <img
            src={bannerImages[currentImageIndex]}
            alt="Rotating Image"
            className="rotating-image"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
