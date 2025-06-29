// API Service - Handles all communication with the backend
// Centralized service for making API calls

import axios from 'axios';

class ApiService {
  constructor() {
    // Configure base URL based on environment
    this.baseURL = __DEV__ 
      ? 'http://localhost:3000/api'  // Development
      : 'https://your-production-url.com/api';  // Production
    
    // Create axios instance with default config
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 30000, // 30 seconds
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for logging
    this.api.interceptors.request.use(
      (config) => {
        console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('❌ API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for logging and error handling
    this.api.interceptors.response.use(
      (response) => {
        console.log(`✅ API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('❌ API Response Error:', error.response?.status, error.message);
        return Promise.reject(this.handleApiError(error));
      }
    );
  }

  // Handle API errors consistently
  handleApiError(error) {
    if (error.response) {
      // Server responded with error status
      return {
        message: error.response.data?.message || 'Server error occurred',
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      // Network error
      return {
        message: 'Network error - please check your connection',
        status: 0,
        data: null,
      };
    } else {
      // Other error
      return {
        message: error.message || 'An unexpected error occurred',
        status: -1,
        data: null,
      };
    }
  }

  // Podcast API methods
  async searchPodcasts(query, limit = 10) {
    try {
      const response = await this.api.get('/podcasts/search', {
        params: { q: query, limit },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getPodcastById(id) {
    try {
      const response = await this.api.get(`/podcasts/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getPodcastEpisodes(podcastId, limit = 20) {
    try {
      const response = await this.api.get(`/podcasts/${podcastId}/episodes`, {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getEpisodeTranscript(episodeId) {
    try {
      const response = await this.api.get(`/podcasts/episode/${episodeId}/transcript`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async analyzePodcastUrl(url) {
    try {
      const response = await this.api.post('/podcasts/analyze', { url });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Translation API methods
  async summarizeText(text, length = 'medium') {
    try {
      const response = await this.api.post('/translation/summarize', {
        text,
        length,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async translateText(text, targetLanguage, sourceLanguage = 'English') {
    try {
      const response = await this.api.post('/translation/translate', {
        text,
        targetLanguage,
        sourceLanguage,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async summarizeAndTranslate(text, targetLanguage, sourceLanguage = 'English', summaryLength = 'medium') {
    try {
      const response = await this.api.post('/translation/summarize-and-translate', {
        text,
        targetLanguage,
        sourceLanguage,
        summaryLength,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getSupportedLanguages() {
    try {
      const response = await this.api.get('/translation/languages');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Text-to-Speech API methods
  async generateSpeech(text, options = {}) {
    try {
      const response = await this.api.post('/tts/generate', {
        text,
        ...options,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Generate podcast-quality audio (optimized for long-form content)
  async generatePodcastAudio(text, options = {}) {
    try {
      const response = await this.api.post('/tts/podcast', {
        text,
        ...options,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAvailableVoices(language = null) {
    try {
      const response = await this.api.get('/tts/voices', {
        params: language ? { language } : {},
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get voices specifically optimized for podcast generation
  async getPodcastVoices(language = null) {
    try {
      const response = await this.api.get('/tts/voices/podcast', {
        params: language ? { language } : {},
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async checkTtsStatus(jobId) {
    try {
      const response = await this.api.get(`/tts/status/${jobId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Health check
  async checkHealth() {
    try {
      const response = await axios.get(`${this.baseURL.replace('/api', '')}/health`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

// Export singleton instance
export default new ApiService(); 