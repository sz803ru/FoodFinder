import React from 'react';
import '../styles/RandomPicker.css';

/**
 * RandomPicker Component
 * Modal to display a randomly selected restaurant
 */
const RandomPicker = ({ restaurant, onClose, onPick }) => {
  if (!restaurant) return null;

  const {
    name,
    image_url,
    rating,
    review_count,
    price,
    categories,
    location,
    phone,
    distance,
    url,
  } = restaurant;

  const formatDistance = (meters) => {
    if (!meters) return 'N/A';
    return (meters / 1609.34).toFixed(1);
  };

  const getCategoryString = () => {
    return categories?.map((cat) => cat.title).join(', ') || 'Restaurants';
  };

  return (
    <div className="random-picker-overlay" onClick={onClose}>
      <div className="random-picker-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {/* Image */}
        <div className="picker-image-wrapper">
          {image_url ? (
            <img
              src={image_url}
              alt={name}
              className="picker-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x300?text=No+Image';
              }}
            />
          ) : (
            <div className="picker-image placeholder">No Image</div>
          )}
          <div className="picker-badge">🎲 Lucky Pick!</div>
        </div>

        {/* Content */}
        <div className="picker-content">
          <h2 className="picker-title">{name}</h2>

          {/* Rating */}
          <div className="picker-rating">
            <div className="stars">
              {'⭐'.repeat(Math.round(rating))}
              <span className="rating-value">{rating.toFixed(1)}</span>
            </div>
            <span className="review-count">({review_count} reviews)</span>
          </div>

          {/* Details Grid */}
          <div className="picker-details">
            {price && <div className="detail-item">
              <span className="detail-label">Price</span>
              <span className="detail-value">{price}</span>
            </div>}

            {distance && <div className="detail-item">
              <span className="detail-label">Distance</span>
              <span className="detail-value">{formatDistance(distance)} mi</span>
            </div>}

            <div className="detail-item">
              <span className="detail-label">Cuisine</span>
              <span className="detail-value">{getCategoryString()}</span>
            </div>
          </div>

          {/* Location & Phone */}
          {location && (
            <p className="picker-location">
              📍 {location.address1}
              {location.city && `, ${location.city}`}
            </p>
          )}

          {phone && (
            <p className="picker-phone">
              📞 <a href={`tel:${phone}`}>{phone}</a>
            </p>
          )}

          {/* CTA Buttons */}
          <div className="picker-actions">
            <button
              className="btn btn-primary"
              onClick={() => {
                if (url) window.open(url, '_blank');
                onClose();
              }}
            >
              ✓ I'm Going!
            </button>
            <button
              className="btn btn-secondary"
              onClick={onPick}
            >
              🎲 Pick Another
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomPicker;
