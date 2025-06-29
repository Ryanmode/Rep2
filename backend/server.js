// Main server file for Rapidlu backend
// This sets up the Express server and connects all the routes

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8081',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Import routes
const podcastRoutes = require('./routes/podcast');
const translationRoutes = require('./routes/translation');
const ttsRoutes = require('./routes/tts');

// Use routes
app.use('/api/podcasts', podcastRoutes);
app.use('/api/translation', translationRoutes);
app.use('/api/tts', ttsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Rapidlu backend is running!',
    timestamp: new Date().toISOString()
  });
});

// Welcome message
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Rapidlu API!',
    endpoints: {
      health: '/health',
      podcasts: '/api/podcasts',
      translation: '/api/translation',
      tts: '/api/tts'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Rapidlu backend server running on port ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 API base URL: http://localhost:${PORT}/api`);
}); 