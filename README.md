# 🏜️ Rapidlu - Podcast Translation App

A beautiful mobile app for podcast translation with a stunning desert-themed UI inspired by Spotify's design language.

![Rapidlu Desert Theme](https://img.shields.io/badge/Theme-Desert%20Landscape-orange?style=for-the-badge)
![React Native](https://img.shields.io/badge/React%20Native-0.72-blue?style=for-the-badge)
![Expo](https://img.shields.io/badge/Expo-49.0-black?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge)

## ✨ Features

### 🎨 **Desert-Themed UI**
- Beautiful landing page with desert landscape
- Crescent moon and cacti illustrations
- Dark green color scheme (#12211a)
- Spotify-inspired design language

### 🔐 **Complete Authentication Flow**
- **Landing Page**: Desert-themed welcome screen
- **Sign Up**: Email registration with social options
- **Password Creation**: Secure password with real-time validation
- **Profile Setup**: User information collection
- **Login**: Email/username with password entry
- **Social Authentication**: Google, Facebook, Apple integration ready

### 🎧 **Podcast Features**
- Podcast discovery and search
- Translation services
- Text-to-speech functionality
- Audio playback controls

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)
- Expo Go app on your mobile device

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ryanmode/Rep2.git
   cd Rep2
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the backend server**
   ```bash
   cd ../backend
   node server.js
   ```
   Backend will run on `http://localhost:3000`

5. **Start the mobile app**
   ```bash
   cd ../frontend
   npx expo start
   ```

6. **View the app**
   - Scan QR code with Expo Go app
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser

## 📱 App Screens

### 🏜️ Landing Screen
- **Desert Landscape**: Beautiful illustrated scene with moon and cacti
- **Rapidlu Logo**: Green play button with brand name
- **Action Buttons**: Continue with Google, Sign Up, Log In
- **Privacy Footer**: Terms and privacy policy links

### 🔐 Authentication Screens
- **Sign Up**: Email input with social login options
- **Create Password**: Step 1/3 with password requirements validation
- **Profile Setup**: Step 2/3 with name, date of birth, and gender selection
- **Login**: Social options + email/username input
- **Password Login**: Password entry with remember me option

### 🏠 Main App
- **Home**: Podcast discovery and management
- **Search**: Find podcasts and content
- **Translation**: Language conversion services
- **Settings**: User preferences and account management

## 🎨 Design System

### Color Palette
- **Primary Background**: `#12211a` (Dark Green)
- **Secondary Background**: `#000000` (Pure Black)
- **Accent Color**: `#399d64` (Rapidlu Green)
- **Text Primary**: `#ffffff` (White)
- **Text Secondary**: `#a7a7a7` (Light Gray)
- **Text Muted**: `#727272` (Medium Gray)

### Typography
- **Primary Font**: Space Grotesk
- **Weights**: Regular (400), Bold (700)
- **Logo**: 32px Bold
- **Headings**: 24px Bold
- **Body**: 16px Regular
- **Caption**: 14px Regular

## 🏗️ Project Structure

```
Rapidlu/
├── backend/                 # Node.js API Server
│   ├── controllers/         # Request handlers
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── package.json        # Backend dependencies
│   └── server.js           # Main server file
├── frontend/               # React Native Mobile App
│   ├── assets/             # Images and static files
│   ├── components/         # Reusable UI components
│   ├── screens/            # App screens
│   │   ├── LandingScreen.js       # Desert-themed welcome
│   │   ├── LoginScreen.js         # Login flow
│   │   ├── SignUpScreen.js        # Registration
│   │   ├── CreatePasswordScreen.js # Password creation
│   │   ├── ProfileSetupScreen.js  # User profile
│   │   ├── PasswordLoginScreen.js # Password entry
│   │   ├── HomeScreen.js         # Main dashboard
│   │   ├── SearchScreen.js       # Podcast search
│   │   ├── TranslationScreen.js  # Translation UI
│   │   └── SettingsScreen.js     # User settings
│   ├── App.js              # Main app component
│   ├── package.json        # Frontend dependencies
│   └── index.js            # App entry point
├── README.md               # This file
├── SETUP_GUIDE.md         # Detailed setup instructions
└── AUTOCONTENT_*.md       # Additional documentation
```

## 🔧 Technical Stack

### Frontend (Mobile App)
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and deployment
- **React Navigation**: Screen navigation and routing
- **Expo Linear Gradient**: Beautiful gradient effects
- **Expo Vector Icons**: Icon library
- **React Native Elements**: UI component library

### Backend (API Server)
- **Node.js**: Server runtime
- **Express.js**: Web framework
- **Podcast Services**: Content management
- **Translation Services**: Language processing
- **Text-to-Speech**: Audio generation

## 🌐 API Endpoints

### Backend Server (`http://localhost:3000`)
- `GET /health` - Health check
- `GET /api` - API base URL
- `POST /api/podcast` - Podcast operations
- `POST /api/translation` - Translation services
- `POST /api/tts` - Text-to-speech generation

## 🎯 Development

### Running in Development
1. Start backend: `cd backend && node server.js`
2. Start frontend: `cd frontend && npx expo start`
3. Use Expo Go app to test on device

### Building for Production
1. **iOS**: `npx expo build:ios`
2. **Android**: `npx expo build:android`
3. **Web**: `npx expo build:web`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎨 Design Credits

- **UI Design**: Inspired by Spotify's design language
- **Desert Theme**: Custom illustrated landscape
- **Color Palette**: Dark green aesthetic with modern accents

## 📞 Support

For support and questions:
- Create an issue in this repository
- Check the documentation in `/docs`
- Review the setup guide in `SETUP_GUIDE.md`

---

**Built with ❤️ using React Native and Expo**

*Rapidlu - Translate podcasts, discover content, enjoy the journey* 🏜️🎧 