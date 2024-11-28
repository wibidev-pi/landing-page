import React from "react";
import { useParams } from "react-router-dom";
import "./../styles/BrandPage.css";

const products = {
  1: [
    {
      id: 101,
      name: "Product A1",
      image: "/images/product-a1.jpg",
      description: "Description of Product A1",
    },
    {
      id: 102,
      name: "Product A2",
      image: "/images/product-a2.jpg",
      description: "Description of Product A2",
    },
  ],
  2: [
    {
      id: 201,
      name: "Product B1",
      image: "/images/product-b1.jpg",
      description: "Description of Product B1",
    },
    {
      id: 202,
      name: "Product B2",
      image: "/images/product-b2.jpg",
      description: "Description of Product B2",
    },
  ],
  3: [
    {
      id: 301,
      name: "Product C1",
      image: "/images/product-b1.jpg",
      description: "Description of Product B1",
    },
    {
      id: 302,
      name: "Product C2",
      image: "/images/product-b2.jpg",
      description: "Description of Product B2",
    },
  ],
  4: [
    {
      id: 401,
      name: "Product D1",
      image: "/images/product-b1.jpg",
      description: "Description of Product B1",
    },
    {
      id: 402,
      name: "Product D2",
      image: "/images/product-b2.jpg",
      description: "Description of Product B2",
    },
  ],
  // Add more brand-product mappings here
};

const BrandPage = () => {
  const { brandId } = useParams();
  const brandProducts = products[brandId] || [];

  return (
    <section className="brand-page">
      <h1>Products for Brand {brandId}</h1>
      <div className="products-grid">
        {brandProducts.map((product) => (
          <div key={product.id} className="product-tile">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <button className="btn btn-quote">Request a Quote</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandPage;
