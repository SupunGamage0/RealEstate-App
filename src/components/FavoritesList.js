import React, { useState, useEffect } from "react";
import { fetchProperties } from "../utils/api";
import "../styles/App.css";

function FavoritesList({
  onPropertyClick,
  onRemoveFavorite,
  onAddToFavorites,
  onClearFavorites,
  favorites,
}) {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const loadProperties = async () => {
      const fetchedProperties = await fetchProperties();
      setProperties(fetchedProperties);
    };
    loadProperties();
  }, []);

  const handleClearFavorites = () => {
    onClearFavorites();
  };

  const getPropertyById = (id) => {
    return properties.find((p) => p.id === id);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const propertyId = event.dataTransfer.getData("text/plain");
    onAddToFavorites(propertyId);
  };

  return (
    <div
      className="favorites-list-container"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h3 className="favorites-list-title">Favorites</h3>
      {favorites.length === 0 ? (
        <p className="favorites-list-message">
          Drag a property here to add it to your favorites, or click the "Add to Favorites" button on a property.
        </p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((propertyId) => {
            const property = getPropertyById(propertyId);
            return (
              property && (
                <li
                  key={property.id}
                  className="favorites-list-item"
                  draggable
                  onDragStart={(event) => {
                    event.dataTransfer.setData("text/plain", propertyId);
                  }}
                >
                  <div
                    onClick={() => onPropertyClick(property)}
                    className="favorites-item-link"
                  >
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="favorites-item-image"
                    />
                    <div className="favorites-item-details">
                      <span className="favorites-item-title">
                        {property.title}
                      </span>
                      <span className="favorites-item-price">
                        £{property.price}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFavorite(propertyId);
                    }}
                    className="favorites-item-remove"
                  >
                    Remove
                  </button>
                </li>
              )
            );
          })}
        </ul>
      )}
      {/* Call handleClearFavorites directly */}
      {favorites.length > 0 && (
        <button onClick={handleClearFavorites} className="favorites-list-clear">
          Clear Favorites
        </button>
      )}
    </div>
  );
}

export default FavoritesList;