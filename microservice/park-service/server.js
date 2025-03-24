require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const parkRoutes = require('./routes/parkRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/parks', parkRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PARK_SERVICE_PORT || 5001;
app.listen(PORT, () => {
  console.log(`Park Service running on port ${PORT}`);
});