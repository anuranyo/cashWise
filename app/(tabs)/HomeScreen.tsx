import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import SavingsProgress from '../components/SavingsProgress/SavingsProgress';

// Типизация для транзакций
type Transaction = {
  id: string;
  icon: string;
  name: string;
  time: string;
  category: string;
  amount: string;
  type: string;
};

// Типизация объекта данных транзакций
const transactionsData: Record<'daily' | 'weekly' | 'monthly', Transaction[]> = {
  daily: [
    { id: '1', icon: 'coffee', name: 'Coffee', time: '08:30 - Today', category: 'Daily', amount: '-$5.00', type: 'expense' },
    { id: '2', icon: 'bus', name: 'Bus Ticket', time: '09:15 - Today', category: 'Daily', amount: '-$2.50', type: 'expense' },
  ],
  weekly: [
    { id: '3', icon: 'shopping-cart', name: 'Groceries', time: '17:00 - Apr 24', category: 'Weekly', amount: '-$100.00', type: 'expense' },
    { id: '4', icon: 'utensils', name: 'Dinner', time: '19:00 - Apr 26', category: 'Weekly', amount: '-$50.00', type: 'expense' },
  ],
  monthly: [
    { id: '5', icon: 'money-bill-wave', name: 'Salary', time: '18:27 - Apr 30', category: 'Monthly', amount: '$4,000.00', type: 'income' },
    { id: '6', icon: 'home', name: 'Rent', time: '08:30 - Apr 15', category: 'Monthly', amount: '-$674.40', type: 'expense' },
  ],
};

const HomeScreen = () => {
  // Явная типизация для activeTab
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const transactions = transactionsData[activeTab];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Hi, Welcome Back</Text>
          <Text style={styles.subText}>Good Morning</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/NotificationScreen')}>
          <FontAwesome5 name="bell" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Balance */}
      <View style={styles.balanceContainer}>
        <View style={styles.balanceItem}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.incomeAmount}>$7,783.00</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.balanceItem}>
          <Text style={styles.balanceLabel}>Total Expense</Text>
          <Text style={styles.expenseAmount}>-$1,187.40</Text>
        </View>
      </View>

        {/* Savings and Revenue */}
        <View style={styles.savingsContainer}>
          <SavingsProgress />
          <View style={styles.dividerVertical} />
          <View style={styles.revenueCont}>
            <View>
              <Text style={styles.revenueLabel}>Revenue Last Week</Text>
              <Text style={styles.revenueAmount}>$4,000.00</Text>
            </View>
            <View>
              <Text style={styles.foodLabel}>Money withdrawn last week</Text>
              <Text style={styles.foodAmount}>-$100.00</Text>
            </View>
          </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {(['daily', 'weekly', 'monthly'] as Array<'daily' | 'weekly' | 'monthly'>).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTab,
            ]}
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
            <View style={styles.transactionIcon}>
              <FontAwesome5
                name={item.icon}
                size={24}
                color={item.type === 'income' ? '#00D699' : '#FF5252'}
              />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionName}>{item.name}</Text>
              <Text style={styles.transactionTime}>{item.time}</Text>
            </View>
            <View>
              <Text
                style={[
                  styles.transactionAmount,
                  item.type === 'income'
                    ? styles.incomeAmount
                    : styles.expenseAmount,
                ]}
              >
                {item.amount}
              </Text>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  container: {
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
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 15,
    marginTop: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  balanceItem: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  divider: {
    width: 1,
    backgroundColor: '#E8E8E8',
    height: '100%',
  },
  savingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 15,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  savingsItem: {
    alignItems: 'center',
  },
  savingsText: {
    fontSize: 14,
    color: '#7D7D7D',
    marginTop: 10,
  },
  dividerVertical: {
    width: 1,
    backgroundColor: '#E8E8E8',
    height: '100%',
  },
  revenueCont: {
      justifyContent: 'center',
  },
  revenueLabel: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  revenueAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2A9D8F',
  },
  foodLabel: {
    fontSize: 14,
    color: '#7D7D7D',
    marginTop: 10,
  },
  foodAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E63946',
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  transactionIcon: {
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2A9D8F',
  },
  expenseAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E63946',
  },
});

export default HomeScreen;
