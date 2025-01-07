import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Papa from "papaparse";
import "./../styles/CategoryProductsPage.css";

const CategoryProductsPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20; // Limit to 20 products per page
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsCsv = location.state?.productsCsv;

    if (!productsCsv) {
      console.error("No products CSV specified.");
      setLoading(false);
      return;
    }

    // Load the CSV file dynamically
    Papa.parse(`/csv-files/${productsCsv}`, {
      download: true,
      header: true,
      complete: (result) => {
        console.log("Parsed Products Data:", result.data); // Debug parsed data
        setProducts(result.data);
        setLoading(false);
      },
      error: (error) => {
        console.error("Error loading products CSV:", error);
        setLoading(false);
      },
    });
  }, [location.state]);

  // Calculate pagination details
  const totalPages = Math.ceil(products.length / productsPerPage);
  const currentProducts = products.slice(
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

  if (!products.length) {
    return <h2>No products found.</h2>;
  }

  return (
    <div className="category-products-page">
      <h1>Products</h1>
      <div className="products-grid">
        {currentProducts.map((product, index) => (
          <div key={index} className="product-tile">
            <img src={product.smallImagePath} alt={product.productTitle} />
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
