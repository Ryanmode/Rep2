// Translation Screen - Handles text summarization, translation, and TTS
// This is a placeholder - can be expanded later

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ApiService from '../components/ApiService';

export default function TranslationScreen({ route }) {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Spanish');

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      Alert.alert('Error', 'Please enter some text to translate');
      return;
    }

    try {
      setLoading(true);
      const response = await ApiService.summarizeAndTranslate(
        inputText,
        selectedLanguage
      );
      setSummary(response.summary);
      setTranslation(response.translation);
    } catch (error) {
      console.error('Translation error:', error);
      Alert.alert('Error', 'Failed to translate text');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAudio = async () => {
    if (!translation) {
      Alert.alert('Error', 'Please translate some text first');
      return;
    }

    try {
      setLoading(true);
      const response = await ApiService.generatePodcastAudio(translation, {
        voice: 'podcast-narrator-female',
        language: selectedLanguage.toLowerCase(),
        quality: 'podcast',
        title: 'Rapidlu Translated Content',
        description: `AI-translated podcast content in ${selectedLanguage}`
      });
      
      Alert.alert(
        'Podcast Audio Generated!', 
        `✅ Successfully created ${Math.round(response.generation.estimated_listen_time / 60)} minute podcast\n\n` +
        `🎤 Voice: ${response.generation.voice_used}\n` +
        `📊 Quality: ${response.audio.quality}\n` +
        `⚡ Provider: ${response.audio.provider}`
      );
    } catch (error) {
      console.error('Podcast TTS error:', error);
      Alert.alert('Error', 'Failed to generate podcast audio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Translation & Audio</Text>
        <Text style={styles.headerSubtitle}>
          Translate and listen to content
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Input Text</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Paste podcast transcript or any text here..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity
          style={styles.translateButton}
          onPress={handleTranslate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Ionicons name="language" size={24} color="white" />
          )}
          <Text style={styles.buttonText}>
            {loading ? 'Processing...' : 'Summarize & Translate'}
          </Text>
        </TouchableOpacity>

        {summary && (
          <View style={styles.resultSection}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.resultText}>{summary}</Text>
          </View>
        )}

        {translation && (
          <View style={styles.resultSection}>
            <Text style={styles.sectionTitle}>Translation ({selectedLanguage})</Text>
            <Text style={styles.resultText}>{translation}</Text>
            
            <TouchableOpacity
              style={styles.audioButton}
              onPress={handleGenerateAudio}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Ionicons name="mic" size={24} color="white" />
              )}
              <Text style={styles.buttonText}>
                {loading ? 'Creating Podcast...' : 'Generate Podcast Audio'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  translateButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  audioButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  resultSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
}); 