//Нужно чтобы через парамс передавало на все страницы 
//У транзакций нет айди юзера
//Вернуть 
//  {/* Balance */}
//  <View style={styles.balanceContainer}>
//  <View style={styles.balanceItem}>
//    <Text style={styles.balanceLabel}>Total Balance</Text>
//    <Text style={styles.incomeAmount}>$7,783.00</Text>
//  </View>
//  <View style={styles.divider} />
//  <View style={styles.balanceItem}>
//    <Text style={styles.balanceLabel}>Total Expense</Text>
//    <Text style={styles.expenseAmount}>-$1,187.40</Text>
//  </View>
// </View>

//  {/* Savings and Revenue */}
//  <View style={styles.savingsContainer}>
//    <SavingsProgress />
//    <View style={styles.dividerVertical} />
//    <View style={styles.revenueCont}>
//      <View>
//        <Text style={styles.revenueLabel}>Current Amount</Text>
//        <Text style={styles.revenueAmount}>$4,000.00</Text>
//      </View>
//    </View>
// </View>




import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { fetchData } from '../services/api';
import BottomNavigation from '../components/SavingsProgress/BottomNavigation';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

type Transaction = {
  id: string;
  icon: string;
  name: string;
  time: string;
  category: string;
  amount: string;
  type: string;
};

const HomeScreen = () => {
  const { userID } = useLocalSearchParams(); // Получаем userID из параметров
  const [fullName, setFullName] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  useEffect(() => {
    const fetchServerData = async () => {
      try {
        setLoading(true);

        if (!userID) {
          console.error('userID not found in params');
          return;
        }

        // Получаем данные пользователя
        console.log(userID);
        const userResponse = await fetchData(`getUserByID/${userID}`,{method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        });
        console.log(userResponse);
        if (userResponse && userResponse.fullName) {
          setFullName(userResponse.fullName)
        } else {
          console.error('Invalid user response:', userResponse);
        }

        // Получаем транзакции
        const transactionsResponse = await fetchData('transactions');
        if (Array.isArray(transactionsResponse)) {
          setTransactions(
            transactionsResponse.map((t: any) => ({
              id: t.transactionID.toString(),
              icon: t.type === 'income' ? 'money-bill-wave' : 'shopping-cart',
              name: t.description,
              time: t.date,
              category: t.categoryID.toString(),
              amount: `$${t.amount}`,
              type: t.type,
            }))
          );
        } else {
          console.error('Unexpected transactions response format:', transactionsResponse);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServerData();
  }, [userID]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00C9A7" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>
              Hi, Welcome Back {fullName || 'Loading...'}
            </Text>
            <Text style={styles.subText}>Good Morning</Text>
          </View>
          <TouchableOpacity onPress={() => console.log('Notification Clicked')}>
            <FontAwesome5 name="bell" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {(['daily', 'weekly', 'monthly'] as Array<'daily' | 'weekly' | 'monthly'>).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transactions */}
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <FontAwesome5
                name={item.icon}
                size={24}
                color={item.type === 'income' ? '#00D699' : '#FF5252'}
              />
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionName}>{item.name}</Text>
                <Text style={styles.transactionTime}>{item.time}</Text>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  item.type === 'income' ? styles.incomeAmount : styles.expenseAmount,
                ]}
              >
                {item.amount}
              </Text>
            </View>
          )}
        />
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    backgroundColor: '#E6FFF5',
  },
  header: {
    backgroundColor: '#00C9A7',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 15,
    marginTop: 20,
  },
  tabButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#E8FFF7',
  },
  activeTab: {
    backgroundColor: '#00C9A7',
  },
  tabText: {
    color: '#7D7D7D',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 15,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  transactionTime: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  incomeAmount: {
    color: '#2A9D8F',
  },
  expenseAmount: {
    color: '#E63946',
  },
});

export default HomeScreen;
