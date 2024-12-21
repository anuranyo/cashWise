import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import BottomNavigation from '../components/SavingsProgress/BottomNavigation';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const router = useRouter();

  const profileOptions = [
    { id: '1', icon: 'user', name: 'Edit Profile', route: '/EditProfileScreen' },
    { id: '2', icon: 'shield-alt', name: 'Security', route: './SecurityScreen' },
    { id: '4', icon: 'question-circle', name: 'Help', route: '/FAQScreen' },
    { id: '5', icon: 'sign-out-alt', name: 'Logout', route: '/auth' },
  ];
  
  const renderProfileOption = ({
    item,
  }: {
    item: { icon: string; name: string; route: string };
  }) => (
    <TouchableOpacity
      style={styles.optionItem}
      onPress={() => router.push(item.route as any)}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name={item.icon} size={24} color="#FFFFFF" />
      </View>
      <Text style={styles.optionText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          {/* Add a back button here if necessary */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => router.push('./NotificationScreen')}>
          <FontAwesome5 name="bell" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          style={styles.profileImage}
          source={{ uri: 'https://via.placeholder.com/150' }}
        />
        <Text style={styles.profileName}>John Smith</Text>
        <Text style={styles.profileId}>ID: 2530024</Text>
      </View>

      {/* Profile Options */}
      <FlatList
        data={profileOptions}
        keyExtractor={(item) => item.id}
        renderItem={renderProfileOption}
        contentContainerStyle={styles.optionsContainer}
      />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    backgroundColor: '#E6FFF5',
  },
  header: {
    backgroundColor: '#00C9A7',
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileSection: {
    alignItems: 'center',
    backgroundColor: '#E6FFF5',
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  profileId: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  optionsContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1A73E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default ProfileScreen;
