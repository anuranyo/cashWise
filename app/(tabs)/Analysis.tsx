import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import BottomNavigation from '../components/SavingsProgress/BottomNavigation';

const AnalysisScreen = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly' | 'year'>('daily');

  const screenWidth = Dimensions.get('window').width;

  const dataSets = {
    daily: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      income: [4000, 7000, 5000, 10000, 6000, 2000, 8000],
      expense: [2000, 4000, 3000, 6000, 5000, 1000, 7000],
    },
    weekly: {
      labels: ['1st Week', '2nd Week', '3rd Week', '4th Week'],
      income: [11000, 14000, 10000, 12000],
      expense: [8000, 20000, 9000, 15000],
    },
    monthly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      income: [47000, 52000, 60000, 49000, 45000, 43000],
      expense: [32000, 40000, 35000, 37000, 30000, 35000],
    },
    year: {
      labels: ['2018', '2019', '2020', '2021', '2022'],
      income: [400000, 450000, 430000, 470000, 500000],
      expense: [250000, 280000, 300000, 270000, 300000],
    },
  };

  const currentData = dataSets[activeTab];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Analysis</Text>
          <TouchableOpacity>
            <FontAwesome5 name="bell" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Balance */}
        <View style={styles.balanceContainer}>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceValue}>$7,783.00</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.balanceItem}>
            <Text style={styles.balanceLabel}>Total Expense</Text>
            <Text style={styles.expenseValue}>-$1,187.40</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {['daily', 'weekly', 'monthly', 'year'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab as 'daily' | 'weekly' | 'monthly' | 'year')}
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
          <BarChart
            data={{
              labels: currentData.labels,
              datasets: [
                { data: currentData.income, color: () => `rgba(34, 193, 195, 1)` },
                { data: currentData.expense, color: () => `rgba(255, 82, 82, 1)` },
              ],
            }}
            width={Dimensions.get('window').width - 60} 
            height={220} 
            yAxisLabel="$" 
            yAxisSuffix="k" 
            chartConfig={{
              backgroundGradientFrom: '#E6FFF5',
              backgroundGradientTo: '#E6FFF5',
              decimalPlaces: 0, 
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
              labelColor: () => `#7D7D7D`, 
              propsForBackgroundLines: {
                strokeWidth: 1,
                strokeDasharray: '5,5',
                stroke: '#E8E8E8',
              },
              propsForLabels: {
                fontSize: 12, 
                fill: '#7D7D7D', 
              },
            }}
            style={{
              marginVertical: 10,
              borderRadius: 10,
            }}
            fromZero 
          />
        </View>

        {/* Income & Expense Summary */}
        <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <FontAwesome5 name="arrow-up" size={24} color="#00D699" />
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={styles.summaryValue}>
                ${currentData.income.reduce((sum, val) => sum + val, 0).toLocaleString()}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <FontAwesome5 name="arrow-" size={24} color="#00D699" />
              <Text style={styles.summaryLabel}>Expense</Text>
              <Text style={styles.summaryValue}>
                ${currentData.expense.reduce((sum, val) => sum + val, 0).toLocaleString()}
              </Text>
            </View>
          </View>
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
  },
  header: {
    backgroundColor: '#00C9A7',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
  chartContainer: {
    marginHorizontal: 15, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 15,
    padding: 15, 
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
