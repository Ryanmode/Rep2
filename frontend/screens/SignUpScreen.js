// Sign Up Screen - Similar to Spotify's design
// Initial sign up screen for podcast translation app

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

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleSocialSignUp = (provider) => {
    Alert.alert('Social Sign Up', `Sign up with ${provider} will be implemented`);
  };

  const handleNext = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    
    // Navigate to password creation
    navigation.navigate('CreatePassword', { email });
  };

  const handleLogin = () => {
    navigation.navigate('Login');
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
        <Text style={styles.title}>Sign up to{'\n'}start listening</Text>

        {/* Email Input */}
        <Text style={styles.inputLabel}>Email address</Text>
        <TextInput
          style={styles.textInput}
          placeholder="name@domain.com"
          placeholderTextColor="#727272"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Sign Up Buttons */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handleSocialSignUp('Google')}
        >
          <View style={styles.socialIconContainer}>
            <Text style={styles.googleIcon}>G</Text>
          </View>
          <Text style={styles.socialButtonText}>Sign up with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handleSocialSignUp('Apple')}
        >
          <View style={styles.socialIconContainer}>
            <Ionicons name="logo-apple" size={18} color="white" />
          </View>
          <Text style={styles.socialButtonText}>Sign up with Apple</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginLink}>Log in here.</Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 36,
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
  nextButton: {
    backgroundColor: '#1ed760',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 0.5,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#727272',
  },
  dividerText: {
    fontSize: 14,
    color: 'white',
    marginHorizontal: 16,
    fontWeight: '500',
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
  googleIcon: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4285f4',
  },
  socialButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    flexWrap: 'wrap',
  },
  loginText: {
    fontSize: 16,
    color: '#727272',
  },
  loginLink: {
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