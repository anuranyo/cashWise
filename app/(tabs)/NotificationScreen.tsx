import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

type Notification = {
  id: string;
  icon: string;
  title: string;
  description: string;
  time: string;
  category?: string;
  amount?: string;
};

const notificationsData: Array<{ section: string; data: Notification[] }> = [
  {
    section: 'Today',
    data: [
      {
        id: '1',
        icon: 'bell',
        title: 'Reminder!',
        description: 'Set up your automatic savings to meet your savings goal...',
        time: '17:00 - April 24',
      },
      {
        id: '2',
        icon: 'star',
        title: 'New Update',
        description: 'Set up your automatic savings to meet your savings goal...',
        time: '17:00 - April 24',
      },
    ],
  },
  {
    section: 'Yesterday',
    data: [
      {
        id: '3',
        icon: 'dollar-sign',
        title: 'Transactions',
        description: 'A new transaction has been registered\nGroceries | Pantry | -$100.00',
        time: '17:00 - April 24',
      },
      {
        id: '4',
        icon: 'bell',
        title: 'Reminder!',
        description: 'Set up your automatic savings to meet your savings goal...',
        time: '17:00 - April 24',
      },
    ],
  },
  {
    section: 'This Weekend',
    data: [
      {
        id: '5',
        icon: 'file-invoice-dollar',
        title: 'Expense Record',
        description: 'We recommend that you be more attentive to your finances.',
        time: '17:00 - April 24',
      },
      {
        id: '6',
        icon: 'dollar-sign',
        title: 'Transactions',
        description: 'A new transaction has been registered\nFood | Dinner | -$70.40',
        time: '17:00 - April 24',
      },
      {
        id: '7',
        icon: 'dollar-sign',
        title: 'Transactions',
        description: 'A new transaction has been registered\nFood | Dinner | -$70.40',
        time: '17:00 - April 24',
      },
      {
        id: '8',
        icon: 'dollar-sign',
        title: 'Transactions',
        description: 'A new transaction has been registered\nFood | Dinner | -$70.40',
        time: '17:00 - April 24',
      },
    ],
  },
];

const NotificationScreen = () => {
  const { userID } = useLocalSearchParams();
   
  const handleNotification = () => {
    router.push({
      pathname: `/HomeScreen`,
      params: { userID: userID },
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleNotification}>
          <FontAwesome5 name="arrow-left" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <TouchableOpacity>
          <FontAwesome5 name="bell" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <FlatList
        data={notificationsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            {/* Section Title */}
            <Text style={styles.sectionTitle}>{item.section}</Text>
            {item.data.map((notification) => (
              <View key={notification.id} style={styles.notificationItem}>
                {/* Icon */}
                <View style={styles.iconContainer}>
                  <FontAwesome5 name={notification.icon} size={20} color="#00C9A7" />
                </View>

                {/* Text Content */}
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  <Text style={styles.notificationDescription}>{notification.description}</Text>
                </View>

                {/* Time */}
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6FFF5',
  },
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 20,
    marginLeft: 15,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8FFF7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationContent: {
    flex: 1,
    marginLeft: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#7D7D7D',
    marginTop: 5,
  },
  notificationTime: {
    fontSize: 14,
    color: '#7D7D7D',
  },
});

export default NotificationScreen;
