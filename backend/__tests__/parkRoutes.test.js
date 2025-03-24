const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');
const Park = require('../models/Park');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Park.deleteMany({});
});

describe('Park Routes', () => {
  const samplePark = {
    name: 'Test Park',
    location: 'Test Location',
    capacity: 100,
    currentOccupancy: 0,
    operatingHours: '9:00 AM - 5:00 PM'
  };

  describe('GET /api/parks', () => {
    it('should return all parks', async () => {
      await Park.create(samplePark);
      const response = await request(app).get('/api/parks');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toBe(samplePark.name);
    });
  });

  describe('GET /api/parks/:id', () => {
    it('should return a specific park', async () => {
      const park = await Park.create(samplePark);
      const response = await request(app).get(`/api/parks/${park._id}`);
      expect(response.status).toBe(200);
      expect(response.body.name).toBe(samplePark.name);
    });

    it('should return 404 if park not found', async () => {
      const response = await request(app).get('/api/parks/123456789012');
      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/parks', () => {
    it('should create a new park', async () => {
      const response = await request(app)
        .post('/api/parks')
        .send(samplePark);
      expect(response.status).toBe(201);
      expect(response.body.name).toBe(samplePark.name);
      const park = await Park.findById(response.body._id);
      expect(park).toBeTruthy();
    });

    it('should return 400 for invalid data', async () => {
      const response = await request(app)
        .post('/api/parks')
        .send({ name: 'Invalid Park' }); // Missing required fields
      expect(response.status).toBe(400);
    });
  });
});