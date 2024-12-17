import React from "react";
import { useLocation } from "react-router-dom";
import "./../styles/ProductDetailPage.css";

const ProductDetailPage = () => {
  const location = useLocation();
  const product = location.state;

  if (!product) return <p>No product data available.</p>;

  return (
    <section className="product-detail-page">
      <div className="product-image-container">
        <img
          src={`/assets/images/${product.ImageName}`}
          alt={product.ProductName}
          className="product-large-image"
        />
      </div>
      <div className="product-details">
        <h1>{product.ProductName}</h1>
        <p>
          <strong>Part Number:</strong> {product.PartNumber}
        </p>
        <p>
          <strong>GTIN:</strong> {product.GTIN}
        </p>
        <button className="get-quote-button">Get a Quote</button>
      </div>
    </section>
  );
};

export default ProductDetailPage;
