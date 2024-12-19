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
        // Fetch both CSV files
        const [response1, response2] = await Promise.all([
          fetch(`/assets/csv/FESTO.csv`),
          fetch(`/assets/csv/OMRAN.csv`),
        ]);

        // Check if both responses are successful
        if (!response1.ok || !response2.ok) {
          throw new Error("Failed to load one or both CSV files.");
        }

        // Parse both CSV files as text
        const csvData1 = await response1.text();
        const csvData2 = await response2.text();

        // Parse both CSV files using Papa.parse
        const parseCSV = (csvData) => {
          return new Promise((resolve) => {
            Papa.parse(csvData, {
              header: true,
              skipEmptyLines: true,
              complete: (results) => resolve(results.data),
            });
          });
        };

        // Parse and combine the data
        const [data1, data2] = await Promise.all([
          parseCSV(csvData1),
          parseCSV(csvData2),
        ]);
        const combinedData = [...data1, ...data2];

        console.log("Combined CSV Data:", combinedData);

        // Clean the input part number
        const cleanedInput = cleanPartNumber(partNumber);
        console.log("Cleaned Search Part Number:", cleanedInput);

        // Search for the product in the combined data
        const foundProduct = combinedData.find(
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
          <strong>Discription:</strong> {product.Discription}
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
