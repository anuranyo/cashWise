import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import BottomNavigation from '../components/SavingsProgress/BottomNavigation';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { fetchData } from '../services/api';

type ProfileOption = {
  id: string;
  icon: string;
  name: string;
  route: string;
  params: { userID: string };
};

const ProfileScreen = () => {
  const { userID } = useLocalSearchParams(); // Getting userID from parameters
  const router = useRouter();
  const [user, setUser] = useState<{
    fullName: string;
    email: string;
    profilePicture: string;
    role: string;
    id: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const parsedUserID = Array.isArray(userID) ? userID[0] : userID; 

  const handleNotification = () => {
    router.push({
      pathname: `/NotificationScreen`,
      params: { userID: userID },
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchData(
          `/getUserAndSettings?userID=${userID}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true',
            },
          }
        );

        if (response) {
          setUser({
            fullName: response.fullName || 'Unknown User',
            email: response.email || 'No email provided',
            profilePicture: response.profilePicture || 'https://via.placeholder.com/150',
            role: response.role || 'User',
            id: response.userID?.toString() || 'Unknown ID',
          });
        } else {
          console.error('Invalid user response:', response);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const profileOptions: ProfileOption[] = [
    { id: '1', icon: 'user', name: 'Edit Profile', route: '/EditProfileScreen', params: { userID: parsedUserID } },
    { id: '2', icon: 'shield-alt', name: 'Security', route: './SecurityScreen', params: { userID: parsedUserID } },
    { id: '4', icon: 'question-circle', name: 'Help', route: '/FAQScreen', params: { userID: parsedUserID } },
    { id: '5', icon: 'sign-out-alt', name: 'Logout', route: '/auth', params: { userID: parsedUserID } },
  ];

  const renderProfileOption = ({
    item,
  }: {
    item: { icon: string; name: string; route: string; params: { userID: string } };
  }) => (
    <TouchableOpacity
      style={styles.optionItem}
      onPress={() => router.push({ pathname: item.route, params: item.params })}
    >
      <View style={styles.iconContainer}>
        <FontAwesome5 name={item.icon} size={24} color="#FFFFFF" />
      </View>
      <Text style={styles.optionText}>{item.name}</Text>
    </TouchableOpacity>
  );
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00C9A7" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          {/* Add a back button here if necessary */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={handleNotification}>
          <FontAwesome5 name="bell" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          style={styles.profileImage}
          source={{ uri: user?.profilePicture }}
        />
        <Text style={styles.profileName}>{user?.fullName || 'Unknown User'}</Text>
        <Text style={styles.profileEmail}>Email: {user?.email || 'No email provided'}</Text>
        <Text style={styles.profileRole}>Role: {user?.role || 'User'}</Text>
        <Text style={styles.profileId}>ID: {user?.id || 'Unknown ID'}</Text>
      </View>

      {/* Profile Options */}
      <FlatList
        data={profileOptions}
        keyExtractor={(item) => item.id} // Use 'id' to ensure unique keys
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
  profileEmail: {
    fontSize: 16,
    color: '#7D7D7D',
    marginTop: 5,
  },
  profileRole: {
    fontSize: 16,
    color: '#2A9D8F',
    marginTop: 5,
  },
  profileId: {
    fontSize: 14,
    color: '#7D7D7D',
    marginTop: 5,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6FFF5',
  },
});

export default ProfileScreen;
