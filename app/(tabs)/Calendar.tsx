import React, { useState } from 'react';
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
import { router } from 'expo-router';

const CalendarScreen = () => {
  const [selectedDates, setSelectedDates] = useState<{
    startDate: string | null;
    endDate: string | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const [searchResults, setSearchResults] = useState<
    { id: number; category: string; time: string; amount: number }[]
  >([]);

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

    const results: { id: number; category: string; time: string; amount: number }[] = [
      { id: 1, category: 'Groceries', time: '17:00 - April 10', amount: -100 },
      { id: 2, category: 'Payments', time: '10:00 - April 12', amount: 120 },
    ];

    setSearchResults(results);
  };

  return(
  <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/Analysis')}>
            <FontAwesome5 name="arrow-left" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Calendar</Text>
            <TouchableOpacity>
              <FontAwesome5 name="bell" size={20} color="#FFFFFF" onPress={() => router.push('./NotificationScreen')}/>
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

        {/* Search Button */}
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        {/* Search Results */}
        <View style={styles.resultsContainer}>
          {searchResults.map((result) => (
            <View key={result.id} style={styles.resultItem}>
              <View style={styles.resultCategory}>
                <Text style={styles.resultCategoryText}>{result.category}</Text>
                <Text style={styles.resultTimeText}>{result.time}</Text>
              </View>
              <Text
                style={[
                  styles.resultAmount,
                  { color: result.amount < 0 ? '#E63946' : '#2A9D8F' },
                ]}
              >
                {result.amount < 0 ? '-' : '+'}${Math.abs(result.amount).toFixed(2)}
              </Text>
            </View>
          ))}
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
  },
  searchButton: {
    backgroundColor: '#00C9A7',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsContainer: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
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
    flexDirection: 'column',
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