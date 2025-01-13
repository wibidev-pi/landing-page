import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Papa from "papaparse";
import "../../styles/BrandPage.css";

const BrandPage = () => {
  const { brandId } = useParams();
  const [products, setProducts] = useState([]);
  const [groupedproductTitles, setGroupedproductTitles] = useState([]);
  const [selectedproductTitle, setSelectedproductTitle] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const csvFilePath = `/products.csv`; // Use the merged CSV file
        const response = await fetch(csvFilePath);
        if (!response.ok) throw new Error("Failed to load CSV file.");

        const csvData = await response.text();
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const allProducts = results.data || [];

            // Filter products based on the `brand` column matching the `brandId`
            const brandProducts = allProducts.filter(
              (product) => product.brand === brandId,
            );

            const productTitles = [
              ...new Set(brandProducts.map((product) => product.productTitle)),
            ];

            setProducts(brandProducts);
            setGroupedproductTitles(productTitles);
            setLoading(false);

            if (productTitles.length > 0) {
              setSelectedproductTitle(productTitles[0]);
              const filtered = brandProducts.filter(
                (product) => product.productTitle === productTitles[0],
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

  const handleproductTitleClick = (productTitle) => {
    setSelectedproductTitle(productTitle);
    const filtered = products.filter(
      (product) => product.productTitle === productTitle,
    );
    setFilteredProducts(filtered);
  };

  const handleProductClick = (product) => {
    navigate(`/products/${product.productNumber}`, { state: product });
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
            {groupedproductTitles.map((name, index) => (
              <li
                key={index}
                className={`product-name-item ${
                  selectedproductTitle === name ? "selected" : ""
                }`}
                onClick={() => handleproductTitleClick(name)}
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
                  src={`${product.mediumImagePath}`}
                  alt={product.productTitle}
                  className="list-image"
                />
                <div className="product-info">
                  <h3>{product.productTitle}</h3>
                  <p>Part Number: {product.productNumber}</p>
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
