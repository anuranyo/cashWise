import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const EditProfileScreen = () => {
  const router = useRouter();

  const [username, setUsername] = useState('John Smith');
  const [phone, setPhone] = useState('+44 555 5555 55');
  const [email, setEmail] = useState('example@example.com');
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);

  const handleUpdateProfile = () => {
    console.log('Updated Profile:', {
      username,
      phone,
      email,
      pushNotifications,
      darkTheme,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome5 name="arrow-left" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit My Profile</Text>
        <TouchableOpacity onPress={() => router.push('./NotificationScreen')}>
          <FontAwesome5 name="bell" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Profile Details */}
      <View style={styles.profileContainer}>
        <View style={styles.profileImageWrapper}>
          <FontAwesome5
            name="user-circle"
            size={100}
            color="#7D7D7D"
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon}>
            <FontAwesome5 name="camera" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>John Smith</Text>
        <Text style={styles.profileId}>ID: 25030024</Text>
      </View>

      {/* Account Settings */}
      <View style={styles.accountSettings}>
        <Text style={styles.settingsHeader}>Account Settings</Text>

        {/* Username */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#7D7D7D"
          />
        </View>

        {/* Phone */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholderTextColor="#7D7D7D"
          />
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#7D7D7D"
          />
        </View>

        {/* Push Notifications */}
        <View style={styles.toggleGroup}>
          <Text style={styles.toggleLabel}>Push Notifications</Text>
          <Switch
            value={pushNotifications}
            onValueChange={setPushNotifications}
            thumbColor={pushNotifications ? '#00C9A7' : '#E8E8E8'}
            trackColor={{ false: '#E8E8E8', true: '#00C9A7' }}
          />
        </View>

        {/* Dark Theme */}
        <View style={styles.toggleGroup}>
          <Text style={styles.toggleLabel}>Turn Dark Theme</Text>
          <Switch
            value={darkTheme}
            onValueChange={setDarkTheme}
            thumbColor={darkTheme ? '#00C9A7' : '#E8E8E8'}
            trackColor={{ false: '#E8E8E8', true: '#00C9A7' }}
          />
        </View>

        {/* Update Profile Button */}
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdateProfile}
        >
          <Text style={styles.updateButtonText}>Update Profile</Text>
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
});

export default EditProfileScreen;
