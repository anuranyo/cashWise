import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { fetchData } from '../services/api';

const NewPasswordScreen = () => {
  const { email, userID } = useLocalSearchParams(); 
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      await fetchData(`update-user?userID=${userID}`, {
        method: 'PUT',
        body: JSON.stringify({ password: newPassword }),
      });

      Alert.alert('Success', 'Password has been updated.');
      router.push('/login'); 
    } catch (error) {
      console.error('Error resetting password:', error);
      Alert.alert('Error', 'Unable to reset password. Please try again.');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>New Password</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          placeholderTextColor="#95D9A7"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm new password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#95D9A7"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5FFF4',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00D699',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#7D7D7D',
  },
  input: {
    backgroundColor: '#C6F5D9',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#00A676',
    paddingVertical: 15,
    paddingHorizontal: 30, 
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NewPasswordScreen;
    