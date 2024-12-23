import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchData } from '../services/api'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const router = useRouter(); // Управление маршрутизацией
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Обработчик отправки формы
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetchData('login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
  
      if (response?.message === 'Login successful') {
        if (response?.userID) {
          await AsyncStorage.setItem('userID', response.userID); // Сохраняем userID
        }
        Alert.alert('Success', 'Login successful!');
  
        // Переход на HomeScreen с userID как параметром
        router.push({
          pathname: '/HomeScreen',
          params: { userID: response.userID },
        });
      } else {
        Alert.alert('Error', response?.message || 'Login failed.');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      {/* Заголовок */}
      <Text style={styles.title}>Welcome</Text>

      {/* Поля ввода */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#95D9A7"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#95D9A7"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Кнопка входа */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Log In'}</Text>
      </TouchableOpacity>

      {/* Ссылка на восстановление пароля */}
      <TouchableOpacity onPress={() => router.push('/ForgotPassword')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Биометрия */}
      <Text style={styles.fingerprintText}>Use <Text style={styles.highlight}>Fingerprint</Text> To Access</Text>

      {/* Социальный вход */}
      <Text style={styles.orText}>or sign up with</Text>
      <View style={styles.socialContainer}>
        <View style={styles.socialButton}>
          <Text style={styles.socialIcon}>G</Text>
        </View>
      </View>

      {/* Ссылка на регистрацию */}
      <Text style={styles.bottomText}>
        Don't have an account?{' '}
        <Text
          style={styles.highlight}
          onPress={() => router.push('/signup')} 
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5FFF4',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00D699',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#C6F5D9',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#000',
  },
  loginButton: {
    backgroundColor: '#00D699',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#888',
    marginTop: 10,
  },
  fingerprintText: {
    marginTop: 20,
    color: '#888',
    fontSize: 14,
  },
  highlight: {
    color: '#00D699',
    fontWeight: 'bold',
  },
  orText: {
    marginTop: 20,
    color: '#888',
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  socialButton: {
    backgroundColor: '#E5FFF4',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  socialIcon: {
    color: '#00D699',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomText: {
    marginTop: 20,
    color: '#888',
    fontSize: 14,
  },
});

export default LoginScreen;
