import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ProductsPage.css";

// Import the JSON data directly
import categoriesDataJson from "./subcategory.json"; // Adjust the path as needed

const ProductsPage = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null); // Track expanded category
  const navigate = useNavigate();

  useEffect(() => {
    // Load the categories data from the JSON file
    setCategoriesData(categoriesDataJson);
  }, []);

  const toggleCategory = (id) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const handleTileClick = (categoryName) => {
    console.log(
      "Navigating to:",
      `/subcategories/${encodeURIComponent(categoryName)}`,
    );
    navigate(`/subcategories/${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="products-page">
      <div className="sidebar">
        <h3>Categories</h3>
        <ul>
          {categoriesData.map((category) => (
            <li key={category.id}>
              <button onClick={() => toggleCategory(category.id)}>
                {category.name}
              </button>
              {expandedCategory === category.id && (
                <ul className="subcategory-list">
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory.id}>{subcategory.subcategory_name}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="content">
        <h1>Our Products</h1>
        <div className="categories-tiles">
          {categoriesData.map((category) => (
            <div
              key={category.id}
              className="category-tile"
              onClick={() => handleTileClick(category.name)}
            >
              <img
                src={category.image}
                alt={`Image of ${category.name}`}
                onError={(e) => {
                  console.error("Image not found, falling back:", e.target.src);
                  e.target.src = "/images/default.jpg";
                }}
              />
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
