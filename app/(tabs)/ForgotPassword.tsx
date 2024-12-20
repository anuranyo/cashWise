// File: app/ForgotPassword.tsx
import { router } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const ForgotPasswordScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Forgot Password</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Reset Password?</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <Text style={styles.label}>Enter Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="example@example.com"
          placeholderTextColor="#b0b0b0"
          keyboardType="email-address"
        />
        <TouchableOpacity style={styles.button} onPress={() => router.push('/SecurityPin')} >
        <Text style={styles.buttonText}>Next Step</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FFF4',
  },
  header: {
    backgroundColor: '#00A676',
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 100,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: '#7D7D7D',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00A676',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  signUpText: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orText: {
    color: '#7D7D7D',
    marginBottom: 10,
  },
  icon: {
    backgroundColor: '#E8F5E9',
    padding: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  footerLink: {
    marginTop: 10,
    color: '#7D7D7D',
  },
  linkText: {
    color: '#00A676',
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
