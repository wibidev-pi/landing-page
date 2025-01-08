import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import "./../styles/ProductsPage.css";

const ProductsPage = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null); // Track expanded category
  const navigate = useNavigate();

  useEffect(() => {
    // Parse the subcategories.csv to extract parent categories and subcategories
    Papa.parse("/subcategories.csv", {
      download: true,
      header: true,
      skipEmptyLines: true, // Skip empty lines in the CSV file
      complete: (result) => {
        console.log("Raw CSV Parse Result:", result);

        // Check for parsing errors or missing data
        if (!result.data) {
          console.error("No data found in CSV.");
          return;
        }
        if (result.errors.length > 0) {
          console.error("Errors during CSV parsing:", result.errors);
          return;
        }

        // Filter rows with missing ParentCategory or subcategoryName
        const validData = result.data.filter(
          (row) => row.ParentCategory && row.subcategoryName,
        );

        if (validData.length === 0) {
          console.error("No valid rows found in the CSV.");
          return;
        }

        // Generate unique categories with subcategories
        const uniqueCategories = [
          ...new Set(validData.map((row) => row.ParentCategory)),
        ].map((name, index) => ({
          id: index + 1,
          name,
          description: `Explore products in ${name}`,
          image: `/images/${name.toLowerCase().replace(/ /g, "_")}.jpg`,
          subcategories: validData
            .filter((row) => row.ParentCategory === name)
            .map((row) => row.subcategoryName || "Unnamed Subcategory"),
        }));

        console.log("Final Categories Data:", uniqueCategories);
        setCategoriesData(uniqueCategories);
      },
      error: (error) => {
        console.error("Error loading CSV:", error);
      },
    });
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
                  {category.subcategories.map((subcategory, index) => (
                    <li key={index}>{subcategory}</li>
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
