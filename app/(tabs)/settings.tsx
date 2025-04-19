import { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ChevronRight, Bell, Euro, Languages as Language, Globe, CircleHelp as HelpCircle, Shield, Mail, Info } from 'lucide-react-native';

export default function SettingsScreen() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [currency, setCurrency] = useState('EUR');
  const [language, setLanguage] = useState('English');

  const showCurrencyOptions = () => {
    Alert.alert(
      'Select Currency',
      'This feature will be available in the next update.'
    );
  };

  const showLanguageOptions = () => {
    Alert.alert(
      'Select Language',
      'This feature will be available in the next update.'
    );
  };

  const navigateToSupport = () => {
    Alert.alert(
      'Contact Support',
      'This feature will be available in the next update.'
    );
  };

  const navigateToAbout = () => {
    Alert.alert(
      'About FlexiTravel',
      'Version 1.0.0\n\nFlexiTravel helps travelers find flexible and affordable transportation options across Europe.'
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingIconContainer}>
            <Bell size={20} color="#3366CC" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Push Notifications</Text>
            <Text style={styles.settingDescription}>Price alerts and deals</Text>
          </View>
          <Switch
            value={pushNotifications}
            onValueChange={setPushNotifications}
            trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
            thumbColor={pushNotifications ? '#3366CC' : '#F1F5F9'}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingIconContainer}>
            <Mail size={20} color="#3366CC" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Email Notifications</Text>
            <Text style={styles.settingDescription}>Booking confirmations and updates</Text>
          </View>
          <Switch
            value={emailNotifications}
            onValueChange={setEmailNotifications}
            trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
            thumbColor={emailNotifications ? '#3366CC' : '#F1F5F9'}
          />
        </View>
        
        <TouchableOpacity style={styles.settingItem} onPress={showCurrencyOptions}>
          <View style={styles.settingIconContainer}>
            <Euro size={20} color="#3366CC" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Currency</Text>
            <Text style={styles.settingDescription}>{currency}</Text>
          </View>
          <ChevronRight size={20} color="#64748B" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem} onPress={showLanguageOptions}>
          <View style={styles.settingIconContainer}>
            <Language size={20} color="#3366CC" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Language</Text>
            <Text style={styles.settingDescription}>{language}</Text>
          </View>
          <ChevronRight size={20} color="#64748B" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Info</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIconContainer}>
            <Shield size={20} color="#3366CC" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Privacy Policy</Text>
          </View>
          <ChevronRight size={20} color="#64748B" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIconContainer}>
            <Globe size={20} color="#3366CC" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Terms of Service</Text>
          </View>
          <ChevronRight size={20} color="#64748B" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem} onPress={navigateToSupport}>
          <View style={styles.settingIconContainer}>
            <HelpCircle size={20} color="#3366CC" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Help & Support</Text>
          </View>
          <ChevronRight size={20} color="#64748B" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem} onPress={navigateToAbout}>
          <View style={styles.settingIconContainer}>
            <Info size={20} color="#3366CC" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>About</Text>
            <Text style={styles.settingDescription}>Version 1.0.0</Text>
          </View>
          <ChevronRight size={20} color="#64748B" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  section: {
    backgroundColor: 'white',
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3366CC',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(51, 102, 204, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
  },
  settingDescription: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
});