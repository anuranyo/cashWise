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
import { router } from 'expo-router';

const AnalysisScreen = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly' | 'year'>('daily');

  const screenWidth = Dimensions.get('window').width;

  const dataSets = {
    daily: [
      { label: 'Mon', income: 420, expense: 117.4 },
      { label: 'Tue', income: 500, expense: 200 },
      { label: 'Wed', income: 300, expense: 150 },
      { label: 'Thu', income: 400, expense: 580 },
      { label: 'Fri', income: 350, expense: 170 },
      { label: 'Sat', income: 220, expense: 120 },
      { label: 'Sun', income: 320, expense: 150 },
    ],
    weekly: [
      { label: '1st W.', income: 4000 , expense: 1000 },
      { label: '2nd W.', income: 2000, expense: 1200 },
      { label: '3rd W.', income: 1800, expense: 1100 },
      { label: '4th W.', income: 1700, expense: 1000 },
    ],
    monthly: [
      { label: 'Jan', income: 12000, expense: 7000 },
      { label: 'Feb', income: 15000, expense: 10000 },
      { label: 'Mar', income: 14000, expense: 3000 },
      { label: 'Apr', income: 8000, expense: 5000 },
      { label: 'May', income: 10000, expense: 8000 },
      { label: 'Jun', income: 11000, expense: 9000 },
      { label: 'Jul', income: 11000, expense: 9000 },
    ],
    year: [
      { label: '2020', income: 93000, expense: 70000 },
      { label: '2021', income: 98000, expense: 80000 },
      { label: '2022', income: 89000, expense: 78000 },
      { label: '2023', income: 90000, expense: 75000 },
    ],
  };

  const maxValues = {
    daily: 1000,
    weekly: 5000,
    monthly: 15000,
    year: 100000,
  };

  const stepValues = {
    daily: 200,
    weekly: 1000,
    monthly: 3000,
    year: 20000,
  };

  const currentData = dataSets[activeTab];

  const chartData = currentData.flatMap((item) => [
    { value: item.income, label: item.label, frontColor: '#3BE9DE' }, 
    { value: item.expense, label: '', frontColor: '#006DFF' }, 
    { value: 0, label: '', frontColor: 'transparent' }, 
  ]);
  const maxValue = maxValues[activeTab];
  const stepValue = stepValues[activeTab];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Analysis</Text>
          <TouchableOpacity style={styles.bellContainer} onPress={() => router.push('./NotificationScreen')}>
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
          {/* Buttons */}
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
            barWidth={
              currentData.length <= 4
              ? (Dimensions.get('window').width * 0.2) / currentData.length - 10
              : 5 
          }
          initialSpacing={currentData.length <= 4 ? 20 : 10}
          spacing={
            currentData.length <= 4
              ? (Dimensions.get('window').width * 0.3) / currentData.length - 15
              : 10
          } 
          barBorderRadius={4}
          yAxisThickness={1}
          yAxisColor="lightgray"
          xAxisThickness={1}
          xAxisColor="lightgray"
          yAxisTextStyle={{ color: 'gray', fontSize: 12 }}
          stepValue={stepValue}
          maxValue={maxValue}
          noOfSections={5}
          yAxisLabelTexts={Array.from({ length: 6 }, (_, i) => `${(i * stepValue) / 1000}k`)}
          labelWidth={(Dimensions.get('window').width * 0.8) / chartData.length}
          xAxisLabelTextStyle={{ color: 'gray', textAlign: 'center', fontSize: 12, marginTop: 5, }}
          width={Dimensions.get('window').width * 0.92} 
        />
        </View>

        {/* Income & Expense Summary */}
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
    paddingVertical: 20, 
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20, 
    alignItems: 'center', 
    justifyContent: 'center', 
    position: 'relative',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
