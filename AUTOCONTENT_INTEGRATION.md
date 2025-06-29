# AutoContent API Integration Guide

## Overview
This guide covers the complete integration of AutoContent API for high-quality podcast audio generation in the Rapidlu app.

## Features
- Professional podcast-quality audio generation
- Emotion and pacing controls
- Async job processing for long content
- Multiple voice options
- High-quality output formats

## API Configuration

### Environment Variables
```bash
AUTOCONTENT_API_KEY=your_autocontent_api_key_here
AUTOCONTENT_BASE_URL=https://api.autocontent.ai/v1
```

## Implementation Details

### TTS Service Integration
The `ttsService.js` includes:
- `generateWithAutoContent()` - Main generation method
- `getAutoContentVoices()` - Available voices
- `checkAutoContentStatus()` - Job status tracking
- Podcast-optimized settings

### API Endpoints
- `POST /api/tts/podcast` - Generate podcast audio
- `GET /api/tts/voices/podcast` - Get podcast voices
- `GET /api/tts/status/:jobId` - Check generation status

### Frontend Integration
The `TranslationScreen.js` includes:
- `generatePodcastAudio()` method
- Progress tracking UI
- Quality feedback display

## Usage Example
```javascript
const response = await ApiService.generatePodcastAudio(text, {
  voice: 'podcast-narrator-female',
  language: 'en',
  quality: 'podcast'
});
```

## Testing
Use the translation screen to test audio generation with mock data when API keys aren't available. 