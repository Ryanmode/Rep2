// Main App component for Rapidlu
// Sets up navigation and main app structure

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import PodcastDetailScreen from './screens/PodcastDetailScreen';
import TranslationScreen from './screens/TranslationScreen';
import SettingsScreen from './screens/SettingsScreen';

// Import authentication screens
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import CreatePasswordScreen from './screens/CreatePasswordScreen';
import ProfileSetupScreen from './screens/ProfileSetupScreen';
import PasswordLoginScreen from './screens/PasswordLoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for podcast-related screens
function PodcastStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6366f1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Rapidlu' }}
      />
      <Stack.Screen 
        name="PodcastDetail" 
        component={PodcastDetailScreen}
        options={{ title: 'Podcast Details' }}
      />
      <Stack.Screen 
        name="Translation" 
        component={TranslationScreen}
        options={{ title: 'Translation & Audio' }}
      />
    </Stack.Navigator>
  );
}

// Main tab navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'PodcastStack') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopColor: '#333333',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="PodcastStack" 
        component={PodcastStack}
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen}
        options={{ title: 'Search' }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
}

// Root stack navigator for authentication and main app
function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Authentication Flow */}
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="CreatePassword" component={CreatePasswordScreen} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      <Stack.Screen name="PasswordLogin" component={PasswordLoginScreen} />
      
      {/* Main App */}
      <Stack.Screen name="MainApp" component={MainTabs} />
    </Stack.Navigator>
  );
}

// Main App component
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#12211a" />
      <RootStack />
    </NavigationContainer>
  );
} 