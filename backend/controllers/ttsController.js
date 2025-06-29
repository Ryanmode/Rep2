// Controller for Text-to-Speech operations
// Converts text to audio using TTS services

const ttsService = require('../services/ttsService');

const ttsController = {
  // Generate speech from text
  async generateSpeech(req, res) {
    try {
      const { 
        text, 
        voice = 'default', 
        language = 'en',
        speed = 1.0 
      } = req.body;
      
      if (!text) {
        return res.status(400).json({ 
          error: 'Text is required for speech generation' 
        });
      }

      console.log(`🎤 Generating speech for ${text.length} characters`);
      const audioResult = await ttsService.generateSpeech(text, {
        voice,
        language,
        speed
      });
      
      res.json({
        success: true,
        textLength: text.length,
        voice,
        language,
        audioUrl: audioResult.audioUrl,
        audioData: audioResult.audioData, // Base64 or buffer
        duration: audioResult.duration
      });
    } catch (error) {
      console.error('Error generating speech:', error);
      res.status(500).json({ 
        error: 'Failed to generate speech',
        message: error.message 
      });
    }
  },

  // Get available voices
  async getAvailableVoices(req, res) {
    try {
      const { language } = req.query;
      
      console.log(`🎭 Getting available voices for language: ${language || 'all'}`);
      const voices = await ttsService.getAvailableVoices(language);
      
      res.json({
        success: true,
        language: language || 'all',
        voices
      });
    } catch (error) {
      console.error('Error getting voices:', error);
      res.status(500).json({ 
        error: 'Failed to get available voices',
        message: error.message 
      });
    }
  },

  // Check TTS generation status (for long texts)
  async checkTtsStatus(req, res) {
    try {
      const { jobId } = req.params;
      
      console.log(`⏳ Checking TTS status for job: ${jobId}`);
      const status = await ttsService.checkTtsStatus(jobId);
      
      res.json({
        success: true,
        jobId,
        status: status.status, // 'pending', 'processing', 'completed', 'failed'
        progress: status.progress,
        audioUrl: status.audioUrl,
        audioData: status.audioData,
        duration: status.duration,
        provider: status.provider,
        metadata: status.metadata,
        error: status.error
      });
    } catch (error) {
      console.error('Error checking TTS status:', error);
      res.status(500).json({ 
        error: 'Failed to check TTS status',
        message: error.message 
      });
    }
  },

  // Generate podcast-quality audio (optimized for long-form content)
  async generatePodcastAudio(req, res) {
    try {
      const { 
        text, 
        voice = 'podcast-narrator-male', 
        language = 'en',
        speed = 1.0,
        title,
        description,
        chapters 
      } = req.body;
      
      if (!text) {
        return res.status(400).json({ 
          error: 'Text is required for podcast generation' 
        });
      }

      console.log(`🎙️ Generating podcast audio: ${title || 'Untitled'} (${text.length} chars)`);
      
      const audioResult = await ttsService.generateSpeech(text, {
        voice,
        language,
        speed,
        quality: 'podcast', // Highest quality for podcasts
        podcast_metadata: {
          title,
          description,
          chapters
        }
      });
      
      res.json({
        success: true,
        podcast: {
          title: title || 'Generated Podcast',
          description: description || 'AI-generated podcast from text',
          duration: audioResult.duration,
          chapters: chapters || []
        },
        audio: {
          url: audioResult.audioUrl,
          data: audioResult.audioData,
          format: audioResult.format,
          quality: 'podcast',
          provider: audioResult.provider
        },
        generation: {
          voice_used: voice,
          language,
          speed,
          text_length: text.length,
          word_count: text.split(' ').length,
          estimated_listen_time: audioResult.duration,
          job_id: audioResult.jobId
        },
        metadata: audioResult.metadata
      });
    } catch (error) {
      console.error('Error generating podcast audio:', error);
      res.status(500).json({ 
        error: 'Failed to generate podcast audio',
        message: error.message 
      });
    }
  },

  // Get voices specifically optimized for podcast generation
  async getPodcastVoices(req, res) {
    try {
      const { language } = req.query;
      
      console.log(`🎭 Getting podcast-optimized voices for language: ${language || 'all'}`);
      const allVoices = await ttsService.getAvailableVoices(language);
      
      // Filter for podcast-optimized voices
      const podcastVoices = allVoices.filter(voice => 
        voice.category === 'podcast' || 
        voice.tags?.includes('podcast') ||
        voice.provider === 'autocontent'
      );
      
      res.json({
        success: true,
        language: language || 'all',
        total_voices: podcastVoices.length,
        voices: podcastVoices,
        recommendations: {
          male_narrator: podcastVoices.find(v => v.gender === 'male' && v.category === 'podcast'),
          female_narrator: podcastVoices.find(v => v.gender === 'female' && v.category === 'podcast'),
          conversational: podcastVoices.find(v => v.id.includes('conversational'))
        }
      });
    } catch (error) {
      console.error('Error getting podcast voices:', error);
      res.status(500).json({ 
        error: 'Failed to get podcast voices',
        message: error.message 
      });
    }
  }
};

module.exports = ttsController; 