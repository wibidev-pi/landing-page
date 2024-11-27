import React from "react";
import Nav from "./components/navigation"; // Import Nav component
import Products from "./components/Products";

function App() {
  return (
    <div className="App">
      <Nav>
        <Products>
          <main style={{ padding: "1rem" }}>
            <h1>Product Gallery</h1>
          </main>
        </Products>
      </Nav>
    </div>
  );
}

export default App;
