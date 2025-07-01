// Password Login Screen - Similar to Spotify's design
// Password entry screen after user provides email/username

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

export default function PasswordLoginScreen({ route, navigation }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const { emailOrUsername } = route.params || {};

  const handleLogin = () => {
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }
    
    // For demo purposes, navigate directly to main app
    // In production, you would validate credentials first
    Alert.alert(
      'Login Successful',
      'Welcome back to Rapidlu!',
      [
        {
          text: 'Continue',
          onPress: () => navigation.navigate('MainApp')
        }
      ]
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset functionality will be implemented');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

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
        <Text style={styles.title}>Password</Text>

        {/* Email Display */}
        <View style={styles.emailContainer}>
          <Text style={styles.emailText}>{emailOrUsername}</Text>
        </View>

        {/* Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#727272"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
          />
          <TouchableOpacity
            style={styles.showPasswordButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons 
              name={showPassword ? "eye-off" : "eye"} 
              size={20} 
              color="#727272" 
            />
          </TouchableOpacity>
        </View>

        {/* Remember Me */}
        <TouchableOpacity 
          style={styles.rememberMeContainer}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View style={[styles.checkbox, rememberMe && styles.checkboxSelected]}>
            {rememberMe && <Ionicons name="checkmark" size={16} color="black" />}
          </View>
          <Text style={styles.rememberMeText}>Remember me</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        {/* Forgot Password Link */}
        <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>
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
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
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
    marginBottom: 32,
  },
  emailContainer: {
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#727272',
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  emailText: {
    fontSize: 16,
    color: '#a7a7a7',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#727272',
    borderRadius: 4,
    marginBottom: 24,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: 'white',
  },
  showPasswordButton: {
    padding: 16,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#727272',
    borderRadius: 3,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#1ed760',
    borderColor: '#1ed760',
  },
  rememberMeText: {
    fontSize: 14,
    color: 'white',
  },
  loginButton: {
    backgroundColor: '#1ed760',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 0.5,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
  },
  forgotPasswordText: {
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