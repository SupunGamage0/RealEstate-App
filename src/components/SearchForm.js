import React, { useState } from "react";
import "../styles/App.css";

function SearchForm({ onSearch, onClearSearch }) {
  const [searchCriteria, setSearchCriteria] = useState({
    type: "any",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    postcodeArea: "",
    dateAddedFrom: "",
    dateAddedTo: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchCriteria);
  };

  const handleClear = () => {
    setSearchCriteria({
      type: "any",
      minPrice: "",
      maxPrice: "",
      minBedrooms: "",
      maxBedrooms: "",
      postcodeArea: "",
      dateAddedFrom: "",
      dateAddedTo: "",
    });
    onClearSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="form-group">
                <label htmlFor="type">Type:</label>
                <select name="type" id="type" onChange={handleInputChange} value={searchCriteria.type}>
                    <option value="any">Any</option>
                    <option value="house">House</option>
                    <option value="flat">Flat</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="minPrice">Min Price:</label>
                <input
                    type="number"
                    name="minPrice"
                    id="minPrice"
                    onChange={handleInputChange}
                    value={searchCriteria.minPrice}
                />
            </div>

            <div className="form-group">
                <label htmlFor="maxPrice">Max Price:</label>
                <input
                    type="number"
                    name="maxPrice"
                    id="maxPrice"
                    onChange={handleInputChange}
                    value={searchCriteria.maxPrice}
                />
            </div>

            <div className="form-group">
                <label htmlFor="minBedrooms">Min Bedrooms:</label>
                <input
                    type="number"
                    name="minBedrooms"
                    id="minBedrooms"
                    onChange={handleInputChange}
                    value={searchCriteria.minBedrooms}
                />
            </div>

            <div className="form-group">
                <label htmlFor="maxBedrooms">Max Bedrooms:</label>
                <input
                    type="number"
                    name="maxBedrooms"
                    id="maxBedrooms"
                    onChange={handleInputChange}
                    value={searchCriteria.maxBedrooms}
                />
            </div>

            <div className="form-group">
                <label htmlFor="postcodeArea">Postcode Area:</label>
                <input
                    type="text"
                    name="postcodeArea"
                    id="postcodeArea"
                    onChange={handleInputChange}
                    value={searchCriteria.postcodeArea}
                />
            </div>

      <div className="form-group">
        <label htmlFor="dateAddedFrom">Date Added From:</label>
        <input
          type="date"
          name="dateAddedFrom"
          id="dateAddedFrom"
          onChange={handleInputChange}
          value={searchCriteria.dateAddedFrom}
        />
      </div>

      <div className="form-group">
        <label htmlFor="dateAddedTo">Date Added To:</label>
        <input
          type="date"
          name="dateAddedTo"
          id="dateAddedTo"
          onChange={handleInputChange}
          value={searchCriteria.dateAddedTo}
        />
      </div>
      <button type="button" onClick={handleClear} className="clear-search-button">
        Clear
      </button>
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}

export default SearchForm;