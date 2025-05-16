import React from "react";
import "../styles/App.css";

function PropertyCard({ property, onClick, onAddToFavorites, onRemoveFavorite, isFavorite }) {
  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", property.id);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleAddToFavoritesClick = (event) => {
    event.stopPropagation();
    onAddToFavorites(property.id);
  };

  const handleRemoveFromFavoritesClick = (event) => {
    event.stopPropagation();
    onRemoveFavorite(property.id);
  };

  const formatDate = (dateObj) => {
    if (dateObj && dateObj.month && dateObj.day && dateObj.year) {
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      // Ensure month is within the valid range
      const monthIndex = Math.max(0, Math.min(dateObj.month - 1, 11));
      const monthName = monthNames[monthIndex];

      return `Added on: ${monthName} ${dateObj.day}, ${dateObj.year}`;
    } else {
      return "Date not available";
    }
  };

  return (
    <div
      className={`property-card`}
      draggable={true}
      onDragStart={handleDragStart}
      onClick={() => onClick(property)}
    >
      <div className="property-card-image-container">
        <img src={property.cardImage} alt={property.title} className="property-card-image" />
      </div>
      <div className="property-card-details">
        <h3 className="property-card-title">{property.title}</h3>
        <p className="property-card-type">Type: {property.type}</p>
        <p className="property-card-price">£{property.price}</p>
        <p className="property-card-bedrooms">
          Bedrooms: {property.bedrooms}
        </p>
        <p className="property-card-postcode">Location: {property.postcodeArea}</p>
        <p className="property-card-date">{formatDate(property.added)}</p>
        <button className="add-to-favorites" onClick={isFavorite ? handleRemoveFromFavoritesClick : handleAddToFavoritesClick}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
}

export default PropertyCard;