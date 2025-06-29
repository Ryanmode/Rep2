# Rapidlu Setup Guide

**Complete step-by-step guide to set up and run your Rapidlu podcast translation app**

## 📋 Prerequisites

Before you start, make sure you have these installed:

1. **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
2. **npm** or **yarn** package manager (comes with Node.js)
3. **Expo CLI** for React Native development
4. **Git** for version control

## 🛠️ Installation Steps

### Step 1: Install Expo CLI (if not already installed)
```bash
npm install -g expo-cli
```

### Step 2: Set Up Backend

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Copy the environment template
   cp env-template.txt .env
   
   # Edit .env file with your API keys
   nano .env  # or use any text editor
   ```

4. **Add your API keys to `.env`:**
   ```env
   # Required for full functionality
   OPENAI_API_KEY=your_openai_api_key_here
   ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
   LISTEN_NOTES_API_KEY=your_listen_notes_api_key_here
   
   # Optional TTS alternative
   PLAYHT_API_KEY=your_playht_api_key_here
   PLAYHT_USER_ID=your_playht_user_id_here
   ```

5. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   🚀 Rapidlu backend server running on port 3000
   📋 Health check: http://localhost:3000/health
   🌐 API base URL: http://localhost:3000/api
   ```

### Step 3: Set Up Frontend

1. **Open a new terminal and navigate to frontend:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Expo development server:**
   ```bash
   npm start
   ```

4. **Run the app:**
   - **For iOS Simulator:** Press `i` in terminal or click "Run on iOS simulator"
   - **For Android Emulator:** Press `a` in terminal or click "Run on Android device/emulator"
   - **For Physical Device:** Install Expo Go app and scan the QR code

## 🔑 Getting API Keys

### OpenAI API Key (Required for translation)
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up/login and go to API Keys section
3. Create a new API key
4. Add billing information (required for API usage)

### AutoContent API Key (For podcast-quality TTS) ⭐ RECOMMENDED
1. Go to [AutoContent API](https://autocontent.ai/)
2. Sign up for an account  
3. Get your API key from the dashboard
4. Copy the key to your `.env` file
5. Perfect for creating professional podcast audio!

### ElevenLabs API Key (Alternative TTS)
1. Go to [ElevenLabs](https://elevenlabs.io/)
2. Sign up for an account
3. Go to your profile and find "API Key"
4. Copy the key to your `.env` file

### Listen Notes API Key (For real podcast data)
1. Go to [Listen Notes API](https://listennotes.com/api/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Free tier includes 10,000 requests/month

## 🚀 Testing the App

### Test Backend (Important!)
1. Visit: [http://localhost:3000/health](http://localhost:3000/health)
2. You should see a JSON response with status "OK"

### Test API Endpoints
```bash
# Test podcast search
curl "http://localhost:3000/api/podcasts/search?q=technology"

# Test translation languages
curl "http://localhost:3000/api/translation/languages"

# Test TTS voices
curl "http://localhost:3000/api/tts/voices"
```

### Test Frontend
1. Open the app on your device/simulator
2. Try searching for podcasts
3. Test the translation feature
4. Check the settings screen

## 📱 App Features

✅ **Currently Working:**
- Podcast search (with mock data if no API keys)
- Text summarization and translation (with OpenAI)
- **Professional podcast audio generation** (with AutoContent API) 🎙️
- High-quality text-to-speech with multiple providers
- Beautiful, responsive UI
- Settings and language preferences

🚧 **Can Be Extended:**
- Real podcast episode playback
- Offline storage
- User accounts
- Favorite podcasts
- Episode downloading

## 🔧 Troubleshooting

### Backend Issues
- **Port 3000 already in use:** Change PORT in `.env` file
- **API errors:** Check your API keys in `.env` file
- **Module not found:** Run `npm install` in backend directory

### Frontend Issues
- **Metro bundler errors:** Clear cache with `npx expo start -c`
- **Module resolution errors:** Delete `node_modules` and run `npm install`
- **iOS build issues:** Make sure Xcode is installed and updated

### API Issues
- **No podcasts found:** App works with mock data even without API keys
- **Translation not working:** Verify OpenAI API key and billing setup
- **TTS not working:** Check ElevenLabs API key or use mock audio

## 📂 Project Structure

```
Rapidlu/
├── README.md                  # Project overview
├── SETUP_GUIDE.md            # This setup guide
├── backend/                  # Node.js/Express API server
│   ├── .env                 # Environment variables (you create this)
│   ├── env-template.txt     # Template for environment variables
│   ├── package.json         # Backend dependencies
│   ├── server.js           # Main server file
│   ├── routes/             # API route definitions
│   ├── controllers/        # Request handling logic
│   └── services/           # External API integrations
└── frontend/               # React Native mobile app
    ├── App.js             # Main app component
    ├── package.json       # Frontend dependencies
    ├── components/        # Reusable components
    ├── screens/          # App screens
    └── assets/          # Images, fonts, etc.
```

## 🎯 Next Steps

1. **Get API Keys:** Start with OpenAI for core functionality
2. **Test Everything:** Make sure both backend and frontend work
3. **Customize UI:** Modify colors, fonts, and styling
4. **Add Features:** Extend with more podcast functionality
5. **Deploy:** Use services like Heroku (backend) and Expo (frontend)

## 💡 Tips for Beginners

1. **Start Simple:** The app works with mock data, so you can see it working immediately
2. **One Step at a Time:** Set up backend first, then frontend
3. **Check Logs:** Look at terminal output for error messages
4. **Use Mock Data:** The app is designed to work even without API keys for testing
5. **Ask for Help:** If you get stuck, the error messages usually tell you what's wrong

## 🆘 Need Help?

If you encounter issues:
1. Check the terminal output for error messages
2. Verify all dependencies are installed
3. Make sure API keys are correctly added to `.env`
4. Try restarting both backend and frontend servers
5. Check the troubleshooting section above

**Happy coding! 🎉** 