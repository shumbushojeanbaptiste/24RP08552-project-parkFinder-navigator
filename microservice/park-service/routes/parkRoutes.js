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

// Get park by ID
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

// Create new park
router.post('/', async (req, res) => {
  const park = new Park({
    name: req.body.name,
    location: req.body.location,
    totalParkingSpots: req.body.totalParkingSpots,
    availableParkingSpots: req.body.availableParkingSpots,
    status: req.body.status
  });

  try {
    const newPark = await park.save();
    res.status(201).json(newPark);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update park
router.patch('/:id', async (req, res) => {
  try {
    const park = await Park.findById(req.params.id);
    if (!park) {
      return res.status(404).json({ message: 'Park not found' });
    }

    Object.keys(req.body).forEach(key => {
      if (park[key] !== undefined) {
        park[key] = req.body[key];
      }
    });

    const updatedPark = await park.save();
    res.json(updatedPark);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete park
router.delete('/:id', async (req, res) => {
  try {
    const park = await Park.findById(req.params.id);
    if (!park) {
      return res.status(404).json({ message: 'Park not found' });
    }
    await park.remove();
    res.json({ message: 'Park deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;