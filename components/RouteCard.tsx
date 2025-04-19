import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Clock, Calendar, Brain as Train, Bus, ArrowRight, Bookmark, TriangleAlert as AlertTriangle } from 'lucide-react-native';

interface RouteCardProps {
  route: {
    id: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    date: string;
    price: number;
    provider: string;
    type: 'train' | 'bus';
    duration: string;
    transfers: number;
    discount?: boolean;
    limitedSeats?: boolean;
  };
  isSaved?: boolean;
  onSave?: () => void;
  onRemove?: () => void;
}

const RouteCard: React.FC<RouteCardProps> = ({ 
  route, 
  isSaved = false,
  onSave,
  onRemove
}) => {
  return (
    <View style={styles.container}>
      {/* Route Header */}
      <View style={styles.header}>
        <View style={styles.providerContainer}>
          {route.type === 'train' ? (
            <Train size={16} color="#3366CC" />
          ) : (
            <Bus size={16} color="#3366CC" />
          )}
          <Text style={styles.providerText}>{route.provider}</Text>
        </View>
        
        {!isSaved && (
          <TouchableOpacity style={styles.saveButton} onPress={onSave}>
            <Bookmark size={20} color="#64748B" />
          </TouchableOpacity>
        )}
        
        {isSaved && (
          <TouchableOpacity style={styles.saveButton} onPress={onRemove}>
            <Bookmark size={20} color="#3366CC" fill="#3366CC" />
          </TouchableOpacity>
        )}
      </View>

      {/* Route Info */}
      <View style={styles.routeInfo}>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{route.departureTime}</Text>
          <View style={styles.durationContainer}>
            <View style={[styles.line, { backgroundColor: route.type === 'train' ? '#3366CC' : '#33A1C9' }]} />
            {route.transfers > 0 && (
              <View style={styles.transfersContainer}>
                <Text style={styles.transfersText}>{route.transfers}x</Text>
              </View>
            )}
          </View>
          <Text style={styles.time}>{route.arrivalTime}</Text>
        </View>
        
        <View style={styles.cityContainer}>
          <Text style={styles.city}>{route.from}</Text>
          <Text style={styles.duration}>
            <Clock size={12} color="#64748B" /> {route.duration}
          </Text>
          <Text style={styles.city}>{route.to}</Text>
        </View>
      </View>

      {/* Route Details */}
      <View style={styles.details}>
        <View style={styles.dateContainer}>
          <Calendar size={14} color="#64748B" />
          <Text style={styles.dateText}>{route.date}</Text>
        </View>
        
        {route.limitedSeats && (
          <View style={styles.alertContainer}>
            <AlertTriangle size={14} color="#FF6B35" />
            <Text style={styles.alertText}>Limited seats</Text>
          </View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.priceText}>€{route.price}</Text>
          {route.discount && (
            <Text style={styles.discountText}>30% OFF</Text>
          )}
        </View>
        
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>Details</Text>
          <ArrowRight size={16} color="#3366CC" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  providerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#3366CC',
  },
  saveButton: {
    padding: 4,
  },
  routeInfo: {
    marginBottom: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  time: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    width: 60,
  },
  durationContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    position: 'relative',
  },
  line: {
    height: 2,
    flex: 1,
  },
  transfersContainer: {
    position: 'absolute',
    top: -10,
    left: '50%',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    transform: [{ translateX: -12 }],
  },
  transfersText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  cityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  city: {
    fontSize: 14,
    color: '#334155',
    width: 60,
  },
  duration: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: '#64748B',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#64748B',
  },
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  alertText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  discountText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  detailsButtonText: {
    fontSize: 14,
    color: '#3366CC',
    fontWeight: '500',
    marginRight: 4,
  },
});

export default RouteCard;