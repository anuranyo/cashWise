import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const AuthScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Логотип */}
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>CashWise</Text>

      {/* Кнопка Log In */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Кнопка Sign Up */}
      <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={() => router.push('/(tabs)/SignupFStep')}>
        <Text style={[styles.buttonText, styles.signUpText]}>Sign Up</Text>
      </TouchableOpacity>

      {/* Забыл пароль */}
      <TouchableOpacity onPress={() => router.push('/ForgotPassword')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4FFF4',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    color: '#00D699',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#00D699',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: '#E5FFF4',
  },
  signUpText: {
    color: '#00D699',
  },
  forgotPassword: {
    marginTop: 20,
    color: '#888',
  },
});

export default AuthScreen;
