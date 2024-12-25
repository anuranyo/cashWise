import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import BottomNavigation from '../components/SavingsProgress/BottomNavigation';
import { useLocalSearchParams } from 'expo-router';
import { fetchData } from '../services/api';

type Transaction = {
  id: string;
  icon: string;
  name: string;
  time: string;
  category: string;
  amount: string;
  type: string;
};

const TransferScreen = () => {
  const [transactions, setTransactions] = useState<{ month: string; transactions: Transaction[] }[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<{ month: string; transactions: Transaction[] }[]>([]);
  const [selectedTab, setSelectedTab] = useState<'income' | 'expense' | 'all'>('all'); // Tracks the selected tab
  const { userID } = useLocalSearchParams(); // Getting userID from parameters

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetchData(`/transactionsIcon?userID=${userID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        });

        if (Array.isArray(response)) {
          // Group transactions by month
          const groupedTransactions = response.reduce((acc: Record<string, Transaction[]>, t: any) => {
            const date = new Date(t.date);
            const monthName = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
            const monthYear = `${monthName} ${year}`;

            const formattedTransaction: Transaction = {
              id: t.transactionID.toString(),
              icon: t.icon,
              name: t.description,
              time: `${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${monthName} ${date.getDate()}`,
              category: t.categoryID.toString(),
              amount: `${t.type === 'expense' ? '-' : ''}$${t.amount.toFixed(2)}`,
              type: t.type,
            };

            if (!acc[monthYear]) {
              acc[monthYear] = [];
            }
            acc[monthYear].push(formattedTransaction);

            return acc;
          }, {});

          // Convert grouped transactions object to an array
          const formattedTransactions = Object.entries(groupedTransactions).map(([month, transactions]) => ({
            month,
            transactions,
          }));

          setTransactions(formattedTransactions); // Store all transactions
          setFilteredTransactions(formattedTransactions); // Initialize filtered transactions to all
        } else {
          console.error('Unexpected response format:', response);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [userID]);

  // Function to handle tab selection and toggle filtering
  const handleTabPress = (tab: 'income' | 'expense') => {
    if (selectedTab === tab) {
      // Remove filter if the same tab is clicked again
      setSelectedTab('all');
      setFilteredTransactions(transactions);
    } else {
      // Filter transactions by selected type
      setSelectedTab(tab);
      const filtered = transactions.map((section) => ({
        month: section.month,
        transactions: section.transactions.filter((t) => t.type === tab),
      })).filter((section) => section.transactions.length > 0); // Remove empty months
      setFilteredTransactions(filtered);
    }
  };

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

        {/* Toggle Tabs */}
        <View style={styles.balanceSummaryContainer}>
          <TouchableOpacity
            style={[
              styles.balanceSummaryCard,
              selectedTab === 'income' && styles.selectedCard,
            ]}
            onPress={() => handleTabPress('income')}
          >
            <FontAwesome5 name="arrow-up" size={24} color="#00D699" />
            <Text style={styles.balanceSummaryTitle}>Income</Text>
            <Text style={styles.balanceSummaryAmount}>$4,120.00</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.balanceSummaryCard,
              selectedTab === 'expense' && styles.selectedCard,
            ]}
            onPress={() => handleTabPress('expense')}
          >
            <FontAwesome5 name="arrow-down" size={24} color="#1A73E8" />
            <Text style={styles.balanceSummaryTitle}>Expense</Text>
            <Text style={styles.balanceSummaryAmountExpense}>$1,187.40</Text>
          </TouchableOpacity>
        </View>

        {/* Transactions Section */}
        {filteredTransactions.map((section) => (
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
                      transaction.type === 'income'
                        ? styles.incomeAmount
                        : styles.expenseAmount,
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
  selectedCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#00C9A7',
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
});

export default TransferScreen;
