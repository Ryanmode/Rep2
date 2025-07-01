// Create Password Screen - Similar to Spotify's design
// Step 1 of 3 in the sign up process

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

export default function CreatePasswordScreen({ route, navigation }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { email } = route.params || {};

  // Password validation checks
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumberOrSpecial = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasMinLength = password.length >= 10;

  const isPasswordValid = hasLetter && hasNumberOrSpecial && hasMinLength;

  const handleNext = () => {
    if (!password.trim()) {
      Alert.alert('Error', 'Please create a password');
      return;
    }
    
    if (!isPasswordValid) {
      Alert.alert('Error', 'Password must meet all requirements');
      return;
    }
    
    // Navigate to profile setup
    navigation.navigate('ProfileSetup', { email, password });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button and progress */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '33%' }]} />
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {/* Step indicator */}
        <Text style={styles.stepText}>Step 1 of 3</Text>
        <Text style={styles.title}>Create a password</Text>

        {/* Password Input */}
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder=""
            placeholderTextColor="#727272"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
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

        {/* Password Requirements */}
        <Text style={styles.requirementsTitle}>Your password must contain at least</Text>
        
        <View style={styles.requirementsList}>
          <View style={styles.requirementItem}>
            <View style={[
              styles.requirementIndicator, 
              hasLetter ? styles.requirementMet : styles.requirementNotMet
            ]} />
            <Text style={[
              styles.requirementText,
              hasLetter ? styles.requirementMetText : styles.requirementNotMetText
            ]}>
              1 letter
            </Text>
          </View>

          <View style={styles.requirementItem}>
            <View style={[
              styles.requirementIndicator, 
              hasNumberOrSpecial ? styles.requirementMet : styles.requirementNotMet
            ]} />
            <Text style={[
              styles.requirementText,
              hasNumberOrSpecial ? styles.requirementMetText : styles.requirementNotMetText
            ]}>
              1 number or special character (example: # ? ! &)
            </Text>
          </View>

          <View style={styles.requirementItem}>
            <View style={[
              styles.requirementIndicator, 
              hasMinLength ? styles.requirementMet : styles.requirementNotMet
            ]} />
            <Text style={[
              styles.requirementText,
              hasMinLength ? styles.requirementMetText : styles.requirementNotMetText
            ]}>
              10 characters
            </Text>
          </View>
        </View>

        {/* Next Button */}
        <TouchableOpacity 
          style={[styles.nextButton, isPasswordValid ? styles.nextButtonEnabled : styles.nextButtonDisabled]} 
          onPress={handleNext}
          disabled={!isPasswordValid}
        >
          <Text style={styles.nextButtonText}>Next</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  progressContainer: {
    flex: 1,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#404040',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1ed760',
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  stepText: {
    fontSize: 14,
    color: '#a7a7a7',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
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
  requirementsTitle: {
    fontSize: 14,
    color: 'white',
    marginBottom: 16,
  },
  requirementsList: {
    marginBottom: 40,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  requirementIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  requirementMet: {
    backgroundColor: '#1ed760',
  },
  requirementNotMet: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#727272',
  },
  requirementText: {
    fontSize: 14,
    flex: 1,
  },
  requirementMetText: {
    color: 'white',
  },
  requirementNotMetText: {
    color: '#a7a7a7',
  },
  nextButton: {
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonEnabled: {
    backgroundColor: '#1ed760',
  },
  nextButtonDisabled: {
    backgroundColor: '#404040',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 0.5,
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