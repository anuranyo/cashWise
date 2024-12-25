import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import BottomNavigation from '../components/SavingsProgress/BottomNavigation';
import { router, useLocalSearchParams } from 'expo-router';
import { fetchData } from '../services/api';

type Transaction = {
  transactionID: string;
  userID: string;
  categoryID: string;
  type: string;
  amount: string;
  date: string;
  description: string;
};

type Category = {
  categoryID: string;
  name: string;
  icon: string;
};

const CalendarScreen = () => {
  const { userID } = useLocalSearchParams();
  const [selectedDates, setSelectedDates] = useState<{
    startDate: string | null;
    endDate: string | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState<'spends' | 'categories'>('spends');

  useEffect(() => {
    const fetchTransactionsAndCategories = async () => {
      try {
        const fetchedTransactions: Transaction[] = await fetchData(
          `transactions?userID=${userID}`
        );
        const fetchedCategories: Category[] = await fetchData(
          `categories?userID=${userID}`
        );

        setTransactions(fetchedTransactions);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTransactionsAndCategories();
  }, [userID]);

  const handleDateSelect = (day: { dateString: string }) => {
    const { startDate, endDate } = selectedDates;

    if (!startDate || (startDate && endDate)) {
      setSelectedDates({ startDate: day.dateString, endDate: null });
    } else if (startDate && !endDate) {
      const newEndDate =
        new Date(day.dateString) > new Date(startDate) ? day.dateString : startDate;

      setSelectedDates({
        startDate: new Date(day.dateString) > new Date(startDate) ? startDate : day.dateString,
        endDate: newEndDate,
      });
    }
  };

  const highlightRange = (): Record<
    string,
    { color: string; textColor: string; startingDay?: boolean; endingDay?: boolean }
  > => {
    const { startDate, endDate } = selectedDates;
    if (!startDate || !endDate) return {};

    const markedDates: Record<
      string,
      { color: string; textColor: string; startingDay?: boolean; endingDay?: boolean }
    > = {};
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      const dateString = currentDate.toISOString().split('T')[0];
      markedDates[dateString] = {
        color: '#00C9A7',
        textColor: 'white',
      };
      currentDate.setDate(currentDate.getDate() + 1);
    }

    markedDates[startDate] = {
      startingDay: true,
      color: '#00C9A7',
      textColor: 'white',
    };
    markedDates[endDate] = {
      endingDay: true,
      color: '#00C9A7',
      textColor: 'white',
    };

    return markedDates;
  };

  const handleSearch = () => {
    const { startDate, endDate } = selectedDates;

    if (!startDate || !endDate) {
      alert('Please select a date range.');
      return;
    }

    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate)
      );
    });

    setFilteredTransactions(filtered);
  };

  const handleAnalysis = () => {
    router.push({
      pathname: `/Analysis`,
      params: { userID: userID },
    });
  };
  const handleNotification = () => {
    router.push({
      pathname: `/NotificationScreen`,
      params: { userID: userID },
    });
  };

  return(
  <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleAnalysis}>
            <FontAwesome5 name="arrow-left" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Calendar</Text>
            <TouchableOpacity>
              <FontAwesome5 name="bell" size={20} color="#FFFFFF" onPress={handleNotification}/>
            </TouchableOpacity>
        </View>

        {/* Calendar */}
        <View style={styles.calendarContainer}>
          <Calendar
            markingType="period"
            markedDates={highlightRange()}
            onDayPress={handleDateSelect}
          />
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, activeTab === 'spends' && styles.activeButton]}
            onPress={() => {
              setActiveTab('spends');
              handleSearch();
            }}
          >
            <Text style={[styles.buttonText, activeTab === 'spends' && styles.activeButtonText]}>
              Spends
            </Text>
          </TouchableOpacity>
        </View>

        {/* Transactions */}
        {filteredTransactions.length > 0 && activeTab === 'spends' && (
          <View style={styles.resultsContainer}>
            {filteredTransactions.map((transaction) => {
              const category = categories.find(
                (cat) => cat.categoryID === transaction.categoryID
              );

              return (
                <View key={transaction.transactionID} style={styles.resultItem}>
                  <View style={styles.transactionDetails}>
                    {category?.icon && (
                      <FontAwesome5 name={category.icon} size={20} color="#006DFF" 
                      />
                    )}
                    <View>
                      <Text style={styles.resultCategoryText}>{transaction.description}</Text>
                      <Text style={styles.resultTimeText}>{transaction.date}</Text>
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.resultAmount,
                      { color: transaction.type === 'income' ? '#2A9D8F' : '#E63946' },
                    ]}
                  >
                    {transaction.type === 'income' ? '+' : '-'}$
                    {Math.abs(parseFloat(transaction.amount)).toFixed(2)}
                  </Text>
                </View>
              );
            })}
          </View>
        )}

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
  calendarContainer: {
    margin: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#00C9A7',
  },
  buttonText: {
    fontSize: 16,
    color: '#333333',
  },
  activeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  resultsContainer: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    paddingBottom: 100, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  resultCategory: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultCategoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  resultTimeText: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  resultAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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

export default CalendarScreen;