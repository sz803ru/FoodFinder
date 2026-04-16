import React from 'react';
import '../styles/FilterPanel.css';

/**
 * FilterPanel Component
 * Provides filtering options for search results
 */
const FilterPanel = ({
  filters,
  setFilters,
  totalResults,
  onRandomPick,
  isLoading,
}) => {
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      price: '',
      sort_by: 'best_match',
      open_now: false,
      cuisine: '',
    });
  };

  const priceOptions = [
    { value: '1', label: '💰 Budget-Friendly ($)' },
    { value: '2', label: '💰💰 Moderate ($$)' },
    { value: '3', label: '💰💰💰 Upscale ($$$)' },
    { value: '4', label: '💰💰💰💰 Fine Dining ($$$$)' },
  ];

  const sortOptions = [
    { value: 'best_match', label: '⭐ Best Match' },
    { value: 'rating', label: '⭐ Highest Rating' },
    { value: 'review_count', label: '💬 Most Reviews' },
    { value: 'distance', label: '📍 Closest' },
  ];

  const cuisineOptions = [
    'Mexican', 'Italian', 'Chinese', 'Japanese', 'Thai',
    'Indian', 'Mediterranean', 'Korean', 'Vietnamese', 'French',
  ];

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h2>🎚️ Filters & Sorting</h2>
        {totalResults > 0 && (
          <span className="result-count">{totalResults} restaurants found</span>
        )}
      </div>

      <div className="filters-grid">
        {/* Price Filter */}
        <div className="filter-group">
          <label htmlFor="price">Price Range</label>
          <select
            id="price"
            value={filters.price}
            onChange={(e) => handleFilterChange('price', e.target.value)}
            disabled={isLoading}
          >
            <option value="">All Prices</option>
            {priceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div className="filter-group">
          <label htmlFor="sort">Sort By</label>
          <select
            id="sort"
            value={filters.sort_by}
            onChange={(e) => handleFilterChange('sort_by', e.target.value)}
            disabled={isLoading}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Cuisine Filter */}
        <div className="filter-group">
          <label htmlFor="cuisine">Cuisine Type</label>
          <select
            id="cuisine"
            value={filters.cuisine}
            onChange={(e) => handleFilterChange('cuisine', e.target.value)}
            disabled={isLoading}
          >
            <option value="">All Cuisines</option>
            {cuisineOptions.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>

        {/* Open Now Toggle */}
        <div className="filter-group checkbox">
          <label htmlFor="open-now">
            <input
              id="open-now"
              type="checkbox"
              checked={filters.open_now}
              onChange={(e) => handleFilterChange('open_now', e.target.checked)}
              disabled={isLoading}
            />
            <span>⏰ Open Now</span>
          </label>
        </div>
      </div>

      <div className="filter-actions">
        <button
          className="btn btn-secondary btn-small"
          onClick={handleResetFilters}
          disabled={isLoading}
        >
          🔄 Reset Filters
        </button>

        <button
          className="btn btn-primary btn-small"
          onClick={onRandomPick}
          disabled={isLoading || totalResults === 0}
        >
          🎲 Pick for Me!
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
