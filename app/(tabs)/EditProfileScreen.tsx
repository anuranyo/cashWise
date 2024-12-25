import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { fetchData } from '../services/api';

const EditProfileScreen = () => {
  const router = useRouter();
  const { userID } = useLocalSearchParams();

  const [user, setUser] = useState({
    fullName: '',
    email: '',
    profilePicture: '',
    darkTheme: false,
  });
  const [loading, setLoading] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
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
            fullName: response.fullName || '',
            email: response.email || '',
            profilePicture: response.profilePicture || '',
            darkTheme: response.darkTheme || false,
          });
        } else {
          console.error('Error fetching user data:', response);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userID]);

  const handleUpdateProfile = async () => {
    try {
      const { fullName, email, darkTheme } = user;
  
      if (!fullName.trim() || !email.trim()) {
        Alert.alert('Error', 'Full Name and Email cannot be empty.');
        return;
      }
  
      setLoading(true);
  
      // Explicitly define the type of the promises array
      const promises: Promise<any>[] = [];
  
      // Update Full Name if changed
      if (fullName.trim() !== user.fullName) {
        promises.push(
          fetchData(`update-user?userID=${userID}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true',
            },
            body: JSON.stringify({ fullName: fullName.trim() }),
          })
        );
      }
  
      // Update Email if changed
      if (email.trim() !== user.email) {
        promises.push(
          fetchData(`update-user?userID=${userID}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true',
            },
            body: JSON.stringify({ email: email.trim() }),
          })
        );
      }
  
      // Update Dark Theme if changed
      if (darkTheme !== user.darkTheme) {
        promises.push(
          fetchData(`update-user?userID=${userID}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true',
            },
            body: JSON.stringify({ darkTheme }),
          })
        );
      }
  
      // Wait for all promises to resolve
      await Promise.all(promises);
  
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };
  
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00C9A7" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push({ pathname: '/ProfileScreen', params: { userID } })}>
          <FontAwesome5 name="arrow-left" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit My Profile</Text>
        <TouchableOpacity onPress={() => router.push({ pathname: './NotificationScreen', params: { userID } })}>
          <FontAwesome5 name="bell" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Profile Details */}
      <View style={styles.profileContainer}>
        <View style={styles.profileImageWrapper}>
          <Image
            source={{
              uri: user.profilePicture || 'https://via.placeholder.com/150',
            }}
            style={styles.profileImage}
            onError={() =>
              setUser((prevUser) => ({
                ...prevUser,
                profilePicture: 'https://via.placeholder.com/150',
              }))
            }
          />
          <TouchableOpacity style={styles.editIcon}>
            <FontAwesome5 name="camera" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>{user.fullName || 'Unknown User'}</Text>
        <Text style={styles.profileId}>ID: {userID}</Text>
      </View>

      {/* Account Settings */}
      <View style={styles.accountSettings}>
        <Text style={styles.settingsHeader}>Account Settings</Text>

        {/* Full Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={user.fullName}
            onChangeText={(text) => setUser({ ...user, fullName: text })}
            placeholder="Enter your full name"
            placeholderTextColor="#7D7D7D"
          />
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={user.email}
            onChangeText={(text) => setUser({ ...user, email: text })}
            keyboardType="email-address"
            placeholder="Enter your email"
            placeholderTextColor="#7D7D7D"
          />
        </View>

        {/* Dark Theme */}
        <View style={styles.toggleGroup}>
          <Text style={styles.toggleLabel}>Dark Theme</Text>
          <Switch
            value={user.darkTheme}
            onValueChange={(value) => setUser({ ...user, darkTheme: value })}
            thumbColor={user.darkTheme ? '#00C9A7' : '#E8E8E8'}
            trackColor={{ false: '#E8E8E8', true: '#00C9A7' }}
          />
        </View>

        {/* Push Notifications */}
        <View style={styles.toggleGroup}>
          <Text style={styles.toggleLabel}>Notifications</Text>
          <Switch
            value={pushNotifications}
            onValueChange={setPushNotifications}
            thumbColor={pushNotifications ? '#00C9A7' : '#E8E8E8'}
            trackColor={{ false: '#E8E8E8', true: '#00C9A7' }}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdateProfile}
        >
          <Text style={styles.updateButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#E8E8E8',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#00C9A7',
    borderRadius: 20,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 10,
  },
  profileId: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  accountSettings: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  settingsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#E8FFF7',
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: '#333333',
  },
  updateButton: {
    backgroundColor: '#00C9A7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6FFF5',
  },
  toggleGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  toggleLabel: {
    fontSize: 14,
    color: '#333333',
  },
});

export default EditProfileScreen;
