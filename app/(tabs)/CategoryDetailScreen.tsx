import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

const CategoryDetailScreen = () => {
  const router = useRouter();
  const { categoryId, categoryName } = useLocalSearchParams();

  // Ensure categoryName and categoryId are strings
  const [name, setName] = useState("");
  const [icon, setIcon] = useState('utensils');
  const [color, setColor] = useState('#1A73E8');
  const [budget, setBudget] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/CategoriesScreen')}>
          <FontAwesome5 name="arrow-left" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Category</Text>
        <TouchableOpacity></TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Category Name Input */}
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Category Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter category name"
                value={name}
                onChangeText={(text) => setName(text)}
                placeholderTextColor="#7D7D7D"
            />
        </View>

        {/* Icon Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category Icon</Text>
          <View style={styles.iconOptions}>
            {['utensils', 'bus', 'pills', 'shopping-basket', 'home', 'gift', 'piggy-bank', 'ticket-alt'].map(
              (iconOption) => (
                <TouchableOpacity
                  key={iconOption}
                  onPress={() => setIcon(iconOption)}
                  style={[
                    styles.iconOption,
                    icon === iconOption && { borderColor: color, borderWidth: 2 },
                  ]}
                >
                  <FontAwesome5 name={iconOption} size={24} color={icon === iconOption ? color : '#7D7D7D'} />
                </TouchableOpacity>
              )
            )}
          </View>
        </View>

        {/* Color Picker */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category Color</Text>
          <View style={styles.colorOptions}>
            {['#1A73E8', '#00C9A7', '#FF5252', '#F4B400', '#9C27B0'].map((colorOption) => (
              <TouchableOpacity
                key={colorOption}
                onPress={() => setColor(colorOption)}
                style={[
                  styles.colorOption,
                  { backgroundColor: colorOption },
                  color === colorOption && styles.selectedColorOption,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Budget Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Monthly Budget ($)</Text>
          <TextInput
            style={styles.input}
            value={budget}
            onChangeText={setBudget}
            placeholder="Enter budget"
            placeholderTextColor="#7D7D7D"
            keyboardType="numeric"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={() => alert('Category saved successfully!')}>
          <Text style={styles.saveButtonText}>Save Category</Text>
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
  content: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#333333',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  iconOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iconOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  colorOptions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedColorOption: {
    borderWidth: 3,
    borderColor: '#333333',
  },
  saveButton: {
    backgroundColor: '#00C9A7',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default CategoryDetailScreen;
