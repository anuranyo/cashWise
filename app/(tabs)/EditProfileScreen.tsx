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
  });
  const [loading, setLoading] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);
  const [notifications, setNotifications] = useState(false);

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
          });
          setDarkTheme(response.darkTheme || false); // Установка darkTheme из ответа
          setNotifications(response.notification || false); // Установка pushNotifications из ответа
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

  const toggleDarkTheme = async () => {
    try {
      const newTheme = !darkTheme;
      setDarkTheme(newTheme);

      const response = await fetchData(
        `settings/toggle-dark-theme?userID=${userID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
          body: JSON.stringify({ darkTheme: newTheme }),
        }
      );

      if (response) {
        Alert.alert('Успех', 'Тема успешно переключена!');
      } else {
        throw new Error('Ответ сервера пуст');
      }
    } catch (error) {
      console.error('Ошибка при переключении темы:', error);
      Alert.alert('Ошибка', 'Не удалось переключить тему.');
    }
  };

  const toggleNotifications = async () => {
    try {
      const newNotificationStatus = !notifications; // Переключаем локально
      setNotifications(newNotificationStatus); // Обновляем локальное состояние
  
      const response = await fetchData(
        `settings/notification?userID=${userID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
          body: JSON.stringify({ notifications: newNotificationStatus }),
        }
      );
  
      if (response) {
        console.log('POST response:', response); // Логируем ответ на POST запрос
  
        // Запрашиваем обновлённое состояние с сервера
        const updatedData = await fetchData(`/getUserAndSettings?userID=${userID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        });
  
        console.log('GET response:', updatedData); // Логируем ответ на GET запрос
  
        if (updatedData.notification !== undefined) {
          setNotifications(updatedData.notification); // Синхронизируем состояние
          Alert.alert('Успех', 'Настройки уведомлений обновлены!');
        } else {
          console.error('Поле notification отсутствует в ответе:', updatedData);
          throw new Error('Обновлённые данные не получены');
        }
      } else {
        throw new Error('Ответ сервера пуст');
      }
    } catch (error) {
      console.error('Ошибка при переключении уведомлений:', error);
      Alert.alert('Ошибка', 'Не удалось обновить настройки уведомлений.');
    }
  };
  
  

  const handleUpdateProfile = async () => {
    try {
      const { fullName, email} = user;
  
      if (!fullName.trim() || !email.trim()) {
        Alert.alert('Ошибка', 'Имя и электронная почта не могут быть пустыми.');
        return;
      }
  
      setLoading(true);
  
      const updatePromises: Promise<void>[] = [];
  
      const fullNameData = JSON.stringify({ fullName: fullName.trim() });
      updatePromises.push(
        fetchData(`update-user?userID=${userID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
          body: fullNameData,
        }).then(() => {})
      );

      const emailData = JSON.stringify({ email: email.trim() });
      console.log('Отправляемые данные для email:', emailData);
      updatePromises.push(
        fetchData(`update-user?userID=${userID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
          body: emailData,
        }).then(() => {})
      );
  

  
      await Promise.all(updatePromises);
  
      Alert.alert('Успех', 'Профиль успешно обновлен!');
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
      Alert.alert('Ошибка', 'Не удалось обновить профиль.');
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push({ pathname: '/ProfileScreen', params: { userID } })}>
          <FontAwesome5 name="arrow-left" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit My Profile</Text>
        <TouchableOpacity onPress={() => router.push({ pathname: './NotificationScreen', params: { userID } })}>
          <FontAwesome5 name="bell" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profileImageWrapper}>
          <Image
            source={{
              uri: user.profilePicture || 'https://via.placeholder.com/150',
            }}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.profileName}>{user.fullName || 'Unknown User'}</Text>
      </View>

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


      <View style={styles.accountSettings}>
        <View style={styles.toggleGroup}>
          <Text style={styles.toggleLabel}>Dark Theme</Text>
          <Switch
            value={darkTheme}
            onValueChange={toggleDarkTheme}
            thumbColor={darkTheme ? '#00C9A7' : '#E8E8E8'}
            trackColor={{ false: '#E8E8E8', true: '#00C9A7' }}
          />
        </View>

        <View style={styles.toggleGroup}>
          <Text style={styles.toggleLabel}>Notifications</Text>
          <Switch
            value={notifications} // Используем правильное имя переменной
            onValueChange={toggleNotifications}
            thumbColor={notifications ? '#00C9A7' : '#E8E8E8'}
            trackColor={{ false: '#E8E8E8', true: '#00C9A7' }}
          />
        </View>

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
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
    margin: 15,
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
