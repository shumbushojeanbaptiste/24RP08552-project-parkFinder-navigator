const mongoose = require('mongoose');
const Park = require('../models/Park');
require('dotenv').config();

const parkData = [
  {
    name: 'Central City Park',
    location: {
      type: 'Point',
      coordinates: [-73.968285, 40.785091]
    },
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    totalParkingSpots: 100,
    availableParkingSpots: 75,
    facilities: ['Restroom', 'Playground', 'PicnicArea'],
    operatingHours: {
      open: '06:00',
      close: '22:00'
    },
    rating: 4.5
  },
  {
    name: 'Riverside Park',
    location: {
      type: 'Point',
      coordinates: [-73.974689, 40.791882]
    },
    address: {
      street: '456 River Road',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'USA'
    },
    totalParkingSpots: 150,
    availableParkingSpots: 120,
    facilities: ['Restroom', 'SportsCourt', 'WaterFountain'],
    operatingHours: {
      open: '05:00',
      close: '23:00'
    },
    rating: 4.2
  },
  {
    name: 'Mountain View Park',
    location: {
      type: 'Point',
      coordinates: [-73.981258, 40.768452]
    },
    address: {
      street: '789 Hill Avenue',
      city: 'New York',
      state: 'NY',
      zipCode: '10003',
      country: 'USA'
    },
    totalParkingSpots: 80,
    availableParkingSpots: 45,
    facilities: ['Playground', 'PicnicArea', 'WaterFountain'],
    operatingHours: {
      open: '07:00',
      close: '21:00'
    },
    rating: 4.0
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Park.deleteMany({});
    console.log('Cleared existing parks');

    // Insert new data
    const parks = await Park.insertMany(parkData);
    console.log(`Inserted ${parks.length} parks`);

    mongoose.connection.close();
    console.log('Database connection closed');
  })
  .catch(err => {
    console.error('Error seeding data:', err);
    process.exit(1);
  });