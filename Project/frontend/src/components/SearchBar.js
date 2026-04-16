import React from 'react';
import '../styles/SearchBar.css';

/**
 * SearchBar Component
 * Handles location input and search term input with suggestion capabilities
 */
const SearchBar = ({ location, setLocation, term, setTerm, onSearch, isLoading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim() || term.trim()) {
      onSearch();
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude},${longitude}`);
          onSearch();
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enter it manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-inputs">
          <div className="input-group">
            <label htmlFor="location">📍 Location</label>
            <input
              id="location"
              type="text"
              placeholder="City, address, or zip code"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="term">🍽️ What are you craving?</label>
            <input
              id="term"
              type="text"
              placeholder="e.g., pizza, sushi, tacos"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="search-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-inline"></span> Searching...
              </>
            ) : (
              '🔍 Search'
            )}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleUseCurrentLocation}
            disabled={isLoading}
          >
            📍 My Location
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
