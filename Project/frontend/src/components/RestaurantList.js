import React from 'react';
import RestaurantCard from './RestaurantCard';
import '../styles/RestaurantList.css';

/**
 * RestaurantList Component
 * Displays a grid of restaurant cards
 */
const RestaurantList = ({ restaurants, isLoading, error, onViewDetails }) => {
  if (isLoading) {
    return (
      <div className="restaurant-list loading">
        <div className="spinner"></div>
        <p>Finding amazing restaurants for you...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="restaurant-list error">
        <div className="error-message">
          <strong>⚠️ Error:</strong> {error}
        </div>
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="restaurant-list empty">
        <div className="empty-state">
          <span className="empty-icon">🍽️</span>
          <h3>No restaurants found</h3>
          <p>Try adjusting your search location or filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurant-list">
      <p className="list-title">Results</p>
      <div className="restaurant-grid">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
