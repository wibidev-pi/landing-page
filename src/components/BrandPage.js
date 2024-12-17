import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Papa from "papaparse";
import "./../styles/BrandPage.css";

const BrandPage = () => {
  const { brandId } = useParams();
  const [products, setProducts] = useState([]);
  const [groupedProductNames, setGroupedProductNames] = useState([]);
  const [selectedProductName, setSelectedProductName] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const csvFilePath = `/assets/csv/${brandId}.csv`;
        const response = await fetch(csvFilePath);
        if (!response.ok) throw new Error("Failed to load CSV file.");

        const csvData = await response.text();
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const allProducts = results.data || [];

            const productNames = [
              ...new Set(allProducts.map((product) => product.ProductName)),
            ];

            setProducts(allProducts);
            setGroupedProductNames(productNames);
            setLoading(false);

            if (productNames.length > 0) {
              setSelectedProductName(productNames[0]);
              const filtered = allProducts.filter(
                (product) => product.ProductName === productNames[0],
              );
              setFilteredProducts(filtered);
            }
          },
        });
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCSV();
  }, [brandId]);

  const handleProductNameClick = (productName) => {
    setSelectedProductName(productName);
    const filtered = products.filter(
      (product) => product.ProductName === productName,
    );
    setFilteredProducts(filtered);
  };

  const handleProductClick = (product) => {
    navigate(`/products/${product.PartNumber}`, { state: product });
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="brand-page">
      <div className="brand-content">
        {/* Left Sidebar */}
        <aside className="product-names-sidebar">
          <h3>Product Names</h3>
          <ul>
            {groupedProductNames.map((name, index) => (
              <li
                key={index}
                className={`product-name-item ${
                  selectedProductName === name ? "selected" : ""
                }`}
                onClick={() => handleProductNameClick(name)}
              >
                {name}
              </li>
            ))}
          </ul>
        </aside>

        {/* Right Product List */}
        <div className="products-list-container">
          <ul className="products-list">
            {filteredProducts.map((product, index) => (
              <li
                key={index}
                className="product-list-item"
                onClick={() => handleProductClick(product)}
              >
                <img
                  src={`/assets/images/${product.ImageName}`}
                  alt={product.ProductName}
                  className="list-image"
                />
                <div className="product-info">
                  <h3>{product.ProductName}</h3>
                  <p>Part Number: {product.PartNumber}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BrandPage;
