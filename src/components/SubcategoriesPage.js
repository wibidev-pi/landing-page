import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./../styles/SubcategoriesPage.css";

const SubcategoriesPage = () => {
  const { categoryName } = useParams(); // Extract category name from the URL
  const location = useLocation(); // Retrieve state data passed from ProductsPage
  const navigate = useNavigate();

  // Retrieve subcategories from location state or fallback to an empty array
  const { subcategories } = location.state || { subcategories: [] };

  console.log("Category Name:", categoryName);
  console.log("Subcategories Data:", subcategories);

  // Handle subcategory click to navigate to the products page
  const handleSubcategoryClick = (subcategory) => {
    console.log("Navigating to subcategory:", subcategory);
    navigate(`/products-page/${subcategory.subcategoryId}`, {
      state: { subcategoryName: subcategory.subcategoryName },
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
              {/* Dynamically construct the image source based on subcategory name */}
              <img
                src={`/images/${subcategory.subcategoryName
                  ?.toLowerCase()
                  .replace(/ /g, "_")}.jpg`}
                alt={`Image of ${subcategory.subcategoryName}`}
                onError={(e) => {
                  console.error(
                    `Image not found for ${subcategory.subcategoryName}, using fallback.`,
                  );
                  e.target.src = "/images/default.jpg"; // Fallback image
                }}
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
