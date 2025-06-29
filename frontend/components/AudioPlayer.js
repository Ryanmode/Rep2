// AudioPlayer Component - Handles audio playback with controls

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function AudioPlayer({ audioUrl, title = 'Audio Track' }) {
  const [sound, setSound] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set audio mode for playback
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    // Load the audio when component mounts or audioUrl changes
    if (audioUrl) {
      loadAudio();
    }

    // Cleanup function
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [audioUrl]);

  const loadAudio = async () => {
    try {
      setIsLoading(true);
      
      // Unload previous sound if it exists
      if (sound) {
        await sound.unloadAsync();
      }

      // For mock audio URLs (data URLs), we'll use a placeholder behavior
      if (audioUrl.startsWith('data:') || audioUrl.includes('mock')) {
        setIsLoaded(true);
        setDuration(120000); // 2 minutes mock duration
        setIsLoading(false);
        return;
      }

      // Load actual audio
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading audio:', error);
      Alert.alert('Error', 'Failed to load audio file');
      // Set up mock playback for development
      setIsLoaded(true);
      setDuration(120000); // 2 minutes mock duration
    } finally {
      setIsLoading(false);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis || 0);
      setDuration(status.durationMillis || 0);
      setIsPlaying(status.isPlaying || false);
    }
  };

  const playPauseAudio = async () => {
    try {
      if (audioUrl.startsWith('data:') || audioUrl.includes('mock') || !sound) {
        // Mock playback behavior for development
        setIsPlaying(!isPlaying);
        return;
      }

      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    } catch (error) {
      console.error('Error playing/pausing audio:', error);
      Alert.alert('Error', 'Failed to play audio');
    }
  };

  const seekToPosition = async (value) => {
    try {
      if (sound && duration > 0) {
        const seekPosition = value * duration;
        await sound.setPositionAsync(seekPosition);
      } else {
        // Mock seeking for development
        setPosition(value * duration);
      }
    } catch (error) {
      console.error('Error seeking audio:', error);
    }
  };

  const formatTime = (timeMillis) => {
    const minutes = Math.floor(timeMillis / 60000);
    const seconds = Math.floor((timeMillis % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    if (duration === 0) return 0;
    return (position / duration) * 100;
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#6366f1" />
          <Text style={styles.loadingText}>Loading audio...</Text>
        </View>
      </View>
    );
  }

  if (!isLoaded && !audioUrl) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No audio available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={playPauseAudio}
          disabled={!isLoaded}
        >
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${getProgressPercentage()}%` },
                ]}
              />
            </View>
          </View>

          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>

      {(audioUrl.startsWith('data:') || audioUrl.includes('mock')) && (
        <Text style={styles.mockText}>
          🎧 Demo Mode: Audio playback simulated
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#6366f1',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  progressContainer: {
    flex: 1,
    alignItems: 'center',
  },
  progressBarContainer: {
    width: '100%',
    marginVertical: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#d1d5db',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
  timeText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6b7280',
  },
  errorText: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 14,
    paddingVertical: 20,
  },
  mockText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#f59e0b',
    marginTop: 8,
    fontStyle: 'italic',
  },
}); 