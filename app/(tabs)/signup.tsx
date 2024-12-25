import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchData } from '../services/api';

const Signup = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const data = {
        fullName,
        email,
        password,
        profilePicture: 'url_to_profile_picture', // Example placeholder
        role: 'user',
      };

      // Using fetchData with appropriate endpoint and options
      const response = await fetchData('register', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      Alert.alert('Success', 'Account created successfully!');
      router.push('/login'); // Redirect to login page
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', error.message || 'Unable to register. Please try again later.');
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Заголовок */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Create Account</Text>
      </View>

      {/* Form */}
      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* Full Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#95D9A7"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="example@example.com"
            placeholderTextColor="#95D9A7"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#95D9A7"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Confirm Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#95D9A7"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {/* Terms and Policy */}
        <Text style={styles.policyText}>
          By continuing, you agree to{' '}
          <Text style={styles.policyLink}>Terms of Use</Text> and{' '}
          <Text style={styles.policyLink}>Privacy Policy</Text>.
        </Text>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Already have an account */}
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={styles.loginLink} onPress={() => router.push('/login')}>
            Log In
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D09E', 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerContainer: {
    backgroundColor: '#fff', 
    paddingVertical: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00D09E',
  },
  formContainer: {
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    backgroundColor: '#00D09E',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#C6F5D9',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },
  policyText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  policyLink: {
    color: '#C6F5D9',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#00D09E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  loginLink: {
    color: '#C6F5D9',
    fontWeight: 'bold',
  },
});

export default Signup;
