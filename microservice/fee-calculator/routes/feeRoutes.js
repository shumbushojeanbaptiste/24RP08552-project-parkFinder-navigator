const express = require('express');
const router = express.Router();
const Fee = require('../models/Fee');

// Get fee configuration for a park and vehicle type
router.get('/:parkId/:vehicleType', async (req, res) => {
  try {
    const { parkId, vehicleType } = req.params;
    const currentDate = new Date();

    const fee = await Fee.findOne({
      parkId,
      vehicleType,
      effectiveFrom: { $lte: currentDate },
      $or: [
        { effectiveTo: { $gt: currentDate } },
        { effectiveTo: null }
      ]
    });

    if (!fee) {
      return res.status(404).json({ message: 'Fee configuration not found' });
    }

    res.json(fee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Calculate parking fee
router.post('/calculate', async (req, res) => {
  try {
    const { parkId, vehicleType, startTime, endTime } = req.body;
    
    // Get fee configuration
    const fee = await Fee.findOne({
      parkId,
      vehicleType,
      effectiveFrom: { $lte: new Date(startTime) },
      $or: [
        { effectiveTo: { $gt: new Date(endTime) } },
        { effectiveTo: null }
      ]
    });

    if (!fee) {
      return res.status(404).json({ message: 'Fee configuration not found' });
    }

    // Calculate duration in hours
    const duration = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60);
    
    // Calculate base fee
    let totalFee = fee.baseRate;
    
    // Add hourly rate
    totalFee += Math.ceil(duration) * fee.hourlyRate;
    
    // Apply daily max rate if applicable
    if (totalFee > fee.dailyMaxRate) {
      totalFee = fee.dailyMaxRate;
    }
    
    // Apply special rates if applicable
    const parkDate = new Date(startTime);
    const dayType = parkDate.getDay() === 0 || parkDate.getDay() === 6 ? 'weekend' : 'weekday';
    const specialRate = fee.specialRates.find(rate => rate.dayType === dayType);
    
    if (specialRate) {
      totalFee *= specialRate.multiplier;
    }

    res.json({
      baseRate: fee.baseRate,
      hourlyRate: fee.hourlyRate,
      duration: duration,
      totalFee: totalFee,
      dayType: dayType
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new fee configuration
router.post('/', async (req, res) => {
  try {
    const fee = new Fee(req.body);
    const newFee = await fee.save();
    res.status(201).json(newFee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update fee configuration
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFee = await Fee.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedFee) {
      return res.status(404).json({ message: 'Fee configuration not found' });
    }
    
    res.json(updatedFee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;