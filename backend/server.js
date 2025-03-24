const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/parks', require('./routes/parkRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});