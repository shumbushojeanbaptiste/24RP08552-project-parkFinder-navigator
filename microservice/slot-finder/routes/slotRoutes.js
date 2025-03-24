const express = require('express');
const router = express.Router();
const Slot = require('../models/Slot');

// Get all slots with optional filtering
router.get('/', async (req, res) => {
  try {
    const { parkId, status, vehicleType } = req.query;
    const filter = {};
    
    if (parkId) filter.parkId = parkId;
    if (status) filter.status = status;
    if (vehicleType) filter.vehicleType = vehicleType;
    
    const slots = await Slot.find(filter);
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get available slots count by vehicle type
router.get('/availability/:parkId', async (req, res) => {
  try {
    const { parkId } = req.params;
    const availability = await Slot.aggregate([
      {
        $match: {
          parkId: parkId,
          status: 'available'
        }
      },
      {
        $group: {
          _id: '$vehicleType',
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(availability);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new slot
router.post('/', async (req, res) => {
  try {
    const slot = new Slot(req.body);
    const newSlot = await slot.save();
    res.status(201).json(newSlot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update slot status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const updatedSlot = await Slot.findByIdAndUpdate(
      id,
      { 
        status,
        lastUpdated: Date.now()
      },
      { new: true }
    );
    
    if (!updatedSlot) {
      return res.status(404).json({ message: 'Slot not found' });
    }
    
    res.json(updatedSlot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete slot
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSlot = await Slot.findByIdAndDelete(id);
    
    if (!deletedSlot) {
      return res.status(404).json({ message: 'Slot not found' });
    }
    
    res.json({ message: 'Slot deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;