import React, { useState, useEffect } from "react";
import "../styles/HeroSection.css";

const banner1Images = [
  "../assets/ass/pic00.jpg",
  "../assets/ass/pic01.jpg",
  "../assets/ass/pic02.jpg",
  "../assets/ass/pic04.jpg",
];

const bannerImages = [
  "../assets/products/111.jpg",
  "../assets/products/112.jpg",
  "../assets/products/113.png",
  "../assets/products/114.jpeg",
  "../assets/products/115.jpg",
];

const sectionsData = {
  "m8rf5-container": [
    {
      href: "/en-us/pxr-digital-catalog",
      id: "content-ih0dd",
      ariaLabel: "Digital Demos Find out more",
      imgSrc: "../assets/l11.png",
      imgAlt: "Digital Demos",
      title: "Digital Demos",
      text: "Experience our digital demos with immersive features and interactivity.",
      linkText: "Find out more",
    },
    {
      href: "/en-us/service-and-support/resources",
      id: "content-ih0mx",
      ariaLabel: "Resources More information",
      imgSrc: "../assets/l11.png",
      imgAlt: "Resources",
      title: "Resources",
      text: "Industry insight, product discussion and in-depth analysis written by our leading product experts.",
      linkText: "More information",
    },
    {
      href: "/en-us/charging-infrastructure/nacs-charging-cables",
      id: "content-cz27ck",
      ariaLabel:
        "NACS is coming – and we’re prepared More about NACS charging cables",
      imgSrc: "../assets/l11.png",
      imgAlt:
        "Man charges his Tesla electric car using a NACS charging cable on the wallbox",
      title: "NACS is coming – and we’re prepared",
      text: "The first NACS charging cables will be available in Q1/2025 – SAE-compliant, UL-certified, and delivering proven wibi-tec quality.",
      linkText: "More about NACS charging cables",
    },
  ],
  "yp56o-container": [
    {
      href: "/en-us/service-and-support/contact",
      id: "content-63co5",
      ariaLabel: "Contact Contact Us",
      imgSrc: "../assets/l11.png",
      imgAlt: "Contact",
      title: "Contact",
      text: "Personally or digitally: We are nearby and here for you!",
      linkText: "Contact Us",
    },
    {
      href: "/contact",
      id: "content-uesch",
      ariaLabel: "Support & Resources Support & Resources overview",
      imgSrc: "../assets/l11.png",
      imgAlt: "Support & Resources",
      title: "Support & Resources",
      text: "You will find all service and support offers for our solutions and products here. We will provide you with professional support throughout the entire lifecycle as well as in all phases of your project.",
      linkText: "Support & Resources overview",
    },
    {
      href: "/about-us",
      id: "content-zaoe7",
      ariaLabel: "The company More about our company",
      imgSrc: "../assets/l11.png",
      imgAlt:
        "The wibi-tec location in Blomberg, Germany from a bird's eye view",
      title: "The company",
      text: "Learn more about our company and the people behind it.",
      linkText: "More about our company",
    },
  ],
};
const renderTilesForSection = (tilesData) => {
  return tilesData.map((tile) => (
    <a
      key={tile.id}
      className="tile-teaser single domain"
      href={tile.href}
      id={tile.id}
      aria-label={tile.ariaLabel}
    >
      <picture>
        <source media="(min-width: 576px)" srcSet={tile.imgSrc} />
        <source media="(max-width: 576px)" srcSet={tile.imgSrc} />
        <img
          src={tile.imgSrc}
          alt={tile.imgAlt}
          style={{ objectPosition: "center" }}
          loading="lazy"
          title={tile.title}
          className="tile-image"
        />
      </picture>
      <div className="tile-title">{tile.title}</div>
      <div className="tile-text">{tile.text}</div>
      <div className="tile-link">
        <span>{tile.linkText}</span>
      </div>
    </a>
  ));
};

// Fix in HeroSectionReviews component
const HeroSectionReviews = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const reviews = [
    {
      text: "Great product range, simple to deal with and excellent delivery.",
      author: "- Trusted Customer",
    },
    {
      text: "Very well communicated and prompt service.",
      author: "- Jane Doe",
    },
    {
      text: "High-quality products with exceptional support.",
      author: "- John Smith",
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 4000); // Change review every 4 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <section className="reviews-section">
      <h3>What Our Customers Are Saying</h3>
      <div className="reviews">
        <div className="review">
          <p>{reviews[currentReviewIndex].text}</p>
          <p>{reviews[currentReviewIndex].author}</p>
        </div>
      </div>
    </section>
  );
};

const HeroSection = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Logic for rotating hero banner images
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBannerIndex(
        (prevIndex) => (prevIndex + 1) % banner1Images.length,
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className="hero-section">
      {/* Main Banner */}
      <div className="banner-section">
        <img
          src={banner1Images[currentBannerIndex]}
          alt={`Hero Banner ${currentBannerIndex + 1}`}
          className="banner-image"
        />
        <div className="banner-text">
          <h1>Engineered to Win</h1>
          <p>
            Discover top-notch solutions in Hydrolics and pneumatic components.
          </p>
        </div>
      </div>

      {/* Featured Section */}
      <div className="featured-section">
        <div className="info-box">
          <h3>Lighting Solutions</h3>
          <p>
            Upgrade your existing lights with advanced LED lighting to save
            energy and reduce costs.
          </p>
        </div>
        <div className="info-box">
          <h3>Combustion Solutions</h3>
          <p>
            Expert guidance on industrial gas burner systems, ensuring safety
            and efficiency.
          </p>
        </div>
        <div className="info-box">
          <h3>Automation Solutions</h3>
          <p>
            Transform your operations with tailored automation systems and
            tools.
          </p>
        </div>
      </div>

      {/* Product Slider */}
      <section className="product-slider">
        <h3>Featured Products</h3>
        <div className="slider-wrapper">
          <div className="slider-container">
            {/* Original images */}
            {bannerImages.map((image, index) => (
              <div className="slider-item" key={index}>
                <img src={image} alt={`Product ${index + 1}`} />
              </div>
            ))}
            {/* Duplicated images for seamless loop */}
            {bannerImages.map((image, index) => (
              <div className="slider-item" key={`dup-${index}`}>
                <img src={image} alt={`Duplicate Product ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="feature">
        <h2>Our Features</h2>
        <div className="features">
          {renderTilesForSection(sectionsData["m8rf5-container"])}
        </div>
      </section>
      <div id="main-teaser-container" className="reference-teaser">
        <div id="reference-teaser-container" className="reference-teaser">
          <div className="reference-teaser-content">
            <div className="reference-teaser-row">
              <div className="teaser">
                <div className="teaser-preheadline">
                  Technical solutions for a livable future
                </div>
                <div className="teaser-headline">
                  Empowering the All Pneumatic & Hydraulics Industry
                </div>
                <div className="teaser-description">
                  Our products and solutions are paving the way toward a
                  climate-neutral and sustainable future.
                </div>
                <a
                  href="/products"
                  className="teaser-button"
                  aria-label="Find out more now"
                >
                  Find out more now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="feature">
        <h2>Additional Information</h2>
        <div className="features">
          {renderTilesForSection(sectionsData["yp56o-container"])}
        </div>
      </section>
      {/* Customer Reviews */}
      <HeroSectionReviews />
    </div>
  );
};

export default HeroSection;
