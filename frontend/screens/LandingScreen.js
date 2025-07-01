// Landing Screen - Desert themed welcome page based on Figma design
// Entry point for Rapidlu app with beautiful desert landscape

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function LandingScreen({ navigation }) {
  const handleGoogleSignIn = () => {
    Alert.alert('Google Sign In', 'Google authentication will be implemented');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleLogIn = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        {/* Desert Landscape Section */}
        <View style={styles.landscapeContainer}>
          <View style={styles.desertScene}>
            {/* Desert Background */}
            <View style={styles.desertBackground}>
              {/* Sky with moon */}
              <LinearGradient 
                colors={['#1a3d1f', '#2d4a32']}
                style={styles.sky}
              >
                <View style={styles.moon}>
                  <Text style={styles.moonSymbol}>🌙</Text>
                </View>
              </LinearGradient>
              
              {/* Desert floor with cacti */}
              <View style={styles.desertFloor}>
                <View style={styles.cactus1}>
                  <Text style={styles.cactusSymbol}>🌵</Text>
                </View>
                <View style={styles.cactus2}>
                  <Text style={styles.cactusSymbol}>🌵</Text>
                </View>
                <View style={styles.cactus3}>
                  <Text style={styles.cactusSymbol}>🌵</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <View style={styles.playButton}>
                <Ionicons name="play" size={32} color="white" />
              </View>
            </View>
            <Text style={styles.logoText}>Rapidlu</Text>
          </View>
        </View>

        {/* Action Buttons Section */}
        <View style={styles.buttonsSection}>
          {/* Google Sign In Button */}
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
            <View style={styles.googleIcon}>
              <Text style={styles.googleIconText}>G</Text>
            </View>
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>sign up</Text>
          </TouchableOpacity>

          {/* Log In Button */}
          <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By continuing, you agree to our{' '}
          <Text style={styles.footerLink}>Privacy Policy</Text> &{' '}
          <Text style={styles.footerLink}>Terms of Service</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12211a',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  landscapeContainer: {
    height: 400,
    width: '100%',
  },
  desertScene: {
    flex: 1,
    position: 'relative',
  },
  desertBackground: {
    flex: 1,
    backgroundColor: '#2d4a32',
    position: 'relative',
  },
  sky: {
    height: '60%',
    position: 'relative',
  },
  moon: {
    position: 'absolute',
    top: 40,
    right: 60,
  },
  moonSymbol: {
    fontSize: 32,
    color: '#ffd700',
  },
  desertFloor: {
    height: '40%',
    backgroundColor: '#8B4513',
    position: 'relative',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cactus1: {
    position: 'absolute',
    left: 40,
    top: -20,
  },
  cactus2: {
    position: 'absolute',
    right: 80,
    top: -30,
  },
  cactus3: {
    position: 'absolute',
    left: '50%',
    top: -15,
    marginLeft: -10,
  },
  cactusSymbol: {
    fontSize: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  logoSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 17,
    backgroundColor: '#399d64',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  playButton: {
    marginLeft: 4, // Slight offset to center the play button visually
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Space Grotesk',
  },
  buttonsSection: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  googleButton: {
    backgroundColor: '#040c06',
    borderRadius: 12,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  googleIcon: {
    position: 'absolute',
    left: 20,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIconText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4285f4',
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Space Grotesk',
  },
  signUpButton: {
    backgroundColor: '#399d64',
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Space Grotesk',
  },
  logInButton: {
    backgroundColor: '#399d64',
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  logInButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Space Grotesk',
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#9f9f9f',
    textAlign: 'center',
    lineHeight: 21,
    fontFamily: 'Space Grotesk',
  },
  footerLink: {
    color: '#9f9f9f',
    textDecorationLine: 'underline',
  },
}); 