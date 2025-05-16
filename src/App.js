import React, { useState, useEffect } from "react";
import PropertyCard from "./components/PropertyCard";
import PropertyDetails from "./components/PropertyDetails";
import FavoritesList from "./components/FavoritesList";
import { fetchProperties } from "./utils/api";
import "./styles/App.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import SearchForm from "./components/SearchForm";

function App() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false); // Track if a search is active

  useEffect(() => {
    const loadProperties = async () => {
      const fetchedProperties = await fetchProperties();
      setProperties(fetchedProperties);
      setFilteredProperties(fetchedProperties);
    };

    loadProperties();

    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = (searchCriteria) => {
    const filtered = properties.filter((property) => {
      const addedDate = property.added;
      const addedYear = addedDate ? addedDate.year : null;
      const addedMonth = addedDate ? addedDate.month - 1 : null;
      const addedDay = addedDate ? addedDate.day : null;

      const fromDate =
        searchCriteria.dateAddedFrom !== ""
          ? new Date(searchCriteria.dateAddedFrom)
          : null;
      const toDate =
        searchCriteria.dateAddedTo !== ""
          ? new Date(searchCriteria.dateAddedTo)
          : null;

      return (
        (searchCriteria.type === "any" ||
          property.type === searchCriteria.type) &&
        (searchCriteria.minPrice === "" ||
          property.price >= parseInt(searchCriteria.minPrice)) &&
        (searchCriteria.maxPrice === "" ||
          property.price <= parseInt(searchCriteria.maxPrice)) &&
        (searchCriteria.minBedrooms === "" ||
          property.bedrooms >= parseInt(searchCriteria.minBedrooms)) &&
        (searchCriteria.maxBedrooms === "" ||
          property.bedrooms <= parseInt(searchCriteria.maxBedrooms)) &&
        (searchCriteria.postcodeArea === "" ||
          property.postcodeArea.toLowerCase().startsWith(searchCriteria.postcodeArea.toLowerCase())) &&
        // Filter by date range only if year, month, and day are available
        (addedYear === null ||
          addedMonth === null ||
          addedDay === null ||
          (searchCriteria.dateAddedFrom === "" && searchCriteria.dateAddedTo === "") || // Include if both date fields are empty
          ((searchCriteria.dateAddedFrom !== "" &&
            new Date(addedYear, addedMonth, addedDay) >= fromDate) &&
            (searchCriteria.dateAddedTo === "" ||
              new Date(addedYear, addedMonth, addedDay) <= toDate)))
      );
    });

    setFilteredProperties(filtered);
    // Set isSearchActive to true only if there are actual search criteria
    setIsSearchActive(
      searchCriteria.type !== "any" ||
      searchCriteria.minPrice !== "" ||
      searchCriteria.maxPrice !== "" ||
      searchCriteria.minBedrooms !== "" ||
      searchCriteria.maxBedrooms !== "" ||
      searchCriteria.postcodeArea !== "" ||
      searchCriteria.dateAddedFrom !== "" ||
      searchCriteria.dateAddedTo !== ""
    );
  };

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
  };

  const handleClosePropertyDetails = () => {
    setSelectedProperty(null);
  };

  const handleAddToFavorites = (propertyId) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.includes(propertyId);
      if (!isFavorite) {
        return [...prevFavorites, propertyId];
      }
      return prevFavorites;
    });
  };

  const handleClearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  const handleRemoveFavorite = (propertyId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter((id) => id !== propertyId);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const propertyId = event.dataTransfer.getData("text/plain");
    const favoritesList = document.querySelector(".favorites-list-container");
    const rect = favoritesList.getBoundingClientRect();
    const isInsideFavorites =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (isInsideFavorites) {
      // Add to favorites if dropped inside the favorites list
      if (!favorites.includes(propertyId)) {
        handleAddToFavorites(propertyId);
      }
    } else {
      // Remove from favorites if dropped outside
      handleRemoveFavorite(propertyId);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleGoBack = () => {
    setSelectedProperty(null); // This will take the user back to the main list
  };

  const handleClearSearch = () => {
    setFilteredProperties(properties); // Reset to all properties
    setIsSearchActive(false); // Indicate that search is no longer active
    setShowSearch(false); // Hide the search form
  };

  return (
    <div
      className="app-container"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Navigation onSearch={toggleSearch} showSearch={showSearch} />
      <div className="content">
        <aside className="sidebar">
          <FavoritesList
            onPropertyClick={handlePropertyClick}
            favorites={favorites}
            onClearFavorites={handleClearFavorites}
            onRemoveFavorite={handleRemoveFavorite}
            onAddToFavorites={handleAddToFavorites}
          />
        </aside>
        <main style={{ flex: 1 }}>
          {showSearch && (
            <div className={`search-form-container ${showSearch ? "show" : ""}`}>
              <SearchForm onSearch={handleSearch} onClearSearch={handleClearSearch} />
            </div>
          )}

          {selectedProperty ? (
            <PropertyDetails
              property={selectedProperty}
              onClose={handleClosePropertyDetails}
              onGoBack={handleGoBack}
            />
          ) : (
            <>
              <h2 className="section-title">Available Properties</h2>
              {/* Show "Back to All Properties" button only when a search is active */}
              {isSearchActive && (
                <button onClick={handleClearSearch} className="back-to-properties-button">
                  Back to All Properties
                </button>
              )}

              <div className="property-grid">
                {/* Display filtered properties or a message if none found */}
                {filteredProperties.length > 0 ? (
                  filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onClick={handlePropertyClick}
                      onAddToFavorites={handleAddToFavorites}
                      onRemoveFavorite={handleRemoveFavorite}
                      isFavorite={favorites.includes(property.id)}
                    />
                  ))
                ) : (
                  <p>No properties found matching your criteria.</p>
                )}
              </div>
            </>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;