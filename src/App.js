import React from "react";
import "./styles/App.css";
import HeroSection from "./components/HeroSection";
import AboutUsSection from "./components/AboutUsSection";
import ProductsSection from "./components/ProductsSection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactUsSection from "./components/ContactUsSection";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <AboutUsSection />
      <ProductsSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <ContactUsSection />
      <Footer />
    </div>
  );
}

export default App;
