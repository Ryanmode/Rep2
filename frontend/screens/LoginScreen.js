// Login Screen - Similar to Spotify's design
// Allows users to log in to access podcast translation features

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [emailOrUsername, setEmailOrUsername] = useState('');

  const handleSocialLogin = (provider) => {
    Alert.alert('Social Login', `Login with ${provider} will be implemented`);
  };

  const handleContinue = () => {
    if (!emailOrUsername.trim()) {
      Alert.alert('Error', 'Please enter your email or username');
      return;
    }
    // Navigate to password screen for complete login flow
    navigation.navigate('PasswordLogin', { emailOrUsername });
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Spotify-style Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <View style={styles.logoLine1} />
            <View style={styles.logoLine2} />
            <View style={styles.logoLine3} />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Log in to Rapidlu</Text>

        {/* Social Login Buttons */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handleSocialLogin('Google')}
        >
          <View style={styles.socialIconContainer}>
            <Text style={styles.googleIcon}>G</Text>
          </View>
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handleSocialLogin('Facebook')}
        >
          <View style={[styles.socialIconContainer, styles.facebookIcon]}>
            <Text style={styles.facebookText}>f</Text>
          </View>
          <Text style={styles.socialButtonText}>Continue with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handleSocialLogin('Apple')}
        >
          <View style={styles.socialIconContainer}>
            <Ionicons name="logo-apple" size={18} color="white" />
          </View>
          <Text style={styles.socialButtonText}>Continue with Apple</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
        </View>

        {/* Email/Username Input */}
        <Text style={styles.inputLabel}>Email or username</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email or username"
          placeholderTextColor="#727272"
          value={emailOrUsername}
          onChangeText={setEmailOrUsername}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpLink}>Sign up for Rapidlu.</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          This site is protected by reCAPTCHA and the Google{' '}
          <Text style={styles.footerLink}>Privacy Policy</Text> and{' '}
          <Text style={styles.footerLink}>Terms of Service</Text> apply.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoCircle: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logoLine1: {
    position: 'absolute',
    top: 12,
    left: 8,
    right: 8,
    height: 3,
    backgroundColor: 'black',
    borderRadius: 2,
  },
  logoLine2: {
    position: 'absolute',
    top: 20,
    left: 8,
    right: 12,
    height: 3,
    backgroundColor: 'black',
    borderRadius: 2,
  },
  logoLine3: {
    position: 'absolute',
    top: 28,
    left: 8,
    right: 8,
    height: 3,
    backgroundColor: 'black',
    borderRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#727272',
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginBottom: 12,
    position: 'relative',
  },
  socialIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 20,
  },
  facebookIcon: {
    backgroundColor: '#1877f2',
  },
  googleIcon: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4285f4',
  },
  facebookText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  socialButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  dividerContainer: {
    marginVertical: 32,
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#727272',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#727272',
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: 'white',
    marginBottom: 24,
  },
  continueButton: {
    backgroundColor: '#1ed760',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 0.5,
  },
  signUpContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  signUpText: {
    fontSize: 16,
    color: '#727272',
    marginBottom: 8,
  },
  signUpLink: {
    fontSize: 16,
    color: 'white',
    textDecorationLine: 'underline',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 11,
    color: '#727272',
    textAlign: 'center',
    lineHeight: 16,
  },
  footerLink: {
    textDecorationLine: 'underline',
  },
}); 