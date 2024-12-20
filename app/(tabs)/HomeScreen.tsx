import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const transactions = [
  {
    id: '1',
    icon: 'money-bill-wave',
    name: 'Salary',
    time: '18:27 - April 30',
    category: 'Monthly',
    amount: '$4,000.00',
    type: 'income',
  },
  {
    id: '2',
    icon: 'shopping-basket',
    name: 'Groceries',
    time: '17:00 - April 24',
    category: 'Pantry',
    amount: '-$100.00',
    type: 'expense',
  },
  {
    id: '3',
    icon: 'home',
    name: 'Rent',
    time: '8:30 - April 15',
    category: 'Rent',
    amount: '-$674.40',
    type: 'expense',
  },
];

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Hi, Welcome Back</Text>
          <Text style={styles.subText}>Good Morning</Text>
        </View>
        <TouchableOpacity>
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
        <View style={styles.savingsItem}>
          <FontAwesome5 name="car" size={30} color="#00D699" />
          <Text style={styles.savingsText}>Savings On Goals</Text>
        </View>
        <View style={styles.dividerVertical} />
        <View>
          <Text style={styles.revenueLabel}>Revenue Last Week</Text>
          <Text style={styles.revenueAmount}>$4,000.00</Text>
          <Text style={styles.foodLabel}>Food Last Week</Text>
          <Text style={styles.foodAmount}>-$100.00</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
          <Text style={styles.activeTabText}>Monthly</Text>
        </TouchableOpacity>
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
    height: 100,
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
});



export default HomeScreen;
