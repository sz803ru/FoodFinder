import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../../Project/frontend/src/components/SearchBar';
import FilterPanel from '../../Project/frontend/src/components/FilterPanel';
import RestaurantList from '../../Project/frontend/src/components/RestaurantList';
import RandomPicker from '../../Project/frontend/src/components/RandomPicker';
import './styles/global.css';

/**
 * App Component - Main Food Finder Application
 * Manages state for search, filters, and restaurant data
 * Handles API calls through backend proxy
 */
const App = () => {
  // Search state
  const [location, setLocation] = useState('');
  const [term, setTerm] = useState('restaurants');

  // Results state
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Filter state
  const [filters, setFilters] = useState({
    price: '',
    sort_by: 'best_match',
    open_now: false,
    cuisine: '',
  });

  // Modal state
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [randomPick, setRandomPick] = useState(null);

  // API Configuration
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  /**
   * Fetch restaurants from backend API
   */
  const fetchRestaurants = async () => {
    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }

    setIsLoading(true);
    setError('');
    setRestaurants([]);
    setFilteredRestaurants([]);

    try {
      const params = {
        location: location.trim(),
        term: term.trim() || 'restaurants',
        radius: 8000, // ~5 miles
        limit: 50,
        sort_by: filters.sort_by,
      };

      // Add optional filters
      if (filters.price) {
        params.price = filters.price;
      }
      if (filters.open_now) {
        params.open_now = 'true';
      }
      if (filters.cuisine) {
        params.attributes = `cuisines_${filters.cuisine.toLowerCase()}`;
      }

      const response = await axios.get(`${API_BASE_URL}/api/search`, { params });

      if (response.data.businesses) {
        setRestaurants(response.data.businesses);
        setFilteredRestaurants(response.data.businesses);
      } else {
        setError('No restaurants found. Try adjusting your search.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to fetch restaurants. Please try again.';
      setError(errorMessage);
      console.error('Search Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Apply filters to restaurant list
   * Re-runs when filters or restaurants change
   */
  useEffect(() => {
    let filtered = [...restaurants];

    // Filter by cuisine (client-side)
    if (filters.cuisine) {
      filtered = filtered.filter((restaurant) => {
        const categories = restaurant.categories
          .map((cat) => cat.title.toLowerCase())
          .join(' ');
        return categories.includes(filters.cuisine.toLowerCase());
      });
    }

    setFilteredRestaurants(filtered);
  }, [filters, restaurants]);

  /**
   * Select a random restaurant from filtered results
   */
  const handleRandomPick = () => {
    if (filteredRestaurants.length === 0) return;

    const randomIndex = Math.floor(Math.random() * filteredRestaurants.length);
    setRandomPick(filteredRestaurants[randomIndex]);
  };

  /**
   * Close modal and reset selection
   */
  const handleCloseModal = () => {
    setSelectedRestaurant(null);
    setRandomPick(null);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1>🍽️ Food Finder</h1>
          <p>Discover amazing restaurants near you</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="container">
          {/* Search Bar */}
          <SearchBar
            location={location}
            setLocation={setLocation}
            term={term}
            setTerm={setTerm}
            onSearch={fetchRestaurants}
            isLoading={isLoading}
          />

          {/* Results Section */}
          {restaurants.length > 0 && (
            <>
              {/* Filter Panel */}
              <FilterPanel
                filters={filters}
                setFilters={setFilters}
                totalResults={filteredRestaurants.length}
                onRandomPick={handleRandomPick}
                isLoading={isLoading}
              />

              {/* Restaurant List */}
              <RestaurantList
                restaurants={filteredRestaurants}
                isLoading={isLoading}
                error={error}
                onViewDetails={setSelectedRestaurant}
              />
            </>
          )}

          {/* Loading State */}
          {isLoading && !restaurants.length && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Searching for amazing restaurants...</p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="error-message">
              <strong>⚠️ Error:</strong> {error}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && restaurants.length === 0 && location && !error && (
            <div className="empty-state" style={{ color: 'white', textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ fontSize: '48px', marginBottom: '20px' }}>🍽️</p>
              <h2>Ready to find your next favorite restaurant?</h2>
              <p>Enter a location and search term above to get started!</p>
            </div>
          )}
        </div>
      </main>

      {/* Random Picker Modal */}
      {randomPick && (
        <RandomPicker
          restaurant={randomPick}
          onClose={handleCloseModal}
          onPick={handleRandomPick}
        />
      )}

      {/* Footer */}
      <footer className="app-footer">
        <p>Powered by Yelp API | Food Finder © 2026</p>
      </footer>
    </div>
  );
};

export default App;
