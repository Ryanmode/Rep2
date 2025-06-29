# Rapidlu - Podcast Translation App

**Rapidlu** is a mobile-first app that allows users to listen to English-language podcasts in their own language. The app fetches podcast transcripts, summarizes them using AI, translates them into the user's selected language, and optionally converts the result into audio.

## Project Structure

```
Rapidlu/
├── README.md                 # This file - project overview
├── frontend/                 # Mobile app (React Native)
│   ├── package.json         # Frontend dependencies
│   ├── App.js              # Main app component
│   ├── components/         # Reusable UI components
│   ├── screens/           # App screens (Home, Settings, etc.)
│   └── assets/           # Images, fonts, and other static files
└── backend/              # Server-side API (Node.js/Express)
    ├── package.json     # Backend dependencies
    ├── server.js       # Main server file
    ├── .env.example   # Template for environment variables
    ├── routes/        # API endpoint definitions
    ├── controllers/   # Business logic for API endpoints
    └── services/      # External API integrations (OpenAI, TTS, etc.)
```

## What Each Folder Does

### 📱 Frontend (`/frontend`)
- **`components/`**: Reusable UI pieces like buttons, headers, audio players
- **`screens/`**: Full app screens like Home, Podcast List, Settings
- **`assets/`**: Images, icons, fonts, and other static files
- **`App.js`**: The main component that ties everything together

### 🔧 Backend (`/backend`)
- **`routes/`**: Defines API endpoints (like `/api/podcasts`, `/api/translate`)
- **`controllers/`**: Contains the logic for what happens when APIs are called
- **`services/`**: Handles connections to external services (OpenAI, TTS APIs, etc.)
- **`server.js`**: Starts the server and connects all the pieces

## APIs Used
- **Podcast Transcripts**: Fetches podcast episode transcripts
- **OpenAI**: Summarizes and translates content
- **Text-to-Speech**: Converts translated text to audio (ElevenLabs/PlayHT)

## Getting Started

1. **Install Dependencies**
   ```bash
   # Install backend dependencies
   cd backend && npm install
   
   # Install frontend dependencies
   cd ../frontend && npm install
   ```

2. **Set Up Environment Variables**
   ```bash
   cd backend
   cp env-template.txt .env
   # Edit .env with your API keys
   ```

3. **Start the Development Servers**
   ```bash
   # Start backend (in backend folder)
   npm run dev
   
   # Start frontend (in frontend folder)
   npm start
   ```

**📚 Detailed Setup:** See `SETUP_GUIDE.md` for complete instructions  
**🎙️ Podcast Audio:** See `AUTOCONTENT_SETUP.md` for AutoContent API integration

## Next Steps
- Add your API keys to the `.env` file
- Customize the UI components
- Test the API integrations
- Deploy when ready!

---
*This is a beginner-friendly setup. Each file has comments explaining what it does.* 