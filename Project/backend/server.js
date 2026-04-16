require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Constants
const YELP_API_URL = 'https://api.yelp.com/v3';
const API_KEY = process.env.YELP_API_KEY;

// Error handler utility
const handleYelpError = (error, res) => {
  console.error('Yelp API Error:', error.response?.data || error.message);
  const status = error.response?.status || 500;
  const message = error.response?.data?.error?.description || 'Failed to fetch from Yelp API';
  res.status(status).json({ error: message });
};

/**
 * GET /api/search
 * Search for restaurants by location and query
 * Query params:
 *   - location: String (address or city)
 *   - latitude: Number (for coordinate-based search)
 *   - longitude: Number (for coordinate-based search)
 *   - term: String (search term, e.g., "pizza")
 *   - radius: Number (search radius in meters, max 40000)
 *   - sort_by: String (best_match, rating, review_count, distance)
 *   - price: String (1,2,3,4 - comma separated for multiple)
 *   - open_now: Boolean
 *   - attributes: String (comma-separated, e.g., "outdoor_seating,wifi")
 *   - limit: Number (1-50, default 20)
 *   - offset: Number (for pagination)
 */
app.get('/api/search', async (req, res) => {
  try {
    const {
      location,
      latitude,
      longitude,
      term = 'restaurants',
      radius = 8000,
      sort_by = 'best_match',
      price,
      open_now,
      attributes,
      limit = 20,
      offset = 0,
    } = req.query;

    // Validate that at least location or coordinates are provided
    if (!location && (!latitude || !longitude)) {
      return res.status(400).json({
        error: 'Either location or latitude/longitude coordinates are required',
      });
    }

    // Build request body
    const searchParams = {
      term,
      radius: Math.min(parseInt(radius) || 8000, 40000), // Max 40km
      sort_by,
      limit: Math.min(parseInt(limit) || 20, 50), // Max 50
      offset: parseInt(offset) || 0,
    };

    // Add location or coordinates
    if (latitude && longitude) {
      searchParams.latitude = parseFloat(latitude);
      searchParams.longitude = parseFloat(longitude);
    } else {
      searchParams.location = location;
    }

    // Add optional filters
    if (price) {
      searchParams.price = price;
    }
    if (open_now === 'true') {
      searchParams.open_now = true;
    }
    if (attributes) {
      searchParams.attributes = attributes;
    }

    // Make request to Yelp API
    const response = await axios.get(`${YELP_API_URL}/businesses/search`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      params: searchParams,
    });

    res.json(response.data);
  } catch (error) {
    handleYelpError(error, res);
  }
});

/**
 * GET /api/business/:id
 * Get detailed information about a specific business
 */
app.get('/api/business/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Business ID is required' });
    }

    const response = await axios.get(`${YELP_API_URL}/businesses/${id}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    handleYelpError(error, res);
  }
});

/**
 * GET /api/businesses/reviews/:id
 * Get reviews for a specific business
 */
app.get('/api/businesses/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Business ID is required' });
    }

    const response = await axios.get(`${YELP_API_URL}/businesses/${id}/reviews`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    handleYelpError(error, res);
  }
});

/**
 * GET /api/autocomplete
 * Autocomplete suggestions for business search
 */
app.get('/api/autocomplete', async (req, res) => {
  try {
    const { text, latitude, longitude } = req.query;

    if (!text) {
      return res.status(400).json({ error: 'Search text is required' });
    }

    const params = { text };

    if (latitude && longitude) {
      params.latitude = parseFloat(latitude);
      params.longitude = parseFloat(longitude);
    }

    const response = await axios.get(`${YELP_API_URL}/autocomplete`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      params,
    });

    res.json(response.data);
  } catch (error) {
    handleYelpError(error, res);
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'API Proxy is running' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🍽️ Food Finder Backend running on http://localhost:${PORT}`);
  console.log(`📝 API Proxy initialized for Yelp Fusion API`);
});
