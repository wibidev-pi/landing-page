import React from "react";
import "../styles/ProductsSection.css";

function ProductsSection() {
  return (
    <section className="products">
      <h2>Our Products & Services</h2>
      <div className="product-item">
        <h3>Product 1</h3>
        <p>High-quality industrial controls and components</p>
      </div>
      <div className="product-item">
        <h3>Product 2</h3>
        <p>Automation solutions for industries</p>
      </div>
    </section>
  );
}

export default ProductsSection;
