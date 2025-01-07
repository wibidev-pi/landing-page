import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "./../styles/ProductListPage.css"; // Ensure to create this CSS file for styling

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch both CSV files
        const [response1, response2] = await Promise.all([
          fetch("/assets/csv/FESTO.csv"),
          fetch("/assets/csv/OMRAN.csv"),
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

        // Set the combined data to the products state
        setProducts(combinedData);
      } catch (err) {
        setError(`Error loading products: ${err.message}`);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.productTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (error) return <p>{error}</p>;
  if (!products.length) return <p>Loading products...</p>;

  return (
    <div className="product-list-page">
      <h1>Product List</h1>
      <input
        type="text"
        placeholder="Search by product name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.productNumber}>
            <a href={`/products/${product.productNumber}`}>
              {product.productTitle}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListPage;
