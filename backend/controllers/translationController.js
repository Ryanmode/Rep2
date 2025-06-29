// Controller for translation and summarization operations
// Uses OpenAI API for text processing

const translationService = require('../services/translationService');

const translationController = {
  // Summarize text using OpenAI
  async summarizeText(req, res) {
    try {
      const { text, length = 'medium' } = req.body;
      
      if (!text) {
        return res.status(400).json({ 
          error: 'Text is required for summarization' 
        });
      }

      console.log(`📝 Summarizing text (${text.length} characters)`);
      const summary = await translationService.summarizeText(text, length);
      
      res.json({
        success: true,
        originalLength: text.length,
        summaryLength: summary.length,
        summary
      });
    } catch (error) {
      console.error('Error summarizing text:', error);
      res.status(500).json({ 
        error: 'Failed to summarize text',
        message: error.message 
      });
    }
  },

  // Translate text to specified language
  async translateText(req, res) {
    try {
      const { text, targetLanguage, sourceLanguage = 'English' } = req.body;
      
      if (!text || !targetLanguage) {
        return res.status(400).json({ 
          error: 'Text and target language are required' 
        });
      }

      console.log(`🌐 Translating text from ${sourceLanguage} to ${targetLanguage}`);
      const translation = await translationService.translateText(
        text, 
        sourceLanguage, 
        targetLanguage
      );
      
      res.json({
        success: true,
        sourceLanguage,
        targetLanguage,
        originalText: text,
        translation
      });
    } catch (error) {
      console.error('Error translating text:', error);
      res.status(500).json({ 
        error: 'Failed to translate text',
        message: error.message 
      });
    }
  },

  // Summarize and translate in one operation (more efficient)
  async summarizeAndTranslate(req, res) {
    try {
      const { 
        text, 
        targetLanguage, 
        sourceLanguage = 'English',
        summaryLength = 'medium' 
      } = req.body;
      
      if (!text || !targetLanguage) {
        return res.status(400).json({ 
          error: 'Text and target language are required' 
        });
      }

      console.log(`⚡ Summarizing and translating to ${targetLanguage}`);
      const result = await translationService.summarizeAndTranslate(
        text, 
        sourceLanguage, 
        targetLanguage, 
        summaryLength
      );
      
      res.json({
        success: true,
        sourceLanguage,
        targetLanguage,
        originalLength: text.length,
        summaryLength: result.summary.length,
        translationLength: result.translation.length,
        summary: result.summary,
        translation: result.translation
      });
    } catch (error) {
      console.error('Error in summarize and translate:', error);
      res.status(500).json({ 
        error: 'Failed to summarize and translate',
        message: error.message 
      });
    }
  },

  // Get supported languages
  async getSupportedLanguages(req, res) {
    try {
      const languages = translationService.getSupportedLanguages();
      
      res.json({
        success: true,
        languages
      });
    } catch (error) {
      console.error('Error getting languages:', error);
      res.status(500).json({ 
        error: 'Failed to get supported languages',
        message: error.message 
      });
    }
  }
};

module.exports = translationController; 