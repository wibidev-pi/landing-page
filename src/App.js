import React from "react";
import Header from "./components/Header";
import MainBanner from "./components/MainBanner";
import ProductSection from "./components/ProductSection";
import Footer from "./components/Footer";
import "./styles/App.css";

const App = () => {
  return (
    <div>
      <Header />
      <MainBanner />
      <ProductSection />
      <Footer />
    </div>
  );
};

export default App;
