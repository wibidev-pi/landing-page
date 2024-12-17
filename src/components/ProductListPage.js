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
        const response = await fetch(`/assets/csv/1.csv`);
        if (!response.ok) throw new Error("Failed to load CSV file.");

        const csvData = await response.text();
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setProducts(results.data);
          },
        });
      } catch (err) {
        setError(`Error loading products: ${err.message}`);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.ProductName.toLowerCase().includes(searchTerm.toLowerCase()),
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
          <li key={product.PartNumber}>
            <a href={`/products/${product.PartNumber}`}>
              {product.ProductName}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListPage;
