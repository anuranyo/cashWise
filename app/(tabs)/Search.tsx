import React, { useEffect, useRef, useState } from 'react';
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
import { router, useLocalSearchParams } from 'expo-router';
import { fetchData } from '../services/api';

type Category = {
    categoryID: string;
    userID: string;
    name: string;
    description: string;
    icon: string;
  }
  
  type Transaction = {
    transactionID: string;
    userID: string;
    categoryID: string;
    type: string;
    amount: string;
    date: string;
    description: string;
  }

const SearchScreen = () => {
    const { userID } = useLocalSearchParams();
    const [fullName, setFullName] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('Select the category');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownHeight = useRef(new Animated.Value(0)).current;
    const [selectedReport, setSelectedReport] = useState('Income');
    
    useEffect(() => {
        async function loadCategories() {
          try {
            const data = await fetchData(`categories?userID=${userID}`);
            setCategories(data);
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        }
    
        loadCategories();
    }, [userID]);
      
    const handleCategorySelect = (category: Category) => {
        setSelectedCategory(category.name);
        setSelectedCategoryId(category.categoryID);
        toggleDropdown();
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

    const handleSearch = async () => {
        try {
          const data = await fetchData(`transactions?userID=${userID}`);
          const filteredTransactions = data.filter(
            (transaction: Transaction) =>
              transaction.categoryID === selectedCategoryId &&
              transaction.type.toLowerCase() === selectedReport.toLowerCase()
          );
          setTransactions(filteredTransactions);
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }
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
            <Text style={styles.headerTitle}>Search</Text>
            <TouchableOpacity>
              <FontAwesome5 name="bell" size={20} color="#FFFFFF" onPress={handleNotification}/>
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

          {dropdownVisible && (
            <Animated.View style={[styles.dropdownMenu, { height: dropdownHeight }]}>
              <FlatList
                data={categories}
                keyExtractor={(item) => item.categoryID.toString()}
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
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        {/* Transactions List */}
        {transactions.length > 0 && (
          <View style={styles.transactionsContainer}>
            <Text style={styles.transactionsTitle}>Transactions</Text>
            {transactions.map((transaction) => {
              const category = categories.find(
                (cat) => cat.categoryID === transaction.categoryID
              );

              return (
                <View key={transaction.transactionID} style={styles.transactionItem}>
                  <View style={styles.transactionDetails}>
                    {category?.icon && (
                      <FontAwesome5 name={category.icon} size={20} color="#006DFF" />
                    )}
                    <Text style={styles.transactionDescription}>
                      {transaction.description}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.transactionAmount,
                        { color: transaction.type === 'income' ? 'green' : 'red' },
                      ]}
                    >
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                    </Text>
                    <Text style={styles.transactionDate}>{transaction.date}</Text>
                  </View>
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
    transactionsContainer: {
        marginHorizontal: 20,
        marginTop: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
      },
      transactionsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
      },
      transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
      },
      transactionDescription: {
        fontSize: 16,
        color: '#333',
        flex: 2,
      },
      transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'right',
      },
      transactionDate: {
        fontSize: 14,
        color: '#7D7D7D',
        flex: 1,
        textAlign: 'right',
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

export default SearchScreen;
