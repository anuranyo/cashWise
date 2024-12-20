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
  
const HomeScreen = () => {
    const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly' | 'year'>('daily');

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
    
            {/* Savings and Revenue */}
            <View>
              <SavingsProgress />
              <View/>
              <View>
                <Text>Revenue Last Week</Text>
                <Text>$4,000.00</Text>
                <Text>Food Last Week</Text>
                <Text>-$100.00</Text>
              </View>
          </View>
    
          {/* Tabs */}
          <View>
            {(['daily', 'weekly', 'monthly'] as Array<'daily' | 'weekly' | 'monthly'>).map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabButton,
                  activeTab === tab && styles.activeTab,
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text>
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
                <View style={styles.transactionIcon}>
                  <FontAwesome5
                    name={item.icon}
                    size={24}
                    color={item.type === 'income' ? '#00D699' : '#FF5252'}
                  />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionName}>{item.name}</Text>
                  <Text style={styles.transactionTime}>{item.time}</Text>
                </View>
                <View>
                  <Text
                    style={[
                      styles.transactionAmount,
                      item.type === 'income'
                        ? styles.incomeAmount
                        : styles.expenseAmount,
                    ]}
                  >
                    {item.amount}
                  </Text>
                </View>
              </View>
            )}
          />
        </ScrollView>
    );
};