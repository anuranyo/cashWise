import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('./auth'); // Переход на экран авторизации
    }, 3000);
  }, [router]);

  return (
    <View style={styles.container}>
      {/* Логотип */}
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      {/* Текст */}
      <Text style={styles.text}>CashWise</Text>
      {/* Индикатор загрузки */}
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00D699',
  },
  logo: {
    width: 100, // Ширина изображения
    height: 100, // Высота изображения
    marginBottom: 20, // Отступ от текста
  },
  text: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
