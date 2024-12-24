import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { BarChart } from 'react-native-gifted-charts';
import { Dimensions } from 'react-native';
import MyTargets from '../components/SavingsProgress/MyTargets';
import BottomNavigation from '../components/SavingsProgress/BottomNavigation';
import { router, useLocalSearchParams } from 'expo-router';
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

type DataSets = {
  daily: Transaction[];
  weekly: Transaction[];
  monthly: Transaction[];
};

const AnalysisScreen = () => {
  const { userID } = useLocalSearchParams(); // Получаем userID из параметров
  const [fullName, setFullName] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [dataSets, setDataSets] = useState<DataSets>({
    daily: [],
    weekly: [],
    monthly: [],
  });
  const [totalBalance, setTotalBalance] = useState(0); // Загальний баланс

  const screenWidth = Dimensions.get('window').width;
  const currentDate = new Date().toISOString().split('T')[0];

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
  
          let formattedTransactions: Transaction[] = [];
          // Получаем транзакции
          const transactionsResponse = await fetchData('transactions');
          if (Array.isArray(transactionsResponse)) {
            formattedTransactions = transactionsResponse.map((t: any) => ({
              id: t.transactionID.toString(),
              icon: t.type === 'income' ? 'money-bill-wave' : 'shopping-cart',
              name: t.description,
              time: t.date,
              category: t.categoryID.toString(),
              amount: t.amount, // amount залишається string
              type: t.type,
            }));

            setTransactions(formattedTransactions);

            // Розраховуємо загальний баланс
            const income = formattedTransactions
              .filter((t) => t.type === 'income')
              .reduce((sum, t) => sum + parseFloat(t.amount), 0); // Конвертація в число для підрахунку
            const expense = formattedTransactions
              .filter((t) => t.type === 'expense')
              .reduce((sum, t) => sum + parseFloat(t.amount), 0);

          setTotalBalance(income - expense);
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
        <Text>Loading data...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/HomeScreen')}>
            <FontAwesome5 name="arrow-left" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Analysis</Text>
          <TouchableOpacity>
            <FontAwesome5 name="bell" size={20} color="#FFFFFF" onPress={() => router.push('./NotificationScreen')}/>
          </TouchableOpacity>
        </View>

        {/* Balance */}
        <View style={styles.balanceContainer}>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceValue}>
            ${totalBalance.toLocaleString()}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.balanceItem}>
            <Text style={styles.balanceLabel}>Total Expense</Text>
            <Text style={styles.expenseValue}>
            -${transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0) // Конвертуємо amount у число
        .toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {['daily', 'weekly', 'monthly'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab as 'daily' | 'weekly' | 'monthly')}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chart 
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Income & Expenses</Text>
          {/* Buttons 
            <View style={styles.chartButtonsContainer}>
              <TouchableOpacity style={styles.chartButton} onPress={() => router.push('/Search')}>
              <FontAwesome5 name="search" size={20} color="#006DFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.chartButton} onPress={() => router.push('/Calendar')}>
              <FontAwesome5 name="calendar" size={20} color="#006DFF" />
              </TouchableOpacity>
            </View>
            <BarChart
            data={chartData}
            barWidth={10}
            spacing={20}
            barBorderRadius={4}
            yAxisThickness={1}
            yAxisColor="lightgray"
            xAxisThickness={1}
            xAxisColor="lightgray"
            yAxisTextStyle={{ color: 'gray', fontSize: 12 }}
            stepValue={1000}
            maxValue={Math.max(...chartData.map((d) => d.value))}
            noOfSections={5}
            labelWidth={40}
            xAxisLabelTextStyle={{
              color: 'gray',
              textAlign: 'center',
              fontSize: 12,
              marginTop: 5,
            }}
            width={Dimensions.get('window').width * 0.92}
          />
          </View>*/}

          {/* Income & Expense Summary 
          <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <FontAwesome5 name="arrow-up" size={24} color="#00D699" />
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={styles.summaryValue}>
              ${currentData.reduce((sum, item) => sum + item.income, 0).toLocaleString()}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <FontAwesome5 name="arrow-down" size={24} color="#0068ff" />
              <Text style={styles.summaryLabel}>Expense</Text>
              <Text style={styles.summaryValue}>
              ${currentData.reduce((sum, item) => sum + item.expense, 0).toLocaleString()}
              </Text>
            </View>
          </View>*/}

          {/* Circular Progress Charts */}
            <MyTargets />
        </ScrollView>

      {/* Navigation Menu */}
      <View style={styles.navigation}>
        <BottomNavigation />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6FFF5',
  },
  scrollView: {
    flex: 1,
    paddingBottom: 100,
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
  bellContainer: {
    position: 'absolute',
    right: 20, 
    top: '50%', 
    transform: [{ translateY: -12 }], 
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    margin: 15,
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
  balanceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2A9D8F',
  },
  expenseValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E63946',
  },
  divider: {
    width: 1,
    backgroundColor: '#E8E8E8',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  tab: {
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
  chartButtonsContainer: {
    position: 'absolute',
    top: 10, 
    right: 10, 
    flexDirection: 'row', 
    gap: 10, 
  },
  chartButton: {
    backgroundColor: '#E8FFF7', 
    padding: 10, 
    borderRadius: 8, 
    alignItems: 'center', 
    justifyContent: 'center', 
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  chartContainer: {
    width: '95%', 
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  }, 
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    paddingLeft: 10, 
  },  
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#7D7D7D',
    marginTop: 5,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  targetsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginHorizontal: 20,
  },
  navigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#00C9A7',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default AnalysisScreen;
