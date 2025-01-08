mport React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import "./../styles/ProductsPage.css";

const ProductsPage = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null); // Track expanded category
  const navigate = useNavigate();

  useEffect(() => {
    // Load categories from the CSV
    Papa.parse("/subcategories.csv", {
      download: true,
      header: true,
      complete: (result) => {
        // Log parsed data for debugging
        console.log("Parsed Data:", result.data);

        // Filter out rows with missing ParentCategory
        const validData = result.data.filter((row) => row.ParentCategory);

        // Generate unique categories with subcategories
        const uniqueCategories = [
          ...new Set(validData.map((row) => row.ParentCategory)),
        ].map((name, index) => ({
          id: index + 1,
          name,
          description: Explore products in ${name},
          image: /images/${name.toLowerCase().replace(/ /g, "_")}.jpg, // Generate image path
          subcategories: validData
            .filter((row) => row.ParentCategory === name)
            .map((row) => row.subcategoryName),
        }));

        setCategoriesData(uniqueCategories);
      },
      error: (error) => console.error("Error loading CSV:", error),
    });
  }, []);

  const toggleCategory = (id) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const handleTileClick = (categoryName) => {
    navigate(/subcategories/${encodeURIComponent(categoryName)});
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
                alt={category.name}
                onError={(e) => {
                  // Fallback to default image if the specified image is missing
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