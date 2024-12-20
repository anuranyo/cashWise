import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import BottomNavigation from '../components/SavingsProgress/BottomNavigation';
import { router } from 'expo-router';

type Transaction = {
  id: string;
  icon: string;
  name: string;
  time: string;
  category: string;
  amount: string;
  type: string;
};

const transactionsData = [
  {
    month: 'April',
    transactions: [
      { id: '1', icon: 'money-bill-wave', name: 'Salary', time: '18:27 - April 30', category: 'Monthly', amount: '$4,000.00', type: 'income' },
      { id: '2', icon: 'shopping-basket', name: 'Groceries', time: '17:00 - April 24', category: 'Pantry', amount: '-$100.00', type: 'expense' },
      { id: '3', icon: 'home', name: 'Rent', time: '8:30 - April 15', category: 'Rent', amount: '-$674.40', type: 'expense' },
      { id: '4', icon: 'car', name: 'Transport', time: '9:30 - April 08', category: 'Fuel', amount: '-$4.13', type: 'expense' },
    ],
  },
  {
    month: 'March',
    transactions: [
      { id: '5', icon: 'utensils', name: 'Food', time: '19:30 - March 31', category: 'Dinner', amount: '-$70.40', type: 'expense' },
    ],
  },
];

const TransferScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>

        <Text style={styles.headerTitle}>Transaction</Text>

      </View>

      <ScrollView style={styles.container}>
        {/* Balance Section */}
        <View style={styles.balanceCard}>
          <Text style={styles.cardTitle}>Total Balance</Text>
          <Text style={styles.cardAmount}>$7,783.00</Text>
        </View>
        <View style={styles.balanceSummaryContainer}>
        <View style={styles.balanceSummaryCard}>
          <FontAwesome5 name="arrow-up" size={24} color="#00D699" />
          <Text style={styles.balanceSummaryTitle}>Income</Text>
          <Text style={styles.balanceSummaryAmount}>$4,120.00</Text>
        </View>
        <View style={styles.balanceSummaryCard}>
          <FontAwesome5 name="arrow-down" size={24} color="#1A73E8" />
          <Text style={styles.balanceSummaryTitle}>Expense</Text>
          <Text style={styles.balanceSummaryAmountExpense}>$1,187.40</Text>
        </View>
      </View>


        {/* Transactions Section */}
        {transactionsData.map((section) => (
          <View key={section.month}>
            <Text style={styles.monthTitle}>{section.month}</Text>
            {section.transactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.iconContainer}>
                  <FontAwesome5 name={transaction.icon} size={20} color="#00C9A7" />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionName}>{transaction.name}</Text>
                  <Text style={styles.transactionTime}>{transaction.time}</Text>
                </View>
                <View>
                  <Text
                    style={[
                      styles.transactionAmount,
                      transaction.type === 'income' ? styles.incomeAmount : styles.expenseAmount,
                    ]}
                  >
                    {transaction.amount}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6FFF5',
    paddingHorizontal: 15,
  },
  header: {
    backgroundColor: '#00C9A7',
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 16,
    color: '#7D7D7D',
  },
  cardAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2A9D8F',
    marginTop: 5,
  },
  balanceSummaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  balanceSummaryCard: {
    flex: 1,
    backgroundColor: '#E6FFF5',
    borderRadius: 15,
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  balanceSummaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 10,
  },
  balanceSummaryAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00D699',
    marginTop: 5,
  },
  balanceSummaryAmountExpense: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A73E8',
    marginTop: 5,
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
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  iconContainer: {
    backgroundColor: '#E8FFF7',
    padding: 10,
    borderRadius: 25,
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 10,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  transactionTime: {
    fontSize: 14,
    color: '#7D7D7D',
    marginTop: 5,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransferScreen;
