import React, { useState, useRef } from "react";
import "../styles/AddProducts.css";

function AddProducts() {
  const [productTitle, setproductTitle] = useState("");
  const [price, setPrice] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [categories] = useState([
    { categoryId: "1", categoryName: "Electronics" },
    { categoryId: "2", categoryName: "Clothing" },
    { categoryId: "3", categoryName: "Furniture" },
  ]); // Mock categories
  const [products, setProducts] = useState([]); // To store submitted products locally
  const errorRef = useRef();

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Validation
    if (
      !productTitle ||
      !price ||
      !availableQuantity ||
      !description ||
      !categoryId
    ) {
      errorRef.current.innerHTML = "<span>* Please Fill All Fields</span>";
      return;
    }

    // Add product to local state
    const newProduct = {
      productTitle,
      price,
      availableQuantity,
      description,
      categoryId,
      file: selectedFile ? selectedFile.name : "No file selected",
    };

    setProducts((prevProducts) => [...prevProducts, newProduct]);

    // Reset form
    setproductTitle("");
    setPrice("");
    setAvailableQuantity("");
    setDescription("");
    setCategoryId("");
    setSelectedFile(null);
    errorRef.current.innerHTML = ""; // Clear error
    alert("Product added successfully!");
  };

  return (
    <div>
      <div className="container">
        <div className="card p-4 m-5">
          <div className="text-center h4">Add New Product</div>
          <form onSubmit={submitHandler}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3 mt-3">
                  <label htmlFor="categoryName" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-control"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="">Choose Category</option>
                    {categories.map((category) => (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3 mt-3">
                  <label htmlFor="productTitle" className="form-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Product Name"
                    value={productTitle}
                    onChange={(e) => setproductTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3 mt-3">
                  <label htmlFor="availableQuantity" className="form-label">
                    Available Quantity
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Available Quantity"
                    value={availableQuantity}
                    onChange={(e) => setAvailableQuantity(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3 mt-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3 mt-3">
                  <label htmlFor="pictureName" className="form-label">
                    Product Pic
                  </label>
                  <input
                    type="file"
                    onChange={fileSelectedHandler}
                    className="form-control"
                  />
                </div>
                <div className="mb-3 mt-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Add Product
              </button>
            </div>
          </form>
          <div ref={errorRef} className="text-danger m-5 text-end"></div>
        </div>

        {/* Display Submitted Products */}
        <div className="card p-4 m-5">
          <h4 className="text-center">Submitted Products</h4>
          {products.length === 0 ? (
            <p className="text-center">No products added yet.</p>
          ) : (
            <ul className="list-group">
              {products.map((product, index) => (
                <li key={index} className="list-group-item">
                  <strong>{product.productTitle}</strong> -{" "}
                  {product.description} | Price: {product.price} | Quantity:{" "}
                  {product.availableQuantity} | Category: {product.categoryId} |
                  File: {product.file}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddProducts;
