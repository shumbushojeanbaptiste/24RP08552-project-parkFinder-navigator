const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  parkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Park',
    required: true
  },
  slotNumber: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'occupied', 'reserved', 'maintenance'],
    default: 'available'
  },
  vehicleType: {
    type: String,
    enum: ['car', 'motorcycle', 'truck'],
    required: true
  },
  floor: {
    type: Number,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Compound index for efficient querying
slotSchema.index({ parkId: 1, status: 1, vehicleType: 1 });

module.exports = mongoose.model('Slot', slotSchema);