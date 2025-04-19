import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { MapPin, Calendar, TrendingUp, CircleAlert as AlertCircle } from 'lucide-react-native';
import { featuredRoutes } from '@/data/featuredRoutes';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.85;

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const navigateToSearch = () => {
    router.push('/(tabs)/search');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading FlexiTravel...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome to FlexiTravel</Text>
        <Text style={styles.welcomeSubtitle}>Find flexible, affordable transport across Europe</Text>
        
        <TouchableOpacity style={styles.searchButton} onPress={navigateToSearch}>
          <Text style={styles.searchButtonText}>Start Searching</Text>
        </TouchableOpacity>
      </View>

      {/* How It Works Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        
        <View style={styles.stepContainer}>
          <View style={styles.stepIcon}>
            <MapPin size={24} color="#3366CC" />
          </View>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepTitle}>Choose Your Destinations</Text>
            <Text style={styles.stepDescription}>Select where you're traveling from and to</Text>
          </View>
        </View>
        
        <View style={styles.stepContainer}>
          <View style={styles.stepIcon}>
            <Calendar size={24} color="#3366CC" />
          </View>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepTitle}>Set Your Date Range</Text>
            <Text style={styles.stepDescription}>Choose a flexible date range to find the best deals</Text>
          </View>
        </View>
        
        <View style={styles.stepContainer}>
          <View style={styles.stepIcon}>
            <TrendingUp size={24} color="#3366CC" />
          </View>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepTitle}>Compare Options</Text>
            <Text style={styles.stepDescription}>Browse all available transport options sorted by price</Text>
          </View>
        </View>
      </View>

      {/* Featured Routes Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Popular Routes</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.featuredRoutesContainer}
        >
          {featuredRoutes.map((route, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.routeCard}
              onPress={navigateToSearch}
            >
              <Image source={{ uri: route.image }} style={styles.routeImage} />
              <View style={styles.routeInfo}>
                <Text style={styles.routeTitle}>{route.from} → {route.to}</Text>
                <Text style={styles.routePrice}>from €{route.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Tips Section */}
      <View style={styles.tipsContainer}>
        <View style={styles.tipHeader}>
          <AlertCircle size={20} color="#3366CC" />
          <Text style={styles.tipHeaderText}>Travel Tip</Text>
        </View>
        <Text style={styles.tipText}>
          Book 2-3 months in advance for the best prices on long-distance trains.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  contentContainer: {
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#3366CC',
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#3366CC',
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: '#FF9933',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 8,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1E293B',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(51, 102, 204, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  stepDescription: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  featuredRoutesContainer: {
    paddingRight: 20,
  },
  routeCard: {
    width: cardWidth,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  routeImage: {
    width: '100%',
    height: 120,
  },
  routeInfo: {
    padding: 16,
  },
  routeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  routePrice: {
    fontSize: 15,
    color: '#3366CC',
    fontWeight: '600',
    marginTop: 4,
  },
  tipsContainer: {
    margin: 20,
    padding: 16,
    backgroundColor: 'rgba(51, 102, 204, 0.1)',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3366CC',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3366CC',
    marginLeft: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
});