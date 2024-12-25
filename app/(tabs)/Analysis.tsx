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
  date: string;
  category: string;
  amount: string;
  type: string;
  userID: string;
};

type ChartData = {
  value: number;
  label: string;
  frontColor: string;
};

const AnalysisScreen = () => {
  const { userID } = useLocalSearchParams(); // Getting userID from parameters
  const [fullName, setFullName] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const handleSearch = () => {
      router.push({
        pathname: `/Search`,
        params: { userID: userID },
      });
  };
  const handleCalendar = () => {
    router.push({
      pathname: `/Calendar`,
      params: { userID: userID },
    });
  };
  const handleHome = () => {
    router.push({
      pathname: `/HomeScreen`,
      params: { userID: userID },
    });
  };
  const handleNotification = () => {
    router.push({
      pathname: `/NotificationScreen`,
      params: { userID: userID },
    });
  };

  const today = new Date();
  
  const isToday = (date: Date) => date.toDateString() === today.toDateString();
  const isThisWeek = (date: Date) => {
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return date >= startOfWeek && date <= endOfWeek;
  };
  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const parseAmount = (amount: string): number => {
    const parsed = parseFloat(amount);
    return isNaN(parsed) ? 0 : parsed;
  };

  const fetchAllTransactions = async () => {
    try {
      if (!userID) {
        console.error('userID not provided');
        return;
      }

      const response = await fetchData(`transactions?userID=${userID}`);
      if (Array.isArray(response)) {
        setTransactions(
          response.map((t) => ({
            ...t,
            date: new Date(t.date).toISOString(), 
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const calculateSummary = (filteredTransactions: Transaction[]) => {
    const totalIncome = filteredTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + parseAmount(t.amount), 0);
    const totalExpense = filteredTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + parseAmount(t.amount), 0);

    setIncome(totalIncome);
    setExpense(totalExpense);
  };

  const calculateTotalByType = (transactions: Transaction[], type: string): string => {
    const total = transactions
      .filter((t) => t.type === type)
      .reduce((sum, t) => sum + parseFloat(t.amount), 0); 
  
    return total.toLocaleString(undefined, { minimumFractionDigits: 2 });
  };
  
  const updateChartData = () => {
    let filteredTransactions: Transaction[] = [];
    const data: ChartData[] = [];
  
    if (activeTab === 'daily') {
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        return date;
      });
  
      last7Days.reverse().forEach((date) => {
        const dayTransactions = transactions.filter(
          (t) => new Date(t.date).toDateString() === date.toDateString()
        );
        filteredTransactions = [...filteredTransactions, ...dayTransactions];
  
        const dayIncome = dayTransactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + parseAmount(t.amount), 0);
        const dayExpense = dayTransactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + parseAmount(t.amount), 0);
  
        data.push({
          value: dayIncome,
          label: date.toLocaleDateString('en-US', { weekday: 'short' }),
          frontColor: '#00D699',
        });
  
        data.push({
          value: dayExpense,
          label: '',
          frontColor: '#006DFF',
        });
      });
    } else if (activeTab === 'weekly') {
      const currentWeek = getWeekNumber(today);
  
      for (let weekOffset = 3; weekOffset >= 0; weekOffset--) {
        const weekTransactions = transactions.filter(
          (t) => getWeekNumber(new Date(t.date)) === currentWeek - weekOffset
        );
        filteredTransactions = [...filteredTransactions, ...weekTransactions];
  
        const weekIncome = weekTransactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + parseAmount(t.amount), 0);
  
        const weekExpense = weekTransactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + parseAmount(t.amount), 0);
  
        data.push({
          value: weekIncome,
          label: `W ${currentWeek - weekOffset}`,
          frontColor: '#00D699',
        });
  
        data.push({
          value: weekExpense,
          label: '',
          frontColor: '#006DFF',
        });
      }
    } else if (activeTab === 'monthly') {
      const last6Months = Array.from({ length: 6 }, (_, i) => {
        const date = new Date(today);
        date.setMonth(today.getMonth() - i);
        return date;
      });
  
      last6Months.reverse().forEach((month) => {
        const monthTransactions = transactions.filter(
          (t) =>
            new Date(t.date).getMonth() === month.getMonth() &&
            new Date(t.date).getFullYear() === month.getFullYear()
        );
        filteredTransactions = [...filteredTransactions, ...monthTransactions];
  
        const monthIncome = monthTransactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + parseAmount(t.amount), 0);
  
        const monthExpense = monthTransactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + parseAmount(t.amount), 0);
  
        data.push({
          value: monthIncome,
          label: month.toLocaleDateString('en-US', { month: 'short' }),
          frontColor: '#00D699',
        });
  
        data.push({
          value: monthExpense,
          label: '',
          frontColor: '#006DFF',
        });
      });
    }
  
    setChartData(data);
    calculateSummary(filteredTransactions);  
  };

  useEffect(() => {
    setLoading(true);
    fetchAllTransactions().then(() => {
      updateChartData();
      setLoading(false);
    });
  }, [activeTab]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00C9A7" />
        <Text>Loading...</Text>
      </View>
    );
  }
  
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
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleHome}>
            <FontAwesome5 name="arrow-left" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Analysis</Text>
          <TouchableOpacity>
            <FontAwesome5 name="bell" size={20} color="#FFFFFF" onPress={handleNotification}/>
          </TouchableOpacity>
        </View>

        {/* Balance */}
        <View style={styles.balanceContainer}>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceValue}>
              ${calculateTotalByType(transactions, 'income')}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.balanceItem}>
            <Text style={styles.balanceLabel}>Total Expense</Text>
            <Text style={styles.expenseValue}>
            -${calculateTotalByType(transactions, 'expense')}
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

        {/* Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Income & Expenses</Text>
          {/* Buttons */}
            <View style={styles.chartButtonsContainer}>
              <TouchableOpacity style={styles.chartButton} onPress={handleSearch}>
              <FontAwesome5 name="search" size={20} color="#006DFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.chartButton} onPress={handleCalendar}>
              <FontAwesome5 name="calendar" size={20} color="#006DFF" />
              </TouchableOpacity>
            </View>
            <BarChart
              data={chartData}
              barWidth={15}
              spacing={15}
              barBorderRadius={0}
              yAxisThickness={1}
              yAxisColor="gray"
              yAxisTextStyle={{ color: 'gray', fontSize: 11 }}
              xAxisThickness={1}
              xAxisColor="gray"
              xAxisLabelTextStyle={{
                color: 'gray',
                fontSize: 12,
                textAlign: 'center',
                flex: 1,
              }}
              noOfSections={activeTab === 'daily' ? 6 : activeTab === 'weekly' ? 5 : 6} 
              stepValue={activeTab === 'daily' ? 100 : activeTab === 'weekly' ? 200 : 500} 
              maxValue={activeTab === 'daily' ? 500 : activeTab === 'weekly' ? 1000 : 3000} 
              width={Dimensions.get('window').width*0.8} 
              hideRules={false}
              rulesColor="lightgray"
              showXAxisIndices
              xAxisIndicesHeight={2}
              xAxisIndicesColor="lightgray"
            />
        </View>

          {/* Income & Expense Summary */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <FontAwesome5 name="arrow-up" size={24} color="#00D699" />
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={styles.summaryValue}>
              ${income.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <FontAwesome5 name="arrow-down" size={24} color="#0068ff" />
              <Text style={styles.summaryLabel}>Expense</Text>
              <Text style={styles.summaryValue}>
              ${expense.toFixed(2)}
              </Text>
            </View>
          </View>

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
    color: '#006dff',
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
    width: '92%', 
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
