// Routes for Text-to-Speech functionality
// Converts translated text to audio

const express = require('express');
const router = express.Router();
const ttsController = require('../controllers/ttsController');

// POST /api/tts/generate
// Convert text to speech
router.post('/generate', ttsController.generateSpeech);

// POST /api/tts/podcast
// Generate podcast-quality audio (optimized for long-form content)
router.post('/podcast', ttsController.generatePodcastAudio);

// GET /api/tts/voices
// Get available voices for TTS
router.get('/voices', ttsController.getAvailableVoices);

// GET /api/tts/voices/podcast
// Get voices specifically optimized for podcast generation
router.get('/voices/podcast', ttsController.getPodcastVoices);

// GET /api/tts/status/:jobId
// Check status of TTS generation (for long texts)
router.get('/status/:jobId', ttsController.checkTtsStatus);

module.exports = router; 