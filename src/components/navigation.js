import React from 'react';

function Nav({ children }) {
  return (
    <div>
      {/* Header Section */}
      <header style={{ backgroundColor: '#333', color: '#fff', padding: '1rem', textAlign: 'center' }}>
        <h2>My Web Application</h2>
        <nav>
          <a href="/" style={{ color: '#fff', margin: '0 1rem' }}>Home</a>
          <a href="/about" style={{ color: '#fff', margin: '0 1rem' }}>About</a>
          <a href="/products" style={{ color: '#fff', margin: '0 1rem' }}>Products</a>
        </nav>
      </header>

      {/* Main Content Section */}
      <main style={{ minHeight: '70vh', padding: '1rem' }}>
        {children}
      </main>

      {/* Footer Section */}
      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '1rem', textAlign: 'center' }}>
        <p>© 2024 My Web Application. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Nav;
