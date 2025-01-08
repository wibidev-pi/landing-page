import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Papa from "papaparse";
import "./../styles/CategoryProductsPage.css";

const CategoryProductsPage = () => {
  const location = useLocation();
  const [setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20; // Limit to 20 products per page
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const uniqueId = location.state?.uniqueId;

    if (!uniqueId) {
      console.error("No unique ID specified.");
      setError("No unique ID provided. Unable to filter products.");
      setLoading(false);
      return;
    }

    // Load the merged CSV file
    Papa.parse("products.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const allProducts = result.data || [];
        console.log("Parsed Products Data:", allProducts); // Debug parsed data

        // Filter products by unique ID
        const filtered = allProducts.filter(
          (product) => product.uniqueId?.trim() === uniqueId?.trim(),
        );

        if (!filtered.length) {
          setError("No products found for the selected subcategory.");
        }

        setProducts(allProducts); // Optional: Keep all products in case you need global access
        setFilteredProducts(filtered);
        setLoading(false);
      },
      error: (error) => {
        console.error("Error loading merged CSV:", error);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      },
    });
  }, [location.state]);

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
    return <h2>Loading products...</h2>;
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
