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

const SearchScreen = () => {

    return(
    <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerText}>Search</Text>
              <TouchableOpacity>
                <FontAwesome5 name="bell" size={24} color="#fff" />
              </TouchableOpacity>
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

export default SearchScreen;
