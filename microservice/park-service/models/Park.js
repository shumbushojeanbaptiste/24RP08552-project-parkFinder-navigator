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
  status: {
    type: String,
    enum: ['active', 'maintenance', 'closed'],
    default: 'active'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

parkSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Park', parkSchema);