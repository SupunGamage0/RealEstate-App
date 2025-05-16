import React from "react";
import "../styles/App.css";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@realtyspace.com</p>
          <p>Phone: +1-555-123-4567</p>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} RealtySpace. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;