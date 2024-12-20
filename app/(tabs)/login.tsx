import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const router = useRouter(); // Управление маршрутизацией

  return (
    <View style={styles.container}>
      {/* Заголовок */}
      <Text style={styles.title}>Welcome</Text>

      {/* Поля ввода */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username or Email"
          placeholderTextColor="#95D9A7"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#95D9A7"
        />
      </View>

      {/* Кнопка входа */}
      <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/HomeScreen')}>
        <Text style={styles.buttonText}>Log In</Text>
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
