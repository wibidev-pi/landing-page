import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import "../../styles/CategoryProductsPage.css";

const CategoryProductsPage = () => {
  const { subcategoryId } = useParams(); // Get the unique_id from URL
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20; // Limit to 20 products per page
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!subcategoryId) {
      console.error("No subcategory ID specified in the URL.");
      setError("No subcategory ID provided. Unable to filter products.");
      setLoading(false);
      return;
    }

    setLoading(true); // Show loading animation during fetch

    // Load the CSV file
    Papa.parse("/products.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const allProducts = result.data || [];
        console.log("Parsed Products Data:", allProducts);

        // Filter products by the UniqueColumn
        const filtered = allProducts.filter(
          (product) =>
            product.UniqueColumn?.trim().toLowerCase() ===
            subcategoryId?.trim().toLowerCase(),
        );

        if (!filtered.length) {
          console.warn("No products found for subcategory ID:", subcategoryId);
          setError("No products found for the selected subcategory.");
        } else {
          setFilteredProducts(filtered);
        }

        setLoading(false); // Hide loading animation
      },
      error: (err) => {
        console.error("Error loading products CSV:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false); // Hide loading animation
      },
    });
  }, [subcategoryId]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h2>Loading products...</h2>
      </div>
    );
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!filteredProducts.length) {
    return <h2>No products found.</h2>;
  }

  return (
    <div className="category-products-page">
      <h1>Products</h1>
      <div className="products-grid">
        {currentProducts.map((product, index) => (
          <div key={index} className="product-tile">
            <img
              src={product.smallImagePath || "/images/default.jpg"}
              alt={product.productTitle}
              onError={(e) => (e.target.src = "/images/default.jpg")}
            />
            <h3>{product.productTitle}</h3>
            <p>Part Number: {product.productNumber}</p>
            <p>Brand: {product.brand}</p>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryProductsPage;
