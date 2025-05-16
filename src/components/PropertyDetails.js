import React, { useState, useEffect } from "react";
import ImageCarousel from "./ImageCarousel";
import Map from "./Map"; 
import "../styles/App.css";

function PropertyDetails({ property, onClose, onGoBack }) {
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    setActiveTab("description");
  }, [property]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateObj) => {
    if (!dateObj) return "Date Not Available";
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[dateObj.month - 1];
    const day = dateObj.day;
    const year = dateObj.year;
    return `${month} ${day}, ${year}`;
  };

  return (
    <div className="property-details">
      <button onClick={onGoBack} className="back-button">
      Back to Properties
      </button>

      <button onClick={onClose} className="close-details">
        Close
      </button>
      <ImageCarousel images={property.images} />

      <h2>{property.title}</h2>
      {/* Displaying the formatted date */}
      <p>Added on: {formatDate(property.added)}</p>
      <p>Price: £{property.price}</p>

      <div className="tabs">
        <button
          className={activeTab === "description" ? "active" : ""}
          onClick={() => handleTabClick("description")}
        >
          Description
        </button>
        <button
          className={activeTab === "floorplan" ? "active" : ""}
          onClick={() => handleTabClick("floorplan")}
        >
          Floor Plan
        </button>
        <button
          className={activeTab === "map" ? "active" : ""}
          onClick={() => handleTabClick("map")}
        >
          Map
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "description" && (
          <div>
            <p>{property.longDescription}</p>
            <ul className="property-details-list">
              <li><strong>Type:</strong> {property.type}</li>
              <li><strong>Price:</strong> £{property.price}</li>
              <li><strong>Bedrooms:</strong> {property.bedrooms}</li>
              <li>
                <strong>Location:</strong> {property.location}
              </li>
              <li>
                <strong>Postcode Area:</strong> {property.postcodeArea}
              </li>
              <li>
                {/* Display the formatted date */}
                <strong>Added on:</strong> {formatDate(property.added)}
              </li>
            </ul>
          </div>
        )}
        {activeTab === "floorplan" && (
          <img src={property.floorPlan} alt="Floor Plan" className="floorplan-image" />
        )}
        {activeTab === "map" && (
          <Map location={property.locationCoords} />
        )}
      </div>
    </div>
  );
}

export default PropertyDetails;