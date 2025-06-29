// Service for Text-to-Speech operations
// Integrates with TTS APIs like ElevenLabs, PlayHT, etc.

const axios = require('axios');

class TTSService {
  constructor() {
    // API configurations
    this.autoContentApiKey = process.env.AUTOCONTENT_API_KEY;
    this.autoContentBaseUrl = process.env.AUTOCONTENT_BASE_URL || 'https://api.autocontent.ai/v1';
    
    this.elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;
    this.elevenLabsBaseUrl = 'https://api.elevenlabs.io/v1';
    
    this.playhtApiKey = process.env.PLAYHT_API_KEY;
    this.playhtUserId = process.env.PLAYHT_USER_ID;
    this.playhtBaseUrl = 'https://play.ht/api/v2';

    // Job storage for tracking long TTS operations
    this.ttsJobs = new Map();
  }

  // Generate speech from text
  async generateSpeech(text, options = {}) {
    const { voice = 'default', language = 'en', speed = 1.0, quality = 'podcast' } = options;

    try {
      // Try AutoContent API first (best for podcast quality)
      if (this.autoContentApiKey) {
        return await this.generateWithAutoContent(text, voice, language, speed, quality);
      }
      
      // Try ElevenLabs as fallback
      if (this.elevenLabsApiKey) {
        return await this.generateWithElevenLabs(text, voice, speed);
      }
      
      // Try PlayHT as fallback
      if (this.playhtApiKey) {
        return await this.generateWithPlayHT(text, voice, language, speed);
      }

      // Return mock audio if no API keys available
      return this.getMockAudio(text, voice, language);
    } catch (error) {
      console.error('Error generating speech:', error.message);
      return this.getMockAudio(text, voice, language);
    }
  }

  // Generate speech using AutoContent API (optimized for podcasts)
  async generateWithAutoContent(text, voice, language, speed, quality) {
    try {
      console.log(`🎙️ Generating podcast-quality audio with AutoContent API...`);
      
      const response = await axios.post(
        `${this.autoContentBaseUrl}/tts/generate`,
        {
          text,
          voice: voice || 'podcast-narrator',
          language: language || 'en',
          speed: speed || 1.0,
          quality: quality || 'podcast', // 'podcast', 'standard', or 'premium'
          output_format: 'mp3',
          sample_rate: 44100, // High quality for podcasts
          bitrate: 192, // Good quality/size balance
          emotions: {
            enthusiasm: 0.3,
            clarity: 0.9,
            pace: 0.7
          },
          podcast_settings: {
            intro_pause: 1.0,
            outro_pause: 1.5,
            paragraph_pause: 0.8,
            sentence_pause: 0.4
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.autoContentApiKey}`,
            'Content-Type': 'application/json',
            'X-Request-Type': 'podcast-generation'
          },
          timeout: 120000 // 2 minutes timeout for long content
        }
      );

      // AutoContent API returns either direct audio data or a job ID for processing
      if (response.data.status === 'completed') {
        return {
          audioData: response.data.audio_data, // Base64 encoded audio
          audioUrl: response.data.audio_url,
          duration: response.data.duration,
          format: 'mp3',
          quality: quality,
          provider: 'autocontent',
          metadata: {
            voice_used: response.data.voice_info,
            processing_time: response.data.processing_time,
            word_count: text.split(' ').length,
            estimated_listen_time: response.data.duration
          }
        };
      } else if (response.data.job_id) {
        // For longer content, AutoContent may process asynchronously
        const jobId = response.data.job_id;
        this.ttsJobs.set(jobId, {
          status: 'processing',
          progress: 0,
          created_at: new Date(),
          text_length: text.length
        });

        return {
          audioData: null,
          audioUrl: null,
          duration: null,
          format: 'mp3',
          provider: 'autocontent',
          jobId: jobId,
          status: 'processing',
          message: 'Audio is being generated. Check status with job ID.'
        };
      }

      throw new Error('Unexpected response format from AutoContent API');
    } catch (error) {
      console.error('AutoContent API TTS error:', error.response?.data || error.message);
      throw error;
    }
  }

  // Generate speech using ElevenLabs
  async generateWithElevenLabs(text, voice, speed) {
    try {
      // Get voice ID (use a default voice if not specified)
      const voiceId = await this.getElevenLabsVoiceId(voice);

      const response = await axios.post(
        `${this.elevenLabsBaseUrl}/text-to-speech/${voiceId}`,
        {
          text,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
            style: 0.0,
            use_speaker_boost: true
          }
        },
        {
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': this.elevenLabsApiKey
          },
          responseType: 'arraybuffer'
        }
      );

      const audioBuffer = Buffer.from(response.data);
      const audioBase64 = audioBuffer.toString('base64');

      return {
        audioData: audioBase64,
        audioUrl: null, // ElevenLabs returns direct audio data
        duration: Math.floor(text.length / 10), // Rough estimate
        format: 'mp3',
        provider: 'elevenlabs'
      };
    } catch (error) {
      console.error('ElevenLabs TTS error:', error.message);
      throw error;
    }
  }

  // Generate speech using PlayHT
  async generateWithPlayHT(text, voice, language, speed) {
    try {
      // Create TTS job
      const jobResponse = await axios.post(
        `${this.playhtBaseUrl}/tts`,
        {
          text,
          voice: voice || 'en-US-JennyNeural',
          output_format: 'mp3',
          speed,
          sample_rate: 24000
        },
        {
          headers: {
            'Authorization': `Bearer ${this.playhtApiKey}`,
            'X-User-ID': this.playhtUserId,
            'Content-Type': 'application/json'
          }
        }
      );

      const jobId = jobResponse.data.id;
      
      // Poll for completion (simplified - in production, use webhooks)
      let attempts = 0;
      const maxAttempts = 30; // 30 seconds max wait
      
      while (attempts < maxAttempts) {
        const statusResponse = await axios.get(
          `${this.playhtBaseUrl}/tts/${jobId}`,
          {
            headers: {
              'Authorization': `Bearer ${this.playhtApiKey}`,
              'X-User-ID': this.playhtUserId
            }
          }
        );

        if (statusResponse.data.status === 'completed') {
          return {
            audioData: null,
            audioUrl: statusResponse.data.output.url,
            duration: statusResponse.data.output.duration,
            format: 'mp3',
            provider: 'playht',
            jobId
          };
        }

        if (statusResponse.data.status === 'failed') {
          throw new Error('TTS generation failed');
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        attempts++;
      }

      throw new Error('TTS generation timed out');
    } catch (error) {
      console.error('PlayHT TTS error:', error.message);
      throw error;
    }
  }

  // Get available voices
  async getAvailableVoices(language = null) {
    try {
      let voices = [];

      // Get AutoContent voices (podcast-optimized)
      if (this.autoContentApiKey) {
        const autoContentVoices = await this.getAutoContentVoices();
        voices = voices.concat(autoContentVoices);
      }

      // Get ElevenLabs voices
      if (this.elevenLabsApiKey) {
        const elevenLabsVoices = await this.getElevenLabsVoices();
        voices = voices.concat(elevenLabsVoices);
      }

      // Get PlayHT voices
      if (this.playhtApiKey) {
        const playhtVoices = await this.getPlayHTVoices();
        voices = voices.concat(playhtVoices);
      }

      // Filter by language if specified
      if (language) {
        voices = voices.filter(voice => 
          voice.language.toLowerCase().includes(language.toLowerCase())
        );
      }

      // Return mock voices if no API keys
      if (voices.length === 0) {
        return this.getMockVoices(language);
      }

      return voices;
    } catch (error) {
      console.error('Error getting voices:', error.message);
      return this.getMockVoices(language);
    }
  }

  // Get AutoContent voices (podcast-optimized)
  async getAutoContentVoices() {
    try {
      const response = await axios.get(`${this.autoContentBaseUrl}/voices`, {
        headers: {
          'Authorization': `Bearer ${this.autoContentApiKey}`
        }
      });

      // Return curated podcast voices from AutoContent
      return response.data.voices.map(voice => ({
        id: voice.id,
        name: voice.name,
        language: voice.language,
        gender: voice.gender,
        provider: 'autocontent',
        category: voice.category || 'podcast',
        quality: voice.quality || 'premium',
        description: voice.description,
        sample_url: voice.sample_url,
        tags: voice.tags || ['podcast', 'narrative']
      }));
    } catch (error) {
      console.error('Error getting AutoContent voices:', error);
      // Return default podcast voices if API call fails
      return [
        { 
          id: 'podcast-narrator-male', 
          name: 'Professional Male Narrator', 
          language: 'English (US)', 
          gender: 'male', 
          provider: 'autocontent',
          category: 'podcast',
          quality: 'premium',
          description: 'Deep, authoritative voice perfect for podcasts'
        },
        { 
          id: 'podcast-narrator-female', 
          name: 'Professional Female Narrator', 
          language: 'English (US)', 
          gender: 'female', 
          provider: 'autocontent',
          category: 'podcast',
          quality: 'premium',
          description: 'Clear, engaging voice ideal for storytelling'
        },
        { 
          id: 'podcast-conversational', 
          name: 'Conversational Host', 
          language: 'English (US)', 
          gender: 'neutral', 
          provider: 'autocontent',
          category: 'podcast',
          quality: 'premium',
          description: 'Natural, friendly tone for talk shows'
        }
      ];
    }
  }

  // Get ElevenLabs voices
  async getElevenLabsVoices() {
    try {
      const response = await axios.get(`${this.elevenLabsBaseUrl}/voices`, {
        headers: {
          'xi-api-key': this.elevenLabsApiKey
        }
      });

      return response.data.voices.map(voice => ({
        id: voice.voice_id,
        name: voice.name,
        language: 'English', // ElevenLabs is primarily English
        gender: voice.labels?.gender || 'unknown',
        provider: 'elevenlabs',
        preview_url: voice.preview_url
      }));
    } catch (error) {
      console.error('Error getting ElevenLabs voices:', error);
      return [];
    }
  }

  // Get PlayHT voices (simplified)
  async getPlayHTVoices() {
    // PlayHT has many voices - return a curated list
    return [
      { id: 'en-US-JennyNeural', name: 'Jenny', language: 'English (US)', gender: 'female', provider: 'playht' },
      { id: 'en-US-GuyNeural', name: 'Guy', language: 'English (US)', gender: 'male', provider: 'playht' },
      { id: 'en-GB-SoniaNeural', name: 'Sonia', language: 'English (UK)', gender: 'female', provider: 'playht' },
      { id: 'es-ES-ElviraNeural', name: 'Elvira', language: 'Spanish (Spain)', gender: 'female', provider: 'playht' },
      { id: 'fr-FR-DeniseNeural', name: 'Denise', language: 'French (France)', gender: 'female', provider: 'playht' }
    ];
  }

  // Get ElevenLabs voice ID by name
  async getElevenLabsVoiceId(voiceName) {
    // Default voice IDs - you should get these from the API
    const defaultVoices = {
      'default': '21m00Tcm4TlvDq8ikWAM', // Rachel
      'rachel': '21m00Tcm4TlvDq8ikWAM',
      'domi': 'AZnzlk1XvdvUeBnXmlld',
      'bella': 'EXAVITQu4vr4xnSDxMaL',
      'antoni': 'ErXwobaYiN019PkySvjV',
      'elli': 'MF3mGyEYCl7XYWbV9V6O'
    };

    return defaultVoices[voiceName.toLowerCase()] || defaultVoices.default;
  }

  // Check TTS generation status
  async checkTtsStatus(jobId) {
    try {
      // Check if it's a stored job
      if (this.ttsJobs.has(jobId)) {
        const storedJob = this.ttsJobs.get(jobId);
        
        // If it's an AutoContent job and still processing, check API
        if (storedJob.provider === 'autocontent' && storedJob.status === 'processing') {
          return await this.checkAutoContentStatus(jobId);
        }
        
        return storedJob;
      }

      // Try to check with AutoContent API first
      if (this.autoContentApiKey) {
        try {
          return await this.checkAutoContentStatus(jobId);
        } catch (autoContentError) {
          console.log('Not an AutoContent job, trying other services...');
        }
      }

      // Try to check with PlayHT
      if (this.playhtApiKey) {
        const response = await axios.get(
          `${this.playhtBaseUrl}/tts/${jobId}`,
          {
            headers: {
              'Authorization': `Bearer ${this.playhtApiKey}`,
              'X-User-ID': this.playhtUserId
            }
          }
        );

        const status = {
          status: response.data.status,
          progress: response.data.progress || 0,
          audioUrl: response.data.output?.url || null,
          error: response.data.error || null,
          provider: 'playht'
        };

        this.ttsJobs.set(jobId, status);
        return status;
      }

      // Return unknown status if no API available
      return {
        status: 'unknown',
        progress: 0,
        audioUrl: null,
        error: 'Unable to check status'
      };
    } catch (error) {
      console.error('Error checking TTS status:', error.message);
      return {
        status: 'failed',
        progress: 0,
        audioUrl: null,
        error: error.message
      };
    }
  }

  // Check AutoContent API job status
  async checkAutoContentStatus(jobId) {
    try {
      const response = await axios.get(
        `${this.autoContentBaseUrl}/tts/status/${jobId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.autoContentApiKey}`
          }
        }
      );

      const status = {
        status: response.data.status, // 'processing', 'completed', 'failed'
        progress: response.data.progress || 0,
        audioUrl: response.data.audio_url || null,
        audioData: response.data.audio_data || null,
        duration: response.data.duration || null,
        error: response.data.error || null,
        provider: 'autocontent',
        metadata: response.data.metadata || null,
        estimated_completion: response.data.estimated_completion,
        processing_time: response.data.processing_time
      };

      // Update stored job status
      this.ttsJobs.set(jobId, status);
      
      return status;
    } catch (error) {
      console.error('Error checking AutoContent status:', error.message);
      throw error;
    }
  }

  // Mock methods for testing
  getMockAudio(text, voice, language) {
    return {
      audioData: 'UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+Ln', // Mock base64 audio data
      audioUrl: null,
      duration: Math.floor(text.length / 10),
      format: 'wav',
      provider: 'mock'
    };
  }

  getMockVoices(language) {
    const allVoices = [
      { id: 'mock-1', name: 'Emma', language: 'English (US)', gender: 'female', provider: 'mock' },
      { id: 'mock-2', name: 'James', language: 'English (US)', gender: 'male', provider: 'mock' },
      { id: 'mock-3', name: 'Sofia', language: 'Spanish (Spain)', gender: 'female', provider: 'mock' },
      { id: 'mock-4', name: 'Marie', language: 'French (France)', gender: 'female', provider: 'mock' },
      { id: 'mock-5', name: 'Hans', language: 'German (Germany)', gender: 'male', provider: 'mock' }
    ];

    if (language) {
      return allVoices.filter(voice => 
        voice.language.toLowerCase().includes(language.toLowerCase())
      );
    }

    return allVoices;
  }
}

module.exports = new TTSService(); 