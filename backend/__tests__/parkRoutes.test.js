const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Park = require('../models/Park');

describe('Park Routes', () => {
  const samplePark = {
    name: 'Test Park',
    location: {
      type: 'Point',
      coordinates: [-73.968285, 40.785091]
    },
    address: {
      street: '123 Test St',
      city: 'Test City',
      state: 'TS',
      zipCode: '12345',
      country: 'Test Country'
    },
    totalParkingSpots: 100,
    availableParkingSpots: 50,
    facilities: ['Restroom', 'Playground'],
    operatingHours: {
      open: '06:00',
      close: '22:00'
    },
    rating: 4.5
  };

  describe('GET /parks', () => {
    it('should return all parks', async () => {
      const park = new Park(samplePark);
      await park.save();

      const res = await request(app).get('/api/parks');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]).toHaveProperty('name', samplePark.name);
    });
  });

  describe('POST /parks', () => {
    it('should create a new park', async () => {
      const res = await request(app)
        .post('/api/parks')
        .send(samplePark);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('name', samplePark.name);
      expect(res.body).toHaveProperty('totalParkingSpots', samplePark.totalParkingSpots);
    });

    it('should handle invalid park data', async () => {
      const invalidPark = { name: 'Invalid Park' };
      const res = await request(app)
        .post('/api/parks')
        .send(invalidPark);

      expect(res.status).toBe(400);
    });
  });

  describe('GET /parks/:id', () => {
    it('should return a specific park', async () => {
      const park = new Park(samplePark);
      const savedPark = await park.save();

      const res = await request(app).get(`/api/parks/${savedPark._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', samplePark.name);
    });

    it('should return 404 for non-existent park', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/parks/${nonExistentId}`);
      expect(res.status).toBe(404);
    });
  });

  describe('GET /parks/nearby/:lat/:lng', () => {
    it('should return nearby parks', async () => {
      const park = new Park(samplePark);
      await park.save();

      const res = await request(app).get('/api/parks/nearby/40.785091/-73.968285');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /parks/:id/parking', () => {
    it('should return parking availability', async () => {
      const park = new Park(samplePark);
      const savedPark = await park.save();

      const res = await request(app).get(`/api/parks/${savedPark._id}/parking`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('availableParkingSpots');
      expect(res.body).toHaveProperty('totalParkingSpots');
    });
  });
});