const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  parkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Park',
    required: true
  },
  vehicleType: {
    type: String,
    enum: ['car', 'motorcycle', 'truck'],
    required: true
  },
  baseRate: {
    type: Number,
    required: true,
    min: 0
  },
  hourlyRate: {
    type: Number,
    required: true,
    min: 0
  },
  dailyMaxRate: {
    type: Number,
    required: true,
    min: 0
  },
  specialRates: [{
    dayType: {
      type: String,
      enum: ['weekday', 'weekend', 'holiday'],
      required: true
    },
    multiplier: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  effectiveFrom: {
    type: Date,
    default: Date.now
  },
  effectiveTo: {
    type: Date
  }
});

// Compound index for efficient fee lookup
feeSchema.index({ parkId: 1, vehicleType: 1, effectiveFrom: 1, effectiveTo: 1 });

module.exports = mongoose.model('Fee', feeSchema);