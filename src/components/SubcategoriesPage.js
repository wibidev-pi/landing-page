import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Papa from "papaparse";
import "./../styles/SubcategoriesPage.css";

const SubcategoriesPage = () => {
  const { categoryName } = useParams(); // Extract ParentCategory from URL
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Papa.parse("/subcategories.csv", {
      download: true,
      header: true,
      complete: (result) => {
        console.log("Parsed CSV Data:", result.data); // Debug parsed data
        console.log("Filtering for ParentCategory:", categoryName); // Debug categoryName

        const filteredSubcategories = result.data.filter(
          (row) =>
            row.ParentCategory?.trim().toLowerCase() ===
            categoryName?.trim().toLowerCase(),
        );

        console.log("Filtered Subcategories:", filteredSubcategories); // Debug filtered rows
        setSubcategories(filteredSubcategories);
      },
      error: (error) => console.error("Error loading CSV:", error),
    });
  }, [categoryName]);

  const handleSubcategoryClick = (subcategory) => {
    navigate(`/products-page/${subcategory.subcategoryId}`, {
      state: { productsCsv: subcategory["products-list-subcategoryId.csv"] },
    });
  };

  return (
    <div className="subcategories-page">
      <h1>Subcategories in {categoryName}</h1>
      <div className="subcategories-grid">
        {subcategories.length > 0 ? (
          subcategories.map((subcategory) => (
            <div
              key={subcategory.subcategoryId}
              className="subcategory-tile"
              onClick={() => handleSubcategoryClick(subcategory)}
            >
              <img
                src={`/images/category/${subcategory.subcategoryName
                  ?.toLowerCase()
                  .replace(/ /g, "_")}.jpg`}
                alt={subcategory.subcategoryName}
              />
              <h3>{subcategory.subcategoryName}</h3>
            </div>
          ))
        ) : (
          <p>No subcategories found for {categoryName}.</p>
        )}
      </div>
    </div>
  );
};

export default SubcategoriesPage;
