import { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  Keyboard,
  Animated,
  ScrollView
} from 'react-native';
import { Brain as Train, Bus, SlidersHorizontal, Search as SearchIcon, Calendar, MapPin, X } from 'lucide-react-native';
import { cities } from '@/data/cities';
import { searchRoutes } from '@/utils/searchUtils';
import RouteCard from '@/components/RouteCard';
import DateRangePicker from '@/components/DateRangePicker';

export default function SearchScreen() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [transportMode, setTransportMode] = useState('all'); // 'all', 'train', or 'bus'
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const datePickerAnimation = useRef(new Animated.Value(0)).current;

  // Filter city suggestions based on input
  useEffect(() => {
    if (origin.length > 0) {
      const filteredCities = cities
        .filter(city => city.name.toLowerCase().includes(origin.toLowerCase()))
        .slice(0, 5);
      setOriginSuggestions(filteredCities);
      setShowOriginSuggestions(true);
    } else {
      setShowOriginSuggestions(false);
    }
  }, [origin]);

  useEffect(() => {
    if (destination.length > 0) {
      const filteredCities = cities
        .filter(city => city.name.toLowerCase().includes(destination.toLowerCase()))
        .slice(0, 5);
      setDestinationSuggestions(filteredCities);
      setShowDestinationSuggestions(true);
    } else {
      setShowDestinationSuggestions(false);
    }
  }, [destination]);

  useEffect(() => {
    Animated.timing(datePickerAnimation, {
      toValue: showDatePicker ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showDatePicker, datePickerAnimation]);

  const handleSearch = () => {
    if (!origin || !destination) {
      return;
    }
    
    setIsSearching(true);
    Keyboard.dismiss();
    setShowOriginSuggestions(false);
    setShowDestinationSuggestions(false);
    setShowDatePicker(false);
    
    // Simulate API search delay
    setTimeout(() => {
      const results = searchRoutes(origin, destination, dateRange, transportMode);
      setSearchResults(results);
      setIsSearching(false);
      setHasSearched(true);
    }, 1500);
  };

  const selectOrigin = (city) => {
    setOrigin(city.name);
    setShowOriginSuggestions(false);
  };

  const selectDestination = (city) => {
    setDestination(city.name);
    setShowDestinationSuggestions(false);
  };

  const toggleDatePicker = () => {
    Keyboard.dismiss();
    setShowOriginSuggestions(false);
    setShowDestinationSuggestions(false);
    setShowDatePicker(!showDatePicker);
  };

  const handleDateSelect = (range) => {
    setDateRange(range);
    setShowDatePicker(false);
  };

  const clearSearch = () => {
    setOrigin('');
    setDestination('');
    setDateRange({ startDate: null, endDate: null });
    setSearchResults([]);
    setHasSearched(false);
  };

  const renderDateRangeText = () => {
    if (dateRange.startDate && dateRange.endDate) {
      return `${dateRange.startDate} - ${dateRange.endDate}`;
    }
    return 'Select dates';
  };

  const datePickerHeight = datePickerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300]
  });

  const renderItem = ({ item }) => <RouteCard route={item} />;

  return (
    <View style={styles.container}>
      {/* Search Form */}
      <View style={styles.searchForm}>
        <View style={styles.inputContainer}>
          <MapPin size={18} color="#64748B" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Origin city"
            value={origin}
            onChangeText={setOrigin}
            onFocus={() => {
              setShowOriginSuggestions(origin.length > 0);
              setShowDestinationSuggestions(false);
              setShowDatePicker(false);
            }}
          />
          {origin.length > 0 && (
            <TouchableOpacity onPress={() => setOrigin('')} style={styles.clearButton}>
              <X size={16} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
        
        {showOriginSuggestions && (
          <View style={styles.suggestionsContainer}>
            {originSuggestions.map((city) => (
              <TouchableOpacity
                key={city.id}
                style={styles.suggestionItem}
                onPress={() => selectOrigin(city)}
              >
                <MapPin size={16} color="#3366CC" />
                <Text style={styles.suggestionText}>{city.name}</Text>
                <Text style={styles.suggestionCountry}>{city.country}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.inputContainer}>
          <MapPin size={18} color="#64748B" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Destination city"
            value={destination}
            onChangeText={setDestination}
            onFocus={() => {
              setShowDestinationSuggestions(destination.length > 0);
              setShowOriginSuggestions(false);
              setShowDatePicker(false);
            }}
          />
          {destination.length > 0 && (
            <TouchableOpacity onPress={() => setDestination('')} style={styles.clearButton}>
              <X size={16} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
        
        {showDestinationSuggestions && (
          <View style={styles.suggestionsContainer}>
            {destinationSuggestions.map((city) => (
              <TouchableOpacity
                key={city.id}
                style={styles.suggestionItem}
                onPress={() => selectDestination(city)}
              >
                <MapPin size={16} color="#3366CC" />
                <Text style={styles.suggestionText}>{city.name}</Text>
                <Text style={styles.suggestionCountry}>{city.country}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.datePickerButton} onPress={toggleDatePicker}>
          <Calendar size={18} color="#64748B" style={styles.inputIcon} />
          <Text style={styles.datePickerButtonText}>
            {renderDateRangeText()}
          </Text>
        </TouchableOpacity>

        <Animated.View style={[styles.datePickerContainer, { height: datePickerHeight, opacity: datePickerAnimation }]}>
          {showDatePicker && (
            <DateRangePicker 
              onSelectDates={handleDateSelect} 
              initialRange={dateRange}
            />
          )}
        </Animated.View>

        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Transport Type:</Text>
          <View style={styles.transportToggle}>
            <TouchableOpacity
              style={[
                styles.transportButton,
                transportMode === 'all' && styles.transportButtonActive
              ]}
              onPress={() => setTransportMode('all')}
            >
              <Text style={[
                styles.transportButtonText,
                transportMode === 'all' && styles.transportButtonTextActive
              ]}>All</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.transportButton,
                transportMode === 'train' && styles.transportButtonActive
              ]}
              onPress={() => setTransportMode('train')}
            >
              <Train size={16} color={transportMode === 'train' ? '#FFFFFF' : '#64748B'} />
              <Text style={[
                styles.transportButtonText,
                transportMode === 'train' && styles.transportButtonTextActive
              ]}>Trains</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.transportButton,
                transportMode === 'bus' && styles.transportButtonActive
              ]}
              onPress={() => setTransportMode('bus')}
            >
              <Bus size={16} color={transportMode === 'bus' ? '#FFFFFF' : '#64748B'} />
              <Text style={[
                styles.transportButtonText,
                transportMode === 'bus' && styles.transportButtonTextActive
              ]}>Buses</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
            disabled={!origin || !destination}
          >
            <SearchIcon size={20} color="white" />
            <Text style={styles.searchButtonText}>Search Routes</Text>
          </TouchableOpacity>
          
          {(hasSearched || origin || destination) && (
            <TouchableOpacity
              style={styles.clearSearchButton}
              onPress={clearSearch}
            >
              <Text style={styles.clearSearchButtonText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results Section */}
      <View style={styles.resultsContainer}>
        {isSearching ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3366CC" />
            <Text style={styles.loadingText}>Searching for the best routes...</Text>
          </View>
        ) : hasSearched ? (
          searchResults.length > 0 ? (
            <>
              <View style={styles.resultsHeader}>
                <Text style={styles.resultsTitle}>
                  {searchResults.length} routes found
                </Text>
                <View style={styles.resultsInfo}>
                  <Text style={styles.routeInfo}>{origin} → {destination}</Text>
                  {dateRange.startDate && dateRange.endDate && (
                    <Text style={styles.dateInfo}>{dateRange.startDate} - {dateRange.endDate}</Text>
                  )}
                </View>
                <Text style={styles.resultsSortInfo}>
                  Sorted by: <Text style={styles.sortHighlight}>Lowest Price</Text>
                </Text>
              </View>
              <FlatList
                data={searchResults}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.resultsList}
              />
            </>
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No routes found.</Text>
              <Text style={styles.noResultsSubtext}>Try different dates or destinations.</Text>
            </View>
          )
        ) : (
          <View style={styles.emptyStateContainer}>
            <SlidersHorizontal size={48} color="#94A3B8" />
            <Text style={styles.emptyStateTitle}>Find Your Perfect Route</Text>
            <Text style={styles.emptyStateText}>
              Set your travel preferences above to discover the best transport options.
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
    backgroundColor: '#F8FAFC',
  },
  searchForm: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#1E293B',
  },
  clearButton: {
    padding: 4,
  },
  suggestionsContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    marginTop: -8,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 10,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  suggestionText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#1E293B',
    flex: 1,
  },
  suggestionCountry: {
    fontSize: 14,
    color: '#64748B',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 12,
  },
  datePickerButtonText: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  datePickerContainer: {
    overflow: 'hidden',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    marginBottom: 12,
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 8,
  },
  transportToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transportButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  transportButtonActive: {
    backgroundColor: '#3366CC',
  },
  transportButtonText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 4,
  },
  transportButtonTextActive: {
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  searchButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#3366CC',
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  clearSearchButton: {
    marginLeft: 12,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  clearSearchButtonText: {
    color: '#64748B',
    fontWeight: '500',
  },
  resultsContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  resultsHeader: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  resultsInfo: {
    marginTop: 4,
  },
  routeInfo: {
    fontSize: 16,
    color: '#334155',
  },
  dateInfo: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  resultsSortInfo: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
  },
  sortHighlight: {
    color: '#3366CC',
    fontWeight: '500',
  },
  resultsList: {
    paddingBottom: 20,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
  },
  noResultsSubtext: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '80%',
  },
});