// Service for podcast-related API operations
// Integrates with external podcast APIs to fetch data

const axios = require('axios');

class PodcastService {
  constructor() {
    // Initialize API configurations
    this.listenNotesApiKey = process.env.LISTEN_NOTES_API_KEY;
    this.listenNotesBaseUrl = 'https://listen-api.listennotes.com/api/v2';
  }

  // Search for podcasts using Listen Notes API
  async searchPodcasts(query, limit = 10) {
    try {
      if (!this.listenNotesApiKey) {
        // Mock data for testing without API key
        return this.getMockPodcastSearch(query, limit);
      }

      const response = await axios.get(`${this.listenNotesBaseUrl}/search`, {
        headers: {
          'X-ListenAPI-Key': this.listenNotesApiKey
        },
        params: {
          q: query,
          type: 'podcast',
          offset: 0,
          len_min: 10,
          len_max: 30,
          sort_by_date: 0,
          language: 'English',
          only_in: 'title,description',
          limit
        }
      });

      return response.data.results.map(podcast => ({
        id: podcast.id,
        title: podcast.title_original,
        description: podcast.description_original,
        image: podcast.image,
        publisher: podcast.publisher_original,
        totalEpisodes: podcast.total_episodes,
        language: podcast.language,
        explicit: podcast.explicit_content
      }));
    } catch (error) {
      console.error('Error searching podcasts:', error.message);
      // Return mock data on error
      return this.getMockPodcastSearch(query, limit);
    }
  }

  // Get specific podcast details
  async getPodcastById(id) {
    try {
      if (!this.listenNotesApiKey) {
        return this.getMockPodcastDetails(id);
      }

      const response = await axios.get(`${this.listenNotesBaseUrl}/podcasts/${id}`, {
        headers: {
          'X-ListenAPI-Key': this.listenNotesApiKey
        }
      });

      const podcast = response.data;
      return {
        id: podcast.id,
        title: podcast.title,
        description: podcast.description,
        image: podcast.image,
        publisher: podcast.publisher,
        totalEpisodes: podcast.total_episodes,
        language: podcast.language,
        website: podcast.website,
        rss: podcast.rss,
        explicit: podcast.explicit_content
      };
    } catch (error) {
      console.error('Error getting podcast details:', error.message);
      return this.getMockPodcastDetails(id);
    }
  }

  // Get episodes for a podcast
  async getPodcastEpisodes(podcastId, limit = 20) {
    try {
      if (!this.listenNotesApiKey) {
        return this.getMockEpisodes(podcastId, limit);
      }

      const response = await axios.get(`${this.listenNotesBaseUrl}/podcasts/${podcastId}`, {
        headers: {
          'X-ListenAPI-Key': this.listenNotesApiKey
        },
        params: {
          next_episode_pub_date: new Date().getTime(),
          sort: 'recent_first'
        }
      });

      return response.data.episodes.slice(0, limit).map(episode => ({
        id: episode.id,
        title: episode.title,
        description: episode.description,
        audio: episode.audio,
        audioLength: episode.audio_length_sec,
        pubDate: episode.pub_date_ms,
        image: episode.image,
        explicit: episode.explicit_content
      }));
    } catch (error) {
      console.error('Error getting episodes:', error.message);
      return this.getMockEpisodes(podcastId, limit);
    }
  }

  // Get transcript for an episode
  async getEpisodeTranscript(episodeId) {
    try {
      // Most podcast APIs don't provide transcripts directly
      // You might need to use services like AssemblyAI, Rev.ai, or Whisper
      // For now, return mock transcript
      return this.getMockTranscript(episodeId);
    } catch (error) {
      console.error('Error getting transcript:', error.message);
      return this.getMockTranscript(episodeId);
    }
  }

  // Analyze a podcast URL to extract information
  async analyzePodcastUrl(url) {
    try {
      // Basic URL analysis - you can enhance this
      const urlPatterns = {
        spotify: /spotify\.com\/show\/([a-zA-Z0-9]+)/,
        apple: /podcasts\.apple\.com.*\/id(\d+)/,
        google: /podcasts\.google\.com.*\/([a-zA-Z0-9-_]+)/
      };

      let platform = 'unknown';
      let extractedId = null;

      for (const [platformName, pattern] of Object.entries(urlPatterns)) {
        const match = url.match(pattern);
        if (match) {
          platform = platformName;
          extractedId = match[1];
          break;
        }
      }

      return {
        url,
        platform,
        extractedId,
        isSupported: platform !== 'unknown',
        suggestion: platform === 'unknown' 
          ? 'Try searching for the podcast name instead'
          : `Found ${platform} podcast. Use the search feature to find it in our database.`
      };
    } catch (error) {
      console.error('Error analyzing URL:', error.message);
      throw error;
    }
  }

  // Mock data methods (for testing without API keys)
  getMockPodcastSearch(query, limit) {
    const mockPodcasts = [
      {
        id: 'mock-1',
        title: `${query} Podcast #1`,
        description: `A great podcast about ${query} with interesting discussions and insights.`,
        image: 'https://via.placeholder.com/300x300?text=Podcast+1',
        publisher: 'Mock Publisher 1',
        totalEpisodes: 150,
        language: 'English',
        explicit: false
      },
      {
        id: 'mock-2',
        title: `The ${query} Show`,
        description: `Weekly episodes covering everything related to ${query}.`,
        image: 'https://via.placeholder.com/300x300?text=Podcast+2',
        publisher: 'Mock Publisher 2',
        totalEpisodes: 89,
        language: 'English',
        explicit: false
      }
    ];

    return mockPodcasts.slice(0, limit);
  }

  getMockPodcastDetails(id) {
    return {
      id,
      title: 'Mock Podcast Title',
      description: 'This is a mock podcast for testing purposes. It contains interesting content about various topics.',
      image: 'https://via.placeholder.com/300x300?text=Mock+Podcast',
      publisher: 'Mock Publisher',
      totalEpisodes: 100,
      language: 'English',
      website: 'https://mockpodcast.com',
      rss: 'https://mockpodcast.com/feed.xml',
      explicit: false
    };
  }

  getMockEpisodes(podcastId, limit) {
    const episodes = [];
    for (let i = 1; i <= limit; i++) {
      episodes.push({
        id: `episode-${i}`,
        title: `Episode ${i}: Mock Episode Title`,
        description: `This is episode ${i} of our mock podcast series.`,
        audio: 'https://mockpodcast.com/audio/episode-' + i + '.mp3',
        audioLength: 1800 + (i * 60), // 30+ minutes
        pubDate: Date.now() - (i * 24 * 60 * 60 * 1000), // i days ago
        image: 'https://via.placeholder.com/300x300?text=Episode+' + i,
        explicit: false
      });
    }
    return episodes;
  }

  getMockTranscript(episodeId) {
    return {
      episodeId,
      text: `This is a mock transcript for episode ${episodeId}. In a real implementation, you would use services like AssemblyAI, Rev.ai, or OpenAI's Whisper to generate transcripts from audio files. The transcript would contain the full spoken content of the podcast episode, which can then be summarized and translated using the other services in this application.`,
      confidence: 0.95,
      language: 'en',
      duration: 1847,
      wordCount: 45
    };
  }
}

module.exports = new PodcastService(); 