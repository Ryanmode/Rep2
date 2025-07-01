// Translation Screen - Handles text summarization, translation, and TTS
// This is a placeholder - can be expanded later

import React, { useState, useEffect } from 'react';
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
import AudioPlayer from '../components/AudioPlayer';

export default function TranslationScreen({ route }) {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [translation, setTranslation] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Spanish');

  // Check for navigation parameters on component mount
  useEffect(() => {
    if (route.params?.transcript) {
      setInputText(route.params.transcript);
    }
  }, [route.params]);

  const getScreenTitle = () => {
    if (route.params?.episodeTitle) {
      return `Translating: ${route.params.episodeTitle}`;
    }
    if (route.params?.podcastTitle) {
      return `From: ${route.params.podcastTitle}`;
    }
    return 'Translation & Audio';
  };

  const getScreenSubtitle = () => {
    if (route.params?.episodeTitle) {
      return 'Episode transcript loaded automatically';
    }
    return 'Translate and listen to content';
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      Alert.alert('Error', 'Please enter some text to translate');
      return;
    }

    try {
      setIsTranslating(true);
      const response = await ApiService.summarizeAndTranslate(
        inputText,
        selectedLanguage
      );
      setSummary(response.summary);
      setTranslation(response.translation);
      // Clear any previous audio when new translation is made
      setAudioUrl(null);
    } catch (error) {
      console.error('Translation error:', error);
      Alert.alert('Error', 'Failed to translate text');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleGenerateAudio = async () => {
    if (!translation) {
      Alert.alert('Error', 'Please translate some text first');
      return;
    }

    try {
      setIsGeneratingAudio(true);
      const response = await ApiService.generatePodcastAudio(translation, {
        voice: 'podcast-narrator-female',
        language: selectedLanguage.toLowerCase(),
        quality: 'podcast',
        title: route.params?.episodeTitle || 'Rapidlu Translated Content',
        description: `AI-translated podcast content in ${selectedLanguage}`
      });
      
      // Store the audio URL for playback
      setAudioUrl(response.audio?.audioUrl || response.audioUrl);
      
      Alert.alert(
        'Podcast Audio Generated!', 
        `✅ Successfully created ${Math.round((response.generation?.estimated_listen_time || 120) / 60)} minute podcast\n\n` +
        `🎤 Voice: ${response.generation?.voice_used || 'Default'}\n` +
        `📊 Quality: ${response.audio?.quality || 'podcast'}\n` +
        `⚡ Provider: ${response.audio?.provider || 'mock'}`
      );
    } catch (error) {
      console.error('Podcast TTS error:', error);
      Alert.alert('Error', 'Failed to generate podcast audio');
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{getScreenTitle()}</Text>
        <Text style={styles.headerSubtitle}>
          {getScreenSubtitle()}
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>
          {route.params?.transcript ? 'Episode Transcript' : 'Input Text'}
        </Text>
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
          disabled={isTranslating || isGeneratingAudio}
        >
          {isTranslating ? (
            <ActivityIndicator color="white" />
          ) : (
            <Ionicons name="language" size={24} color="white" />
          )}
          <Text style={styles.buttonText}>
            {isTranslating ? 'Processing...' : 'Summarize & Translate'}
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
              disabled={isTranslating || isGeneratingAudio}
            >
              {isGeneratingAudio ? (
                <ActivityIndicator color="white" />
              ) : (
                <Ionicons name="mic" size={24} color="white" />
              )}
              <Text style={styles.buttonText}>
                {isGeneratingAudio ? 'Creating Podcast...' : 'Generate Podcast Audio'}
              </Text>
            </TouchableOpacity>

            {/* Audio Player will be rendered here after we create it */}
            {audioUrl && (
              <View style={styles.audioPlayerSection}>
                <Text style={styles.sectionTitle}>Listen to Translation</Text>
                <AudioPlayer 
                  audioUrl={audioUrl}
                  title={route.params?.episodeTitle || 'Translated Audio'}
                />
              </View>
            )}
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
  audioPlayerSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
}); 