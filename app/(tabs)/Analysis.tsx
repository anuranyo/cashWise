import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import SavingsProgress from '../components/SavingsProgress/SavingsProgress';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
  
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
        <ScrollView>
          {/* Header */}
          <View>
            <View>
              <Text>Hi, Welcome Back</Text>
              <Text>Good Morning</Text>
            </View>
            <TouchableOpacity>
              <FontAwesome5 name="bell" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
    
          {/* Balance */}
          <View>
            <View>
              <Text>Total Balance</Text>
              <Text>$7,783.00</Text>
            </View>
            <View/>
            <View>
              <Text>Total Expense</Text>
              <Text>-$1,187.40</Text>
            </View>
          </View>
    
          {/* Tabs */}
          <View>
            {['daily', 'weekly', 'monthly', 'year'].map((tab) => (
            <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab as 'daily' | 'weekly' | 'monthly' | 'year')}
            >
                <Text>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
            </TouchableOpacity>
            ))}
        </View>
    
        { /* Chart */ }
        <View>
            <Text>Income & Expenses</Text>
            <LineChart
                data={chartData}
                width={screenWidth - 30}
                height={220}
            chartConfig={{
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 121, 107, ${opacity})`, // Колір лінії
            labelColor: () => `#7D7D7D`, 
            }}
            bezier 
            />

        </View>

        {/* Income & Expense Summary */}
        <View>
            <View>
                <FontAwesome5 name="arrow-up" size={24} color="#00D699" />
                <Text>Income</Text>
                <Text>$4,120.00</Text>
            </View>
            <View>
                <FontAwesome5 name="arrow-down" size={24} color="#FF5252" />
                <Text>Expense</Text>
                <Text>$1,187.40</Text>
            </View>
        </View>
        </ScrollView>
    );
};