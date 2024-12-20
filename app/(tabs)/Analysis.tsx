import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import BottomNavigation from '../components/SavingsProgress/BottomNavigation';

const AnalysisScreen = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly' | 'year'>('daily');

  const screenWidth = Dimensions.get('window').width;

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [4000, 5000, 7000, 8000, 6000, 2000, 9000],
        color: () => `#00C9A7`,
      },
    ],
  };

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
          <Text style={styles.chartLabel}>Income & Expenses</Text>
          <LineChart
            data={chartData}
            width={screenWidth - 30}
            height={220}
            chartConfig={{
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              color: (opacity = 1) => `rgba(0, 121, 107, ${opacity})`,
              labelColor: () => `#7D7D7D`,
            }}
            bezier
            style={styles.chartLabel}
          />
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
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  chartLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
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
