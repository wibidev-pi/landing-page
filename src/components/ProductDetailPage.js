import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import { cleanproductNumber } from "./utils"; // Import utility function
import "./../styles/ProductDetailPage.css";

const ProductDetailPage = () => {
  const { productNumber } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch the merged CSV file
        const response = await fetch(`/products.csv`);
        if (!response.ok) {
          throw new Error("Failed to load CSV file.");
        }

        // Parse the CSV file as text
        const csvData = await response.text();

        // Parse the CSV using Papa.parse
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const combinedData = results.data || [];

            // Index the data by productNumber for faster lookup
            const productIndex = combinedData.reduce((acc, item) => {
              if (item.productNumber) {
                acc[cleanproductNumber(item.productNumber)] = item;
              }
              return acc;
            }, {});

            // Clean the input part number
            const cleanedInput = cleanproductNumber(productNumber);
            console.log("Cleaned Input Part Number:", cleanedInput);

            // Find the product by cleaned part number
            const foundProduct = productIndex[cleanedInput];

            if (foundProduct) {
              console.log("Product Found:", foundProduct);
              setProduct(foundProduct);
            } else {
              console.warn("No matching product found for:", cleanedInput);
              setError(`No product found for Part Number: ${productNumber}`);
            }
            setLoading(false);
          },
        });
      } catch (error) {
        console.error("Error fetching product data:", error.message);
        setError(`Error loading product details: ${error.message}`);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productNumber]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No product found for Part Number: {productNumber}</p>;

  return (
    <section className="product-detail-page">
      <div className="product-image-container">
        <img
          src={`${product.mediumImagePath}`}
          alt={product.productTitle}
          className="product-large-image"
        />
      </div>
      <div className="product-details">
        <h1>{product.productTitle}</h1>
        <p>
          <strong>Part Number:</strong> {product.productNumber}
        </p>
        <p>
          <strong>Description:</strong> {product.urlSegment}
        </p>
        <button
          className="get-quote-button"
          onClick={() => (window.location.href = "https://wa.me/+971504289825")}
        >
          Get a Quote
        </button>
      </div>
    </section>
  );
};

export default ProductDetailPage;
