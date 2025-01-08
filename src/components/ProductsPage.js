import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import "./../styles/ProductsPage.css";

const ProductsPage = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    Papa.parse("/subcategories.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const validData = result.data.filter((row) => row.ParentCategory);

        const uniqueCategories = [
          ...new Set(validData.map((row) => row.ParentCategory)),
        ].map((name) => ({
          name,
          description: `Explore products in ${name}`,
          image: `/images/${name.toLowerCase().replace(/ /g, "_")}.jpg`,
        }));

        setCategoriesData(uniqueCategories);
      },
      error: (error) => setError(`Error loading categories: ${error.message}`),
    });
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/subcategories/${encodeURIComponent(categoryName)}`);
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="products-page">
      <div className="categories-tiles">
        {categoriesData.map((category, index) => (
          <div
            key={index}
            className="category-tile"
            onClick={() => handleCategoryClick(category.name)}
          >
            <img
              src={category.image}
              alt={category.name}
              onError={(e) => (e.target.src = "/images/default.jpg")}
            />
            <h3>{category.name}</h3>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
