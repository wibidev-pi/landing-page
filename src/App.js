import React, { useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Header from "./components/landing/Header";
import HeroSection from "./components/landing/HeroSection";
import AboutUsSection from "./components/landing/AboutUsSection";
import ProductsSection from "./components/brands/ProductsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import Contact from "./components/landing/contact";
import ContactUsSection from "./components/landing/ContactUsSection";
import BrandPage from "./components/brands/BrandPage";
import Footer from "./components/landing/Footer";
import ProductDetailPage from "./components/brands/ProductDetailPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddProducts from "./components/AddProducts";
import ProductsPage from "./components/products/ProductsPage";
import SubcategoriesPage from "./components/products/SubcategoriesPage";
import CategoryProductsPage from "./components/products/CategoryProductsPage";
import "./styles/App.css";

const UserContext = createContext();

function App() {
  const [userRole, setUserRole] = useState(null);

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                userRole === "admin" ? (
                  <Navigate to="/products" />
                ) : (
                  <HeroSection />
                )
              }
            />
            <Route path="/about-us" element={<AboutUsSection />} />
            <Route path="/products-page" element={<ProductsPage />} />
            <Route path="/products" element={<ProductsSection />} />
            <Route path="//brands/:brandId" element={<BrandPage />} />
            <Route path="/testimonials" element={<TestimonialsSection />} />
            <Route path="/contact" element={<Contact />} />{" "}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addproduct" element={<AddProducts />} />
            <Route
              path="/products/:productNumber"
              element={<ProductDetailPage />}
            />
            <Route
              path="/subcategories/:categoryName"
              element={<SubcategoriesPage />}
            />
            <Route
              path="/products-page/:subcategoryId"
              element={<CategoryProductsPage />}
            />
          </Routes>
          {userRole !== "admin" &&
            window.location.pathname !== "/login" &&
            window.location.pathname !== "/signup" && <Footer />}
        </div>
        <ContactUsSection />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
export { UserContext };
