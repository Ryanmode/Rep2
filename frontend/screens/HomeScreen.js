// Home Screen - Main dashboard for the app
// Shows recent podcasts and quick actions

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ApiService from '../components/ApiService';

export default function HomeScreen({ navigation }) {
  const [recentPodcasts, setRecentPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRecentPodcasts();
  }, []);

  const loadRecentPodcasts = async () => {
    try {
      setLoading(true);
      // Load some popular podcasts as examples
      const response = await ApiService.searchPodcasts('technology');
      setRecentPodcasts(response.results.slice(0, 3));
    } catch (error) {
      console.error('Error loading podcasts:', error);
      Alert.alert('Error', 'Failed to load podcasts');
    } finally {
      setLoading(false);
    }
  };

  const handlePodcastPress = (podcast) => {
    navigation.navigate('PodcastDetail', { podcast });
  };

  const quickActions = [
    {
      id: 'search',
      title: 'Search Podcasts',
      subtitle: 'Find your favorite shows',
      icon: 'search',
      color: '#10b981',
      onPress: () => navigation.navigate('Search'),
    },
    {
      id: 'translate',
      title: 'Quick Translate',
      subtitle: 'Paste text to translate',
      icon: 'language',
      color: '#f59e0b',
      onPress: () => navigation.navigate('Translation'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome to Rapidlu!</Text>
        <Text style={styles.welcomeSubtitle}>
          Listen to English podcasts in your own language
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickActionCard}
              onPress={action.onPress}
            >
              <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                <Ionicons name={action.icon} size={24} color="white" />
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Featured Podcasts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Podcasts</Text>
        {loading ? (
          <Text style={styles.loadingText}>Loading podcasts...</Text>
        ) : (
          <View style={styles.podcastList}>
            {recentPodcasts.map((podcast) => (
              <TouchableOpacity
                key={podcast.id}
                style={styles.podcastCard}
                onPress={() => handlePodcastPress(podcast)}
              >
                <Image
                  source={{ uri: podcast.image }}
                  style={styles.podcastImage}
                />
                <View style={styles.podcastInfo}>
                  <Text style={styles.podcastTitle} numberOfLines={2}>
                    {podcast.title}
                  </Text>
                  <Text style={styles.podcastPublisher} numberOfLines={1}>
                    {podcast.publisher}
                  </Text>
                  <Text style={styles.podcastEpisodes}>
                    {podcast.totalEpisodes} episodes
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* How It Works */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.stepsContainer}>
          {[
            { step: 1, text: 'Search for English podcasts' },
            { step: 2, text: 'Get AI-powered summaries' },
            { step: 3, text: 'Translate to your language' },
            { step: 4, text: 'Listen to audio translation' },
          ].map((item) => (
            <View key={item.step} style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{item.step}</Text>
              </View>
              <Text style={styles.stepText}>{item.text}</Text>
            </View>
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
  welcomeSection: {
    backgroundColor: '#6366f1',
    padding: 20,
    paddingTop: 40,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
  },
  section: {
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  podcastList: {
    gap: 12,
  },
  podcastCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  podcastImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  podcastInfo: {
    flex: 1,
  },
  podcastTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  podcastPublisher: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  podcastEpisodes: {
    fontSize: 12,
    color: '#9ca3af',
  },
  loadingText: {
    textAlign: 'center',
    color: '#6b7280',
    fontStyle: 'italic',
  },
  stepsContainer: {
    gap: 12,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stepText: {
    fontSize: 16,
    color: '#374151',
  },
}); 