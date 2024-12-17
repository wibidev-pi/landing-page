import React, { useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutUsSection from "./components/AboutUsSection";
import ProductsSection from "./components/ProductsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import Contact from "./components/contact";
import ContactUsSection from "./components/ContactUsSection";
import BrandPage from "./components/BrandPage";
import Footer from "./components/Footer";
import ProductDetailPage from "./components/ProductDetailPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddProducts from "./components/AddProducts";
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
            <Route path="/products" element={<ProductsSection />} />
            <Route path="//brands/:brandId" element={<BrandPage />} />
            <Route path="/testimonials" element={<TestimonialsSection />} />
            <Route path="/contact" element={<Contact />} />{" "}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addproduct" element={<AddProducts />} />
            <Route
              path="/products/:partNumber"
              element={<ProductDetailPage />}
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
