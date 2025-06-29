// Routes for translation and summarization using OpenAI
// Handles text summarization and language translation

const express = require('express');
const router = express.Router();
const translationController = require('../controllers/translationController');

// POST /api/translation/summarize
// Summarize a podcast transcript
router.post('/summarize', translationController.summarizeText);

// POST /api/translation/translate
// Translate text to specified language
router.post('/translate', translationController.translateText);

// POST /api/translation/summarize-and-translate
// Do both operations in one request (more efficient)
router.post('/summarize-and-translate', translationController.summarizeAndTranslate);

// GET /api/translation/languages
// Get list of supported languages
router.get('/languages', translationController.getSupportedLanguages);

module.exports = router; 