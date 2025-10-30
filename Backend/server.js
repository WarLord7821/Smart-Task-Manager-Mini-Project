// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
// Enable CORS to allow our frontend (on a different port) to connect
app.use(cors()); 
app.use(express.json()); // To parse JSON bodies

// Task Routes
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

// --- Database Connection & Server Start ---
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    // In a production environment, you might log this error more carefully
    process.exit(1); 
  });