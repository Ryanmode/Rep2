// Controller for podcast-related operations
// Contains the business logic for podcast endpoints

const podcastService = require('../services/podcastService');

const podcastController = {
  // Search for podcasts
  async searchPodcasts(req, res) {
    try {
      const { q: query, limit = 10 } = req.query;
      
      if (!query) {
        return res.status(400).json({ 
          error: 'Query parameter is required' 
        });
      }

      console.log(`🔍 Searching podcasts for: ${query}`);
      const results = await podcastService.searchPodcasts(query, limit);
      
      res.json({
        success: true,
        query,
        results
      });
    } catch (error) {
      console.error('Error searching podcasts:', error);
      res.status(500).json({ 
        error: 'Failed to search podcasts',
        message: error.message 
      });
    }
  },

  // Get specific podcast by ID
  async getPodcastById(req, res) {
    try {
      const { id } = req.params;
      
      console.log(`📻 Getting podcast details for ID: ${id}`);
      const podcast = await podcastService.getPodcastById(id);
      
      res.json({
        success: true,
        podcast
      });
    } catch (error) {
      console.error('Error getting podcast:', error);
      res.status(500).json({ 
        error: 'Failed to get podcast details',
        message: error.message 
      });
    }
  },

  // Get episodes for a podcast
  async getPodcastEpisodes(req, res) {
    try {
      const { id } = req.params;
      const { limit = 20 } = req.query;
      
      console.log(`📋 Getting episodes for podcast ID: ${id}`);
      const episodes = await podcastService.getPodcastEpisodes(id, limit);
      
      res.json({
        success: true,
        podcastId: id,
        episodes
      });
    } catch (error) {
      console.error('Error getting episodes:', error);
      res.status(500).json({ 
        error: 'Failed to get podcast episodes',
        message: error.message 
      });
    }
  },

  // Get transcript for an episode
  async getEpisodeTranscript(req, res) {
    try {
      const { episodeId } = req.params;
      
      console.log(`📝 Getting transcript for episode ID: ${episodeId}`);
      const transcript = await podcastService.getEpisodeTranscript(episodeId);
      
      res.json({
        success: true,
        episodeId,
        transcript
      });
    } catch (error) {
      console.error('Error getting transcript:', error);
      res.status(500).json({ 
        error: 'Failed to get episode transcript',
        message: error.message 
      });
    }
  },

  // Analyze a podcast URL
  async analyzePodcastUrl(req, res) {
    try {
      const { url } = req.body;
      
      if (!url) {
        return res.status(400).json({ 
          error: 'URL is required' 
        });
      }

      console.log(`🔍 Analyzing podcast URL: ${url}`);
      const analysis = await podcastService.analyzePodcastUrl(url);
      
      res.json({
        success: true,
        url,
        analysis
      });
    } catch (error) {
      console.error('Error analyzing URL:', error);
      res.status(500).json({ 
        error: 'Failed to analyze podcast URL',
        message: error.message 
      });
    }
  }
};

module.exports = podcastController; 