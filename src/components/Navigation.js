import React, { useState } from "react";
import SearchForm from "./SearchForm";
import "../styles/App.css";

function Navigation({ onSearch, showSearch }) {
  return (
    <header>
      <div className="header-container">
        <div className="logo-and-name">
          <img src="/images/others/logo.png" alt="Website Logo" className="logo" />
          <h1 className="site-name">RealtySpace</h1>
        </div>
        <div className="search-container">
          <button onClick={onSearch} className="search-toggle">
            {showSearch ? "Hide Advanced Search" : "Show Advanced Search"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navigation;