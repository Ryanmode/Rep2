// Routes for podcast-related endpoints
// Handles searching, fetching, and getting transcripts

const express = require('express');
const router = express.Router();
const podcastController = require('../controllers/podcastController');

// GET /api/podcasts/search?q=query
// Search for podcasts by name/topic
router.get('/search', podcastController.searchPodcasts);

// GET /api/podcasts/:id
// Get specific podcast details
router.get('/:id', podcastController.getPodcastById);

// GET /api/podcasts/:id/episodes
// Get episodes for a specific podcast
router.get('/:id/episodes', podcastController.getPodcastEpisodes);

// GET /api/podcasts/episode/:episodeId/transcript
// Get transcript for a specific episode
router.get('/episode/:episodeId/transcript', podcastController.getEpisodeTranscript);

// POST /api/podcasts/analyze
// Analyze a podcast URL and get basic info
router.post('/analyze', podcastController.analyzePodcastUrl);

module.exports = router; 