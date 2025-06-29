// Podcast Detail Screen - Shows podcast information and episodes
// This is a placeholder - can be expanded later

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PodcastDetailScreen({ route, navigation }) {
  const { podcast } = route.params;

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
            Translate Latest Episode
          </Text>
        </TouchableOpacity>
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
  },
  translateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 