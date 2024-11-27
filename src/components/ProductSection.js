import React from "react";
import "../styles/ProductSection.css";

const ProductSection = () => {
  return (
    <section className="products" id="products">
      <h2>Our Products</h2>
      <div className="product-grid">
        {/* Example product items */}
        <div className="product-item">
          <img src="../assets/pic03.jpg" alt="Product 1" />
          <h3>Product 1</h3>
        </div>
        <div className="product-item">
          <img src="../assets/pic01.jpg" alt="Product 2" />
          <h3>Product 2</h3>
        </div>
        {/* Add more products here */}
      </div>
    </section>
  );
};

export default ProductSection;
