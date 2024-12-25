import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { fetchData } from '../services/api';

const AddExpenseScreen = () => {
  const { categoryName, userID } = useLocalSearchParams(); // Get category and userID from params
  const router = useRouter();

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [amount, setAmount] = useState('');
  const [expenseTitle, setExpenseTitle] = useState('');
  const [transactionType, setTransactionType] = useState<'income' | 'expense' | 'goal'>('expense');

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSave = async () => {
    if (!amount || !expenseTitle) {
      Alert.alert('Validation Error', 'Please enter all required fields.');
      return;
    }

    const transactionData = {
      description: expenseTitle,
      date: date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
      amount: parseFloat(amount),
      category: categoryName,
      type: transactionType,
    };

    try {
      const response = await fetchData(`transaction?userID=${userID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Transaction saved successfully!');
        router.back(); // Go back to the previous screen
      } else {
        Alert.alert('Error', 'Failed to save transaction. Please try again.');
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
      Alert.alert('Error', 'Failed to save transaction. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome5 name="arrow-left" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Transaction</Text>
        <TouchableOpacity></TouchableOpacity>
      </View>

      {/* Selected Category */}
      <View style={styles.selectedCategory}>
        <Text style={styles.selectedCategoryLabel}>Category</Text>
        <Text style={styles.selectedCategoryValue}>
          {categoryName || 'Select Category'}
        </Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        {/* Date */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.datePicker}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>{date.toDateString()}</Text>
            <FontAwesome5 name="calendar" size={20} color="#00C9A7" />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        {/* Amount */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            placeholderTextColor="#7D7D7D"
          />
        </View>

        {/* Expense Title */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Expense Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter expense title"
            value={expenseTitle}
            onChangeText={setExpenseTitle}
            placeholderTextColor="#7D7D7D"
          />
        </View>

        {/* Transaction Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Transaction Type</Text>
          <View style={styles.typeContainer}>
            {['income', 'expense', 'goal'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  transactionType === type && styles.selectedTypeButton,
                ]}
                onPress={() => setTransactionType(type as 'income' | 'expense' | 'goal')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    transactionType === type && styles.selectedTypeButtonText,
                  ]}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6FFF5',
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
  selectedCategory: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 15,
    alignItems: 'center',
  },
  selectedCategoryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  selectedCategoryValue: {
    fontSize: 18,
    color: '#2A9D8F',
    marginTop: 5,
  },
  form: {
    marginTop: 20,
    padding: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
  },
  dateText: {
    fontSize: 16,
    color: '#333333',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#333333',
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeButton: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#E8FFF7',
  },
  selectedTypeButton: {
    backgroundColor: '#00C9A7',
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7D7D7D',
  },
  selectedTypeButtonText: {
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#00C9A7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default AddExpenseScreen;
