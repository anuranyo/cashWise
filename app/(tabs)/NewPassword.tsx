import { router } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const NewPasswordScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>New Password</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new password"
          secureTextEntry={true}
          placeholderTextColor="#95D9A7"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm new password"
          secureTextEntry={true}
          placeholderTextColor="#95D9A7"
        />
      </View>

    <TouchableOpacity style={styles.changePasswordButton} onPress={() => router.push('/login')}>
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
  changePasswordButton: {
    backgroundColor: '#00D699',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewPasswordScreen;
    