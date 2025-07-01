// Podcast Detail Screen - Shows podcast information and episodes
// This is a placeholder - can be expanded later

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ApiService from '../components/ApiService';

export default function PodcastDetailScreen({ route, navigation }) {
  const { podcast } = route.params;
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingTranscript, setLoadingTranscript] = useState(null);

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getPodcastEpisodes(podcast.id);
      setEpisodes(response.episodes || []);
    } catch (error) {
      console.error('Error fetching episodes:', error);
      Alert.alert('Error', 'Failed to fetch episodes');
    } finally {
      setLoading(false);
    }
  };

  const handleEpisodePress = async (episode) => {
    try {
      setLoadingTranscript(episode.id);
      const transcriptResponse = await ApiService.getEpisodeTranscript(episode.id);
      
      // Navigate to TranslationScreen with the transcript
      navigation.navigate('Translation', {
        transcript: transcriptResponse.transcript,
        episodeTitle: episode.title,
        podcastTitle: podcast.title,
      });
    } catch (error) {
      console.error('Error fetching transcript:', error);
      Alert.alert('Error', 'Failed to fetch episode transcript');
    } finally {
      setLoadingTranscript(null);
    }
  };

  const renderEpisode = ({ item: episode }) => (
    <TouchableOpacity
      style={styles.episodeItem}
      onPress={() => handleEpisodePress(episode)}
      disabled={loadingTranscript === episode.id}
    >
      <View style={styles.episodeContent}>
        <Text style={styles.episodeTitle} numberOfLines={2}>
          {episode.title}
        </Text>
        <Text style={styles.episodeDescription} numberOfLines={3}>
          {episode.description}
        </Text>
        <View style={styles.episodeMetadata}>
          <Text style={styles.episodeDate}>
            {new Date(episode.date || episode.pub_date_ms).toLocaleDateString()}
          </Text>
          <Text style={styles.episodeDuration}>
            {Math.floor((episode.duration || episode.audio_length_sec || 0) / 60)} min
          </Text>
        </View>
      </View>
      <View style={styles.episodeAction}>
        {loadingTranscript === episode.id ? (
          <ActivityIndicator size="small" color="#6366f1" />
        ) : (
          <Ionicons name="play-circle" size={24} color="#6366f1" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: podcast.image }} style={styles.podcastImage} />
        <View style={styles.podcastInfo}>
          <Text style={styles.podcastTitle}>{podcast.title}</Text>
          <Text style={styles.publisher}>{podcast.publisher}</Text>
          <Text style={styles.episodeCount}>
            {podcast.totalEpisodes} episodes
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>{podcast.description}</Text>
        
        <TouchableOpacity
          style={styles.translateButton}
          onPress={() => navigation.navigate('Translation', { podcast })}
        >
          <Ionicons name="language" size={24} color="white" />
          <Text style={styles.translateButtonText}>
            Translate with Custom Text
          </Text>
        </TouchableOpacity>

        <View style={styles.episodesSection}>
          <Text style={styles.episodesTitle}>Recent Episodes</Text>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#6366f1" />
              <Text style={styles.loadingText}>Loading episodes...</Text>
            </View>
          ) : episodes.length > 0 ? (
            <FlatList
              data={episodes}
              renderItem={renderEpisode}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.noEpisodesContainer}>
              <Ionicons name="radio-outline" size={48} color="#9ca3af" />
              <Text style={styles.noEpisodesText}>No episodes available</Text>
            </View>
          )}
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
    backgroundColor: 'white',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  podcastImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 16,
  },
  podcastInfo: {
    flex: 1,
  },
  podcastTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  publisher: {
    fontSize: 16,
    color: '#6366f1',
    marginBottom: 4,
  },
  episodeCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 24,
  },
  translateButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  translateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  episodesSection: {
    marginTop: 8,
  },
  episodesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  episodeItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  episodeContent: {
    flex: 1,
    marginRight: 12,
  },
  episodeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  episodeDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  episodeMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  episodeDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  episodeDuration: {
    fontSize: 12,
    color: '#9ca3af',
  },
  episodeAction: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
  },
  noEpisodesContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noEpisodesText: {
    marginTop: 12,
    fontSize: 16,
    color: '#9ca3af',
  },
}); 