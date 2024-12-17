import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import { cleanPartNumber } from "./utils"; // Import utility function
import "./../styles/ProductDetailPage.css";

const ProductDetailPage = () => {
  const { partNumber } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`/assets/csv/1.csv`);
        if (!response.ok) throw new Error("Failed to load CSV file.");

        const csvData = await response.text();
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log("Raw CSV Data:", results.data);

            const cleanedInput = cleanPartNumber(partNumber);
            console.log("Cleaned Search Part Number:", cleanedInput);

            const foundProduct = results.data.find(
              (item) =>
                item.PartNumber &&
                cleanPartNumber(item.PartNumber) === cleanedInput,
            );

            if (foundProduct) {
              console.log("Product Found:", foundProduct);
              setProduct(foundProduct);
            } else {
              setError(`No product found for Part Number: ${partNumber}`);
            }
          },
        });
      } catch (error) {
        console.error("Error fetching product data:", error.message);
        setError(`Error loading product details: ${error.message}`);
      }
    };

    fetchProductDetails();
  }, [partNumber]);

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading product details...</p>;

  return (
    <section className="product-detail-page">
      <div className="product-image-container">
        <img
          src={`/assets/images/${product.ImageName}`}
          alt={product.ProductName}
          className="product-large-image"
        />
      </div>
      <div className="product-details">
        <h1>{product.ProductName}</h1>
        <p>
          <strong>Part Number:</strong> {product.PartNumber}
        </p>
        <p>
          <strong>GTIN:</strong> {product.GTIN}
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
