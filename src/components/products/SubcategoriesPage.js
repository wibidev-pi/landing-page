import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import categoriesData from "./subcategory.json"; // Import JSON data
import "../../styles/SubcategoriesPage.css";

const SubcategoriesPage = () => {
  const { categoryName } = useParams(); // Extract category name from the URL
  const [subcategories, setSubcategories] = useState([]); // Subcategories state
  const navigate = useNavigate();

  useEffect(() => {
    // Find the category by name in the JSON data
    const category = categoriesData.find(
      (cat) => cat.name.toLowerCase() === categoryName.toLowerCase(),
    );

    // Set subcategories if the category is found
    if (category) {
      setSubcategories(category.subcategories);
    } else {
      console.error(`Category "${categoryName}" not found.`);
    }
  }, [categoryName]);

  const handleSubcategoryClick = (subcategory) => {
    console.log("Navigating to subcategory:", subcategory);
    navigate(`/products-page/${subcategory.unique_id}`, {
      state: { subcategoryName: subcategory.subcategory_name },
    });
  };

  return (
    <div className="subcategories-page">
      <h1>Subcategories in {categoryName}</h1>
      <div className="subcategories-grid">
        {subcategories.length > 0 ? (
          subcategories.map((subcategory) => (
            <div
              key={subcategory.id}
              className="subcategory-tile"
              onClick={() => handleSubcategoryClick(subcategory)}
            >
              <img
                src={subcategory.image}
                alt={`Image of ${subcategory.subcategory_name}`}
                onError={(e) => {
                  console.error(
                    `Image not found for ${subcategory.subcategory_name}, using fallback.`,
                  );
                  e.target.src = "../assets/img.png"; // Fallback image
                }}
              />
              <h3>{subcategory.subcategory_name}</h3>
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
