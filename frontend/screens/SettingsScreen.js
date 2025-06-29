// Settings Screen - App configuration and preferences
// Manage language preferences, voice settings, etc.

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import ApiService from '../components/ApiService';

export default function SettingsScreen() {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('default');
  const [autoPlay, setAutoPlay] = useState(true);
  const [downloadAudio, setDownloadAudio] = useState(false);
  const [summaryLength, setSummaryLength] = useState('medium');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // Load supported languages
      const langResponse = await ApiService.getSupportedLanguages();
      setLanguages(langResponse.languages || []);

      // Load available voices
      const voiceResponse = await ApiService.getAvailableVoices();
      setVoices(voiceResponse.voices || []);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const settingSections = [
    {
      title: 'Translation Settings',
      items: [
        {
          id: 'language',
          title: 'Preferred Language',
          subtitle: 'Choose your translation language',
          type: 'picker',
          value: selectedLanguage,
          options: languages.map(lang => ({
            label: `${lang.name} (${lang.nativeName})`,
            value: lang.code,
          })),
          onValueChange: setSelectedLanguage,
        },
        {
          id: 'summary',
          title: 'Summary Length',
          subtitle: 'How detailed should summaries be?',
          type: 'picker',
          value: summaryLength,
          options: [
            { label: 'Short (2-3 sentences)', value: 'short' },
            { label: 'Medium (1-2 paragraphs)', value: 'medium' },
            { label: 'Long (3-4 paragraphs)', value: 'long' },
          ],
          onValueChange: setSummaryLength,
        },
      ],
    },
    {
      title: 'Audio Settings',
      items: [
        {
          id: 'voice',
          title: 'Voice Selection',
          subtitle: 'Choose a voice for text-to-speech',
          type: 'picker',
          value: selectedVoice,
          options: voices.map(voice => ({
            label: `${voice.name} (${voice.language})`,
            value: voice.id,
          })),
          onValueChange: setSelectedVoice,
        },
        {
          id: 'autoplay',
          title: 'Auto-play Audio',
          subtitle: 'Automatically play generated audio',
          type: 'switch',
          value: autoPlay,
          onValueChange: setAutoPlay,
        },
        {
          id: 'download',
          title: 'Download Audio',
          subtitle: 'Save audio files for offline listening',
          type: 'switch',
          value: downloadAudio,
          onValueChange: setDownloadAudio,
        },
      ],
    },
  ];

  const aboutItems = [
    {
      id: 'health',
      title: 'Server Status',
      subtitle: 'Check backend connection',
      icon: 'pulse',
      onPress: checkServerHealth,
    },
    {
      id: 'about',
      title: 'About Rapidlu',
      subtitle: 'Version 1.0.0',
      icon: 'information-circle',
      onPress: showAbout,
    },
    {
      id: 'help',
      title: 'Help & Support',
      subtitle: 'Get help using the app',
      icon: 'help-circle',
      onPress: showHelp,
    },
  ];

  async function checkServerHealth() {
    try {
      const response = await ApiService.checkHealth();
      Alert.alert(
        'Server Status',
        `✅ Server is running!\n\nStatus: ${response.status}\nTime: ${new Date(response.timestamp).toLocaleTimeString()}`
      );
    } catch (error) {
      Alert.alert(
        'Server Status',
        `❌ Server connection failed\n\nError: ${error.message}`
      );
    }
  }

  function showAbout() {
    Alert.alert(
      'About Rapidlu',
      'Rapidlu allows you to listen to English podcasts in your own language using AI-powered translation and text-to-speech.\n\nMade with ❤️ for podcast lovers worldwide.'
    );
  }

  function showHelp() {
    Alert.alert(
      'Help & Support',
      '1. Search for English podcasts\n2. Select an episode\n3. Get AI summary and translation\n4. Listen to audio in your language\n\nFor more help, visit our website or contact support.'
    );
  }

  const renderPickerItem = (item) => (
    <View style={styles.settingItem} key={item.id}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{item.title}</Text>
        <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
      </View>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          value={item.value}
          onValueChange={item.onValueChange}
          items={item.options}
          style={pickerSelectStyles}
          placeholder={{}}
        />
      </View>
    </View>
  );

  const renderSwitchItem = (item) => (
    <View style={styles.settingItem} key={item.id}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{item.title}</Text>
        <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
      </View>
      <Switch
        value={item.value}
        onValueChange={item.onValueChange}
        trackColor={{ false: '#e5e7eb', true: '#c7d2fe' }}
        thumbColor={item.value ? '#6366f1' : '#f3f4f6'}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>
          Customize your Rapidlu experience
        </Text>
      </View>

      {/* Settings Sections */}
      {settingSections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map((item) =>
              item.type === 'picker'
                ? renderPickerItem(item)
                : renderSwitchItem(item)
            )}
          </View>
        </View>
      ))}

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.sectionContent}>
          {aboutItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.aboutItem}
              onPress={item.onPress}
            >
              <Ionicons name={item.icon} size={24} color="#6366f1" />
              <View style={styles.aboutInfo}>
                <Text style={styles.aboutTitle}>{item.title}</Text>
                <Text style={styles.aboutSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#6366f1',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  pickerContainer: {
    minWidth: 120,
  },
  aboutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  aboutInfo: {
    flex: 1,
    marginLeft: 12,
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  aboutSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    color: '#1f2937',
    paddingRight: 30,
    backgroundColor: '#f9fafb',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    color: '#1f2937',
    paddingRight: 30,
    backgroundColor: '#f9fafb',
  },
}); 