// app.js

require('dotenv').config(); // Load environment variables
const express = require('express'); // Import Express
const bodyParser = require('body-parser'); // Parse JSON requests
const paymentRoutes = require('./src/routes/paymentRoutes'); // Import routes

const app = express(); // Create Express app

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use('/api/payment', paymentRoutes); // Register payment routes

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the Payment Integration API!');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
