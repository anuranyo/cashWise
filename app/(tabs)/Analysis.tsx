import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { BarChart } from 'react-native-gifted-charts';
import { Dimensions } from 'react-native';
import BottomNavigation from '../components/SavingsProgress/BottomNavigation';

const AnalysisScreen = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly' | 'year'>('daily');

  const screenWidth = Dimensions.get('window').width;

  const dataSets = {
    daily: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [
        { value: 4000, color: '#5ABF2A' }, // Income
        { value: 2000, color: '#655FD5' }, // Expense
        { value: 7000, color: '#5ABF2A' },
        { value: 4000, color: '#655FD5' },
        { value: 5000, color: '#5ABF2A' },
        { value: 3000, color: '#655FD5' },
        { value: 10000, color: '#5ABF2A' },
        { value: 6000, color: '#655FD5' },
        { value: 6000, color: '#5ABF2A' },
        { value: 2000, color: '#655FD5' },
        { value: 8000, color: '#5ABF2A' },
        { value: 7000, color: '#655FD5' },
      ],
    },
    weekly: {
      labels: ['1st Week', '2nd Week', '3rd Week', '4th Week'],
      data: [
        { value: 11000, color: '#5ABF2A' },
        { value: 8000, color: '#655FD5' },
        { value: 14000, color: '#5ABF2A' },
        { value: 20000, color: '#655FD5' },
        { value: 10000, color: '#5ABF2A' },
        { value: 9000, color: '#655FD5' },
        { value: 12000, color: '#5ABF2A' },
        { value: 15000, color: '#655FD5' },
      ],
    },
    monthly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [
        { value: 47000, color: '#5ABF2A' },
        { value: 32000, color: '#655FD5' },
        { value: 52000, color: '#5ABF2A' },
        { value: 40000, color: '#655FD5' },
        { value: 60000, color: '#5ABF2A' },
        { value: 35000, color: '#655FD5' },
        { value: 49000, color: '#5ABF2A' },
        { value: 37000, color: '#655FD5' },
        { value: 45000, color: '#5ABF2A' },
        { value: 30000, color: '#655FD5' },
        { value: 43000, color: '#5ABF2A' },
        { value: 35000, color: '#655FD5' },
      ],
    },
    year: {
      labels: ['2018', '2019', '2020', '2021', '2022'],
      data: [
        { value: 400000, color: '#5ABF2A' },
        { value: 250000, color: '#655FD5' },
        { value: 450000, color: '#5ABF2A' },
        { value: 280000, color: '#655FD5' },
        { value: 430000, color: '#5ABF2A' },
        { value: 300000, color: '#655FD5' },
        { value: 470000, color: '#5ABF2A' },
        { value: 270000, color: '#655FD5' },
        { value: 500000, color: '#5ABF2A' },
        { value: 300000, color: '#655FD5' },
      ],
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
            data={currentData.data}
            height={220}
            barWidth={12}
            spacing={10}
            yAxisThickness={0}
            xAxisThickness={0}
          />
        </View>

        {/* Income & Expense Summary */}
        <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <FontAwesome5 name="arrow-up" size={24} color="#00D699" />
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={styles.summaryValue}>
              ${currentData.data.filter((_, index) => index % 2 === 0)
                .reduce((sum, item) => sum + item.value, 0).toLocaleString()}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <FontAwesome5 name="arrow-" size={24} color="#00D699" />
              <Text style={styles.summaryLabel}>Expense</Text>
              <Text style={styles.summaryValue}>
                ${currentData.data.filter((_, index) => index % 2 !== 0) 
                  .reduce((sum, item) => sum + item.value, 0).toLocaleString()}
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
