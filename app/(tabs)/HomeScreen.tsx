import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { fetchData } from '../services/api';
import BottomNavigation from '../components/SavingsProgress/BottomNavigation';
import SavingsProgress from '../components/SavingsProgress/SavingsProgress';

type Transaction = {
  id: string;
  icon: string;
  name: string;
  time: string;
  category: string;
  amount: string;
  type: string;
  userID: string;
};

const HomeScreen = () => {
  const { userID } = useLocalSearchParams(); // Getting userID from parameters
  const [fullName, setFullName] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [goal, setGoal] = useState({
    name: '',
    targetAmount: 0,
    currentAmount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'day' | 'week' | 'month'>('day');
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchServerData = async () => {
      try {
        setLoading(true);
  
        // Check if userID exists
        if (!userID) {
          console.error('userID not found in params');
          return;
        }
  
        // Fetch user data
        const userResponse = await fetchData(`getUserByID/${userID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        });
  
        if (userResponse && userResponse.fullName) {
          setFullName(userResponse.fullName);
        } else {
          console.error('Invalid user response:', userResponse);
        }
        console.log('Fetching data for userID:', userID);
  
        // Fetch transactions data based on activeTab
        const transactionsResponse = await fetchData(
          `transactions/filter?period=${activeTab}&date=${today}&userID=${userID}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true',
            },
          }
        );
  
        console.log('Transactions response:', transactionsResponse);
  
        if (Array.isArray(transactionsResponse)) {
          const formattedTransactions = transactionsResponse.map((t: any) => ({
            id: t.transactionID.toString(),
            userID: t.userID.toString(),
            icon: t.type === 'income' ? 'money-bill-wave' : 'shopping-cart',
            name: t.description,
            time: new Date(t.date).toLocaleString(), // Format date
            category: t.categoryID.toString(),
            amount: `$${t.amount.toFixed(2)}`, // Format amount
            type: t.type,
          }));
          setTransactions(formattedTransactions);
        }
  
        // Fetch total income
        const incomeResponse = await fetchData(`transaction/getTotalIncome?userID=${userID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        });
  
        if (incomeResponse?.totalIncome) {
          setTotalIncome(incomeResponse.totalIncome);
        } else {
          console.error('Invalid total income response:', incomeResponse);
        }
  
        // Fetch total expense
        const expenseResponse = await fetchData(`transaction/getTotalExpense?userID=${userID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        });
  
        if (expenseResponse?.totalExpense) {
          setTotalExpense(expenseResponse.totalExpense);
        } else {
          console.error('Invalid total expense response:', expenseResponse);
        }
  
        // Fetch goal transactions to calculate the current amount
        const goalTransactionsResponse = await fetchData(
          `transactions-goal?userID=${userID}&type=goal`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true',
            },
          }
        );

        console.log("Goal Transactions Response:", goalTransactionsResponse);

        const currentAmount = Array.isArray(goalTransactionsResponse)
          ? goalTransactionsResponse.reduce(
              (sum: number, transaction: any) => sum + (transaction.amount || 0),
              0
            )
          : 0;

        console.log("Calculated Current Amount:", currentAmount);

        // Fetch goal details
        const goalResponse = await fetchData(`goals?userID=${userID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        });

        console.log("Goal Response:", goalResponse);

        if (Array.isArray(goalResponse) && goalResponse.length > 0) {
          const { name, targetAmount } = goalResponse[0];

          setGoal({
            name: name || 'Unnamed Goal',
            targetAmount: targetAmount || 0,
            currentAmount, // Dynamically calculated
          });

          console.log("Goal Set to State:", {
            name: name || 'Unnamed Goal',
            targetAmount: targetAmount || 0,
            currentAmount,
          });
        } else {
          console.error('No goals found for the user');
          setGoal({
            name: 'Unnamed Goal',
            targetAmount: 0,
            currentAmount: 0,
          });
        }


      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchServerData();
  }, [userID, activeTab]);
  
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00C9A7" />
        <Text>Loading...</Text>
      </View>
    );
  }
  
  //const totalBalance = totalIncome - totalExpense;

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

        {/* Balance */}
        <View style={styles.balanceContainer}>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.incomeAmount}>${totalIncome.toFixed(2)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.balanceItem}>
            <Text style={styles.balanceLabel}>Total Expense</Text>
            <Text style={styles.expenseAmount}>-${totalExpense.toFixed(2)}</Text>
          </View>
        </View>

      {/* Savings and Revenue */}
      <View style={styles.savingsContainer}>
        <SavingsProgress
          currentAmount={goal.currentAmount}
          targetAmount={goal.targetAmount}
          goalName={goal.name}
        />
        <View style={styles.dividerVertical} />
        <View style={styles.revenueCont}>
          <View>
            <Text style={styles.revenueLabel}>Current Amount</Text>
            <Text style={styles.revenueAmount}>${goal.currentAmount.toFixed(2)}</Text>
          </View>
        </View>
      </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {(['day', 'week', 'month'] as Array<'day' | 'week' | 'month'>).map((tab) => (
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
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  balanceItem: {
    alignItems: 'center',
    flex: 1,
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  incomeAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00C9A7',
    marginTop: 5,
  },
  expenseAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#',
    marginTop: 5,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E8E8E8',
    marginHorizontal: 10,
  },
  savingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    padding: 20,
    backgroundColor: '#00C9A7',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  dividerVertical: {
    width: 1,
    height: '100%',
    backgroundColor: '#E8E8E8',
    marginHorizontal: 10,
  },
  revenueCont: {
    flex: 1,
    alignItems: 'center',
  },
  revenueLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  revenueAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 5,
  },
});

export default HomeScreen;
