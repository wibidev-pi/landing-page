import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import HeroSection from "./components/HeroSection";
import AboutUsSection from "./components/AboutUsSection";
import ProductsSection from "./components/ProductsSection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactUsSection from "./components/ContactUsSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Contact from "./components/contact"; // Correcting this import (if Contact component exists)
import BrandPage from "./components/BrandPage";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header and Footer remain static */}
        <Header />
        {/* Main content */}
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/about-us" element={<AboutUsSection />} />
          <Route path="/products" element={<ProductsSection />} />
          <Route path="/why-choose-us" element={<WhyChooseUsSection />} />
          <Route path="/testimonials" element={<TestimonialsSection />} />
          <Route path="/contact" element={<Contact />} />{" "}
          {/* Correctly routing to Contact component */}
          <Route path="/brands/:brandId" element={<BrandPage />} />
        </Routes>
        <Footer />
        <ContactUsSection /> {/* Always visible on all routes */}
      </div>
    </Router>
  );
}

export default App;
