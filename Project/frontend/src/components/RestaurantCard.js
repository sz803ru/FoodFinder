import React from 'react';
import '../styles/RestaurantCard.css';

/**
 * RestaurantCard Component
 * Displays individual restaurant information
 */
const RestaurantCard = ({ restaurant, onViewDetails }) => {
  const {
    id,
    name,
    image_url,
    rating,
    review_count,
    price,
    categories,
    location,
    phone,
    is_closed,
    distance,
    transactions,
  } = restaurant;

  const formatDistance = (meters) => {
    if (!meters) return '';
    return (meters / 1609.34).toFixed(1); // Convert to miles
  };  // eslint-disable-next-line no-unused-vars

  const getCategoryString = () => {
    return categories.map((cat) => cat.title).join(', ');
  };

  const getDeliveryOptions = () => {
    if (!transactions || transactions.length === 0) return [];
    return transactions.map((t) => {
      const icons = {
        pickup: '🚗',
        delivery: '🚴',
        restaurant_reservation: '🪑',
      };
      return `${icons[t] || '📦'} ${t.replace(/_/g, ' ')}`;
    });
  };

  return (
    <div className={`restaurant-card ${is_closed ? 'closed' : ''}`}>
      {/* Image Section */}
      <div className="card-image-wrapper">
        {image_url ? (
          <img
            src={image_url}
            alt={name}
            className="card-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
            }}
          />
        ) : (
          <div className="card-image placeholder">No Image</div>
        )}

        {is_closed && <div className="status-badge closed">Closed</div>}
        {!is_closed && <div className="status-badge open">Open</div>}

        {price && <div className="price-badge">{price}</div>}
      </div>

      {/* Content Section */}
      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{name}</h3>
          {distance && (
            <span className="card-distance">
              📍 {formatDistance(distance)} mi
            </span>
          )}
        </div>

        {/* Rating Section */}
        <div className="card-rating">
          <div className="stars">
            {'⭐'.repeat(Math.round(rating))}
            <span className="rating-value">{rating.toFixed(1)}</span>
          </div>
          <span className="review-count">({review_count} reviews)</span>
        </div>

        {/* Categories */}
        <p className="card-categories">{getCategoryString()}</p>

        {/* Location */}
        {location && (
          <p className="card-location">
            📍 {location.address1}
            {location.city && `, ${location.city}`}
          </p>
        )}

        {/* Phone */}
        {phone && (
          <p className="card-phone">
            📞 <a href={`tel:${phone}`}>{phone}</a>
          </p>
        )}

        {/* Delivery Options */}
        {getDeliveryOptions().length > 0 && (
          <div className="delivery-options">
            {getDeliveryOptions().map((option, index) => (
              <span key={index} className="delivery-badge">
                {option}
              </span>
            ))}
          </div>
        )}

        {/* Action Button */}
        <button
          className="btn btn-primary card-button"
          onClick={() => onViewDetails(restaurant)}
        >
          View Details →
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
