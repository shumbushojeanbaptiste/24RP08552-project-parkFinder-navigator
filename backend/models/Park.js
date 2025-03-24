const mongoose = require('mongoose');

const parkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  totalParkingSpots: {
    type: Number,
    required: true,
    min: 0
  },
  availableParkingSpots: {
    type: Number,
    default: 0,
    min: 0
  },
  facilities: [{
    type: String,
    enum: ['Restroom', 'Playground', 'PicnicArea', 'SportsCourt', 'WaterFountain']
  }],
  operatingHours: {
    open: String,
    close: String
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    user: String,
    comment: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for geospatial queries
parkSchema.index({ location: '2dsphere' });

const Park = mongoose.model('Park', parkSchema);

module.exports = Park;