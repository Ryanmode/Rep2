// Profile Setup Screen - Similar to Spotify's design
// Step 2 of 3 in the sign up process - Tell us about yourself

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

export default function ProfileSetupScreen({ route, navigation }) {
  const [name, setName] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [gender, setGender] = useState('');
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const { email, password } = route.params || {};

  const months = [
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];

  const isFormValid = name.trim() && birthMonth && birthDay && birthYear && gender;

  const handleNext = () => {
    if (!isFormValid) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    // Validate age (must be 13 or older)
    const currentYear = new Date().getFullYear();
    const age = currentYear - parseInt(birthYear);
    if (age < 13) {
      Alert.alert('Error', 'You must be at least 13 years old to use Rapidlu');
      return;
    }
    
    // Navigate to main app or final step
    Alert.alert(
      'Welcome to Rapidlu!',
      'Your account has been created successfully. Start translating podcasts!',
      [
        {
          text: 'Get Started',
          onPress: () => navigation.navigate('MainApp')
        }
      ]
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const getMonthName = (value) => {
    const month = months.find(m => m.value === value);
    return month ? month.label : 'Month';
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
            <View style={[styles.progressFill, { width: '66%' }]} />
          </View>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Step indicator */}
        <Text style={styles.stepText}>Step 2 of 3</Text>
        <Text style={styles.title}>Tell us about yourself</Text>

        {/* Name Field */}
        <Text style={styles.inputLabel}>Name</Text>
        <Text style={styles.inputSubtitle}>This name will appear on your profile</Text>
        <TextInput
          style={styles.textInput}
          placeholder=""
          placeholderTextColor="#727272"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoCorrect={false}
        />

        {/* Date of Birth */}
        <Text style={styles.inputLabel}>Date of birth</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.inputSubtitle}>Why do we need your date of birth? </Text>
          <TouchableOpacity>
            <Text style={styles.learnMoreLink}>Learn more.</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dateContainer}>
          {/* Month Picker */}
          <TouchableOpacity 
            style={styles.monthPicker}
            onPress={() => setShowMonthPicker(!showMonthPicker)}
          >
            <Text style={[styles.pickerText, !birthMonth && styles.placeholderText]}>
              {birthMonth ? getMonthName(birthMonth) : 'Month'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#727272" />
          </TouchableOpacity>

          {/* Day Input */}
          <TextInput
            style={styles.dayInput}
            placeholder="dd"
            placeholderTextColor="#727272"
            value={birthDay}
            onChangeText={(text) => {
              if (text === '' || (parseInt(text) >= 1 && parseInt(text) <= 31)) {
                setBirthDay(text);
              }
            }}
            keyboardType="numeric"
            maxLength={2}
          />

          {/* Year Input */}
          <TextInput
            style={styles.yearInput}
            placeholder="yyyy"
            placeholderTextColor="#727272"
            value={birthYear}
            onChangeText={(text) => {
              if (text === '' || (parseInt(text) >= 1900 && parseInt(text) <= new Date().getFullYear())) {
                setBirthYear(text);
              }
            }}
            keyboardType="numeric"
            maxLength={4}
          />
        </View>

        {/* Month Picker Modal */}
        {showMonthPicker && (
          <View style={styles.pickerModal}>
            <Picker
              selectedValue={birthMonth}
              onValueChange={(value) => {
                setBirthMonth(value);
                setShowMonthPicker(false);
              }}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Select Month" value="" />
              {months.map((month) => (
                <Picker.Item key={month.value} label={month.label} value={month.value} />
              ))}
            </Picker>
          </View>
        )}

        {/* Gender Selection */}
        <Text style={styles.inputLabel}>Gender</Text>
        <Text style={styles.inputSubtitle}>
          We use your gender to help personalize our content recommendations and ads for you.
        </Text>

        <View style={styles.genderContainer}>
          <TouchableOpacity 
            style={styles.genderOption}
            onPress={() => setGender('man')}
          >
            <View style={[styles.radioButton, gender === 'man' && styles.radioSelected]} />
            <Text style={styles.genderText}>Man</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.genderOption}
            onPress={() => setGender('woman')}
          >
            <View style={[styles.radioButton, gender === 'woman' && styles.radioSelected]} />
            <Text style={styles.genderText}>Woman</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.genderOption}
            onPress={() => setGender('other')}
          >
            <View style={[styles.radioButton, gender === 'other' && styles.radioSelected]} />
            <Text style={styles.genderText}>Something else</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.genderOption}
            onPress={() => setGender('prefer-not-to-say')}
          >
            <View style={[styles.radioButton, gender === 'prefer-not-to-say' && styles.radioSelected]} />
            <Text style={styles.genderText}>Prefer not to say</Text>
          </TouchableOpacity>
        </View>

        {/* Next Button */}
        <TouchableOpacity 
          style={[styles.nextButton, isFormValid ? styles.nextButtonEnabled : styles.nextButtonDisabled]} 
          onPress={handleNext}
          disabled={!isFormValid}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>

        <View style={styles.spacer} />
      </ScrollView>

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
  inputSubtitle: {
    fontSize: 14,
    color: '#a7a7a7',
    marginBottom: 16,
  },
  subtitleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  learnMoreLink: {
    fontSize: 14,
    color: 'white',
    textDecorationLine: 'underline',
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
    marginBottom: 32,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  monthPicker: {
    flex: 2,
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#727272',
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerText: {
    fontSize: 16,
    color: 'white',
  },
  placeholderText: {
    color: '#727272',
  },
  dayInput: {
    flex: 1,
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#727272',
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  yearInput: {
    flex: 1,
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#727272',
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  pickerModal: {
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    marginBottom: 32,
  },
  picker: {
    color: 'white',
  },
  pickerItem: {
    color: 'white',
    fontSize: 16,
  },
  genderContainer: {
    marginBottom: 40,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#727272',
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#1ed760',
    backgroundColor: '#1ed760',
  },
  genderText: {
    fontSize: 16,
    color: 'white',
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
  spacer: {
    height: 60,
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