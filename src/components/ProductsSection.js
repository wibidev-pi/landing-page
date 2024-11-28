import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/ProductsSection.css";
import brandsData from "./products.json"; // Path to the JSON file

const ProductsSection = () => {
  const navigate = useNavigate();

  const handleBrandClick = (brandId) => {
    navigate(`/brands/${brandId}`); // Navigate to the Brand page
  };

  return (
    <section className="products-section">
      <h1>Our Brands</h1>
      <div className="brands-grid">
        {brandsData.map((brand) => (
          <div
            key={brand.id}
            className="brand-tile"
            onClick={() => handleBrandClick(brand.id)}
          >
            <img src={brand.image} alt={brand.name} />
            <div className="brands-name">
              <h3>{brand.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
