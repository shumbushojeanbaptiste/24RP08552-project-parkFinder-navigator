const express = require('express');
const router = express.Router();
const Park = require('../models/Park');

// Get all parks
router.get('/', async (req, res) => {
  try {
    const parks = await Park.find();
    res.json(parks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get nearby parks based on location
router.get('/nearby/:lat/:lng', async (req, res) => {
  try {
    const { lat, lng } = req.params;
    const parks = await Park.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: 10000 // 10km radius
        }
      }
    });
    res.json(parks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific park
router.get('/:id', async (req, res) => {
  try {
    const park = await Park.findById(req.params.id);
    if (!park) {
      return res.status(404).json({ message: 'Park not found' });
    }
    res.json(park);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new park
router.post('/', async (req, res) => {
  try {
    const park = new Park(req.body);
    const newPark = await park.save();
    if (newPark) {
      res.status(201).json(newPark);
    } else {
      res.status(400).json({ message: 'Failed to create park' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a park
router.put('/:id', async (req, res) => {
  try {
    const park = await Park.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!park) {
      return res.status(404).json({ message: 'Park not found' });
    }
    res.json(park);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a park
router.delete('/:id', async (req, res) => {
  try {
    const park = await Park.findByIdAndDelete(req.params.id);
    if (!park) {
      return res.status(404).json({ message: 'Park not found' });
    }
    res.json({ message: 'Park deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get nearby parks based on location
router.get('/nearby/:lat/:lng', async (req, res) => {
  try {
    const { lat, lng } = req.params;
    const parks = await Park.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: 10000 // 10km radius
        }
      }
    });
    res.json(parks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get parking availability for a specific park
router.get('/:id/parking', async (req, res) => {
  try {
    const park = await Park.findById(req.params.id).select('name totalParkingSpots availableParkingSpots');
    if (!park) {
      return res.status(404).json({ message: 'Park not found' });
    }
    res.json({
      name: park.name,
      availableParkingSpots: park.availableParkingSpots,
      totalParkingSpots: park.totalParkingSpots
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;