import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Animated,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import BottomNavigation from '../components/SavingsProgress/BottomNavigation';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';

const SearchScreen = () => {
    const categories = [
        { id: 1, name: 'Food', icon: 'utensils' },
        { id: 2, name: 'Transport', icon: 'bus' },
        { id: 3, name: 'Medicine', icon: 'pills' },
        { id: 4, name: 'Groceries', icon: 'shopping-basket' },
        { id: 5, name: 'Rent', icon: 'home' },
        { id: 6, name: 'Gifts', icon: 'gift' },
        { id: 7, name: 'Savings', icon: 'piggy-bank' },
        { id: 8, name: 'Entertainment', icon: 'tv' },
        { id: 9, name: 'More', icon: 'plus' },
    ];

    const [selectedCategory, setSelectedCategory] = useState('Select the category');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownHeight = useRef(new Animated.Value(0)).current;
    const [selectedReport, setSelectedReport] = useState('Income');
    
    const handleCategorySelect = (category) => {
        setSelectedCategory(category.name);
        toggleDropdown();
    };

    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const formatDate = (date) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options).replace(/\s/g, '/');
    };

    const toggleDropdown = () => {
        if (dropdownVisible) {
          Animated.timing(dropdownHeight, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start(() => setDropdownVisible(false));
        } else {
          setDropdownVisible(true);
          Animated.timing(dropdownHeight, {
            toValue: 200, 
            duration: 300,
            useNativeDriver: false,
          }).start();
        }
    };
    

    return(
    <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/Analysis')}>
                    <FontAwesome5 name="arrow-left" size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Search</Text>
                <TouchableOpacity>
                    <FontAwesome5 name="bell" size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            {/* Dropdown */}
            <View style={styles.dropdownContainer}>
                <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
                    <Text style={styles.dropdownText}>{selectedCategory}</Text>
                    <FontAwesome5
                        name={dropdownVisible ? 'chevron-up' : 'chevron-down'}
                        size={16}
                        color="#00C9A7"
                    />
                </TouchableOpacity>

            {/* Dropdown Menu */}
            {dropdownVisible && (
                <Animated.View style={[styles.dropdownMenu, { height: dropdownHeight }]}>
                    <FlatList
                    data={categories}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => handleCategorySelect(item)}
                        >
                        <FontAwesome5 name={item.icon} size={20} color="#006DFF" />
                        <Text style={styles.dropdownItemText}>{item.name}</Text>
                    </TouchableOpacity>
                    )}
                    />
                </Animated.View>
             )}
            </View>

            {/* Date Picker */}
            <View style={styles.datePickerContainer}>
                <TouchableOpacity
                style={styles.datePicker}
                onPress={() => setShowDatePicker(true)}
                >
                <Text style={styles.datePickerText}>{formatDate(date)}</Text>
                <FontAwesome5 name="calendar-alt" size={20} color="#00C9A7" />
                </TouchableOpacity>
            </View>

            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            {/* Report Section */}
            <View style={styles.reportSection}>
                <Text style={styles.reportLabel}>Report</Text>
                <View style={styles.reportOptions}>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setSelectedReport('Income')}
                    >
                    <FontAwesome5
                        name={selectedReport === 'Income' ? 'dot-circle' : 'circle'}
                        size={16}
                        color="#00C9A7"
                    />
                    <Text style={styles.radioText}>Income</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setSelectedReport('Expense')}
                    >
                    <FontAwesome5
                        name={selectedReport === 'Expense' ? 'dot-circle' : 'circle'}
                        size={16}
                        color="#00C9A7"
                    />
                    <Text style={styles.radioText}>Expense</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search Button */}
            <TouchableOpacity style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>

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
    dropdownContainer: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    dropdown: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    dropdownText: {
        color: '#7D7D7D',
        fontSize: 16,
    },
    dropdownMenu: {
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        marginTop: 10,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
    },
    dropdownItemText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    datePickerContainer: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    datePicker: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    datePickerText: {
        color: '#7D7D7D',
        fontSize: 16,
    },
    reportSection: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    reportLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    reportOptions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#333',
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
