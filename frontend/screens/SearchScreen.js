// Search Screen - Find and discover podcasts
// Allows users to search for podcasts by keywords

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ApiService from '../components/ApiService';

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter a search term');
      return;
    }

    try {
      setLoading(true);
      setSearched(true);
      const response = await ApiService.searchPodcasts(searchQuery.trim());
      setResults(response.results || []);
    } catch (error) {
      console.error('Search error:', error);
      Alert.alert('Error', 'Failed to search podcasts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePodcastPress = (podcast) => {
    navigation.navigate('PodcastDetail', { podcast });
  };

  const renderPodcast = ({ item }) => (
    <TouchableOpacity
      style={styles.podcastItem}
      onPress={() => handlePodcastPress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.podcastImage} />
      <View style={styles.podcastInfo}>
        <Text style={styles.podcastTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.podcastPublisher} numberOfLines={1}>
          {item.publisher}
        </Text>
        <Text style={styles.podcastDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.podcastMeta}>
          <Text style={styles.episodeCount}>
            {item.totalEpisodes} episodes
          </Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search Podcasts</Text>
        <Text style={styles.headerSubtitle}>
          Find English podcasts to translate
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#9ca3af" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for podcasts..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchQuery('');
                setResults([]);
                setSearched(false);
              }}
            >
              <Ionicons name="close-circle" size={20} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Results */}
      <View style={styles.resultsContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6366f1" />
            <Text style={styles.loadingText}>Searching podcasts...</Text>
          </View>
        ) : searched ? (
          results.length > 0 ? (
            <FlatList
              data={results}
              renderItem={renderPodcast}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.resultsList}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="search" size={64} color="#9ca3af" />
              <Text style={styles.emptyTitle}>No podcasts found</Text>
              <Text style={styles.emptySubtitle}>
                Try searching with different keywords
              </Text>
            </View>
          )
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="podcast" size={64} color="#9ca3af" />
            <Text style={styles.emptyTitle}>Search for Podcasts</Text>
            <Text style={styles.emptySubtitle}>
              Enter keywords to find English podcasts
            </Text>
          </View>
        )}
      </View>
    </View>
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
  searchContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#1f2937',
  },
  searchButton: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  resultsList: {
    padding: 16,
  },
  podcastItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  podcastImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
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
    color: '#6366f1',
    marginBottom: 8,
  },
  podcastDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  podcastMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  episodeCount: {
    fontSize: 12,
    color: '#9ca3af',
  },
  language: {
    fontSize: 12,
    color: '#9ca3af',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
}); 