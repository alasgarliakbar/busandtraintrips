import { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Bookmark, Plus, CircleAlert as AlertCircle } from 'lucide-react-native';
import { router } from 'expo-router';
import RouteCard from '@/components/RouteCard';
import { savedRoutes } from '@/data/savedRoutes';

export default function SavedScreen() {
  const [routes, setRoutes] = useState(savedRoutes);

  const removeRoute = (id) => {
    setRoutes(routes.filter(route => route.id !== id));
  };

  const navigateToSearch = () => {
    router.push('/(tabs)/search');
  };

  if (routes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Bookmark size={48} color="#94A3B8" />
        <Text style={styles.emptyTitle}>No Saved Routes</Text>
        <Text style={styles.emptyText}>
          Save your favorite routes for quick access later.
        </Text>
        <TouchableOpacity style={styles.searchButton} onPress={navigateToSearch}>
          <Plus size={20} color="white" />
          <Text style={styles.searchButtonText}>Find Routes</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.tipsContainer}>
        <View style={styles.tipHeader}>
          <AlertCircle size={20} color="#3366CC" />
          <Text style={styles.tipHeaderText}>Tips</Text>
        </View>
        <Text style={styles.tipText}>
          Save routes to compare prices or plan future trips.
        </Text>
      </View>
      
      <FlatList
        data={routes}
        renderItem={({ item }) => (
          <RouteCard 
            route={item} 
            isSaved={true} 
            onRemove={() => removeRoute(item.id)} 
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.routesList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
  },
  searchButton: {
    flexDirection: 'row',
    backgroundColor: '#3366CC',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  tipsContainer: {
    margin: 16,
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
  routesList: {
    padding: 16,
    paddingTop: 8,
  },
});