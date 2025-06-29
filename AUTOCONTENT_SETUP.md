# AutoContent API Setup for Rapidlu

**Quick setup guide for generating professional podcast audio with AutoContent API**

## 🎯 Quick Start

### 1. Get AutoContent API Key
1. Sign up at [AutoContent API](https://autocontent.ai)
2. Get your API key from the dashboard
3. Note your base URL (usually `https://api.autocontent.ai/v1`)

### 2. Add to Environment
In your `backend/.env` file:
```env
# AutoContent API (for podcast-quality TTS)  
AUTOCONTENT_API_KEY=your_actual_api_key_here
AUTOCONTENT_BASE_URL=https://api.autocontent.ai/v1
```

### 3. Test the Integration
```bash
# Start backend
cd backend && npm run dev

# Test podcast generation
curl -X POST http://localhost:3000/api/tts/podcast \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Welcome to this AI-generated podcast episode about technology and innovation.",
    "voice": "podcast-narrator-male",
    "title": "Test Podcast Episode"
  }'
```

## 🎙️ New Podcast Features

### Enhanced API Endpoints
- **`POST /api/tts/podcast`** - Generate podcast-quality audio
- **`GET /api/tts/voices/podcast`** - Get podcast-optimized voices

### In Your Mobile App
The Translation Screen now generates professional podcast audio:
- High-quality MP3 output (192kbps, 44.1kHz)
- Podcast-optimized pacing and pauses
- Professional narrator voices
- Detailed generation metadata

### Example Usage
```javascript
// Generate podcast from translated content
const podcast = await ApiService.generatePodcastAudio(translatedText, {
  voice: 'podcast-narrator-female',
  quality: 'podcast',
  title: 'Translated Podcast Episode',
  description: 'AI-generated podcast content'
});

// Response includes:
// - High-quality audio URL/data
// - Episode metadata (duration, word count)
// - Voice and generation details
```

## 🚀 What's New in Rapidlu

✅ **AutoContent API Priority**: Used first for highest quality  
✅ **Podcast-Specific Endpoints**: Optimized for long-form content  
✅ **Professional Voices**: Broadcast-quality narrators  
✅ **Enhanced UI**: Better feedback and loading states  
✅ **Detailed Metadata**: Generation stats and audio info  

## 🔧 Fallback System

Rapidlu intelligently chooses the best TTS service:
1. **AutoContent API** (if available) - Best for podcasts
2. **ElevenLabs** (fallback) - Good general TTS
3. **PlayHT** (fallback) - Alternative TTS service
4. **Mock Audio** (testing) - For development without API keys

Your app works even if AutoContent API is unavailable!

## 📱 Try It Now

1. **Start the app**: `cd frontend && npm start`
2. **Go to Translation Screen**: Translate any text
3. **Click "Generate Podcast Audio"**: Creates professional audio
4. **Check the results**: Get detailed generation information

The integration is complete and ready to create professional podcast content! 🎉 