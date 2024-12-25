import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { fetchData } from '../services/api';

const excludedIcons = [
  'coffee',
  'car',
  'apple-alt',
  'camera',
  'beer',
  'music',
  'leaf',
  'plane',
  'book',
  'bicycle',
  'motorcycle',
  'fish',
  'dog',
  'cat',
  'heart',
  'star',
  'gift',
  'shopping-cart',
  'umbrella',
  'fire',
  'tree',
  'couch',
  'bed',
  'dumbbell',
  'pizza-slice',
  'hamburger',
  'cheese',
  'ice-cream',
  'wine-glass',
  'cocktail',
  'mobile-alt',
  'tablet-alt',
  'laptop',
  'desktop',
  'headphones',
  'watch',
  'camera-retro',
  'basketball-ball',
  'football-ball',
  'volleyball-ball',
  'baseball-ball',
  'chess',
  'dice',
  'gamepad',
  'pen',
  'paint-brush',
  'palette',
  'scissors',
  'briefcase',
  'clock',
  'map',
  'compass',
  'calculator',
  'key',
  'lock',
  'lightbulb',
  'clipboard',
  'paper-plane',
  'envelope',
  'trash-alt',
  'archive',
  'globe',
];

// Generate a random icon excluding the provided list
const getRandomIcon = () => {
  const allIcons = [
    'utensils', 'bus', 'pills', 'shopping-basket', 'home', 'gift', 'piggy-bank', 'ticket-alt',
    'coffee', 'car', 'apple-alt', 'camera', 'beer', 'music', 'leaf', 'plane', 'book', 'bicycle',
    'motorcycle', 'fish', 'dog', 'cat', 'heart', 'star', 'shopping-cart', 'umbrella', 'tree',
    'couch', 'bed', 'dumbbell', 'pizza-slice', 'hamburger', 'cheese', 'ice-cream', 'wine-glass',
    'cocktail', 'mobile-alt', 'tablet-alt', 'laptop', 'desktop', 'headphones', 'watch',
    'camera-retro', 'basketball-ball', 'football-ball', 'volleyball-ball', 'baseball-ball',
    'chess', 'dice', 'gamepad', 'pen', 'paint-brush', 'palette', 'scissors', 'briefcase',
    'clock', 'map', 'compass', 'calculator', 'key', 'lock', 'lightbulb', 'clipboard', 'globe',
  ]; // A comprehensive list of valid FontAwesome5 icons

  // Filter out excluded icons
  const filteredIcons = allIcons.filter((icon) => !excludedIcons.includes(icon));
  return filteredIcons[Math.floor(Math.random() * filteredIcons.length)];
};

const CategoryDetailScreen = () => {
  const router = useRouter();
  const { userID } = useLocalSearchParams(); // Getting userID from parameters

  const [name, setName] = useState('');
  const [description, setDesc] = useState('');
  const [icon, setIcon] = useState(getRandomIcon()); // Default random icon
  const [color, setColor] = useState('#1A73E8');
  const [budget, setBudget] = useState('');

  const handleSaveCategory = async () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Category name cannot be empty');
      return;
    }
  
    if (!description.trim()) {
      Alert.alert('Validation Error', 'Category description cannot be empty');
      return;
    }
  
    const payload = {
      name,
      description,
      userID: parseInt(userID as string, 10),
      icon,
    };
  
    console.log('Payload being sent:', JSON.stringify(payload, null, 2));
  
    try {
      const data = await fetchData('create-category', {
        method: 'POST',
        body: JSON.stringify(payload),            
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      });
  
      // If fetchData returns without error, assume category was created
      console.log('Category created successfully:', data);
  
      router.push({
        pathname: '/CategoriesScreen',
        params: { userID }, 
      });
    } catch (error) {
      console.error('Error creating category:', error);
      Alert.alert('Error', 'Failed to create category. Please try again later.');
    }
  };

  
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

        {/* Category Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter category Description"
            value={description}
            onChangeText={(text) => setDesc(text)}
            placeholderTextColor="#7D7D7D"
          />
        </View>

        {/* Icon Preview */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category Icon</Text>
          <View style={styles.iconPreview}>
            <FontAwesome5 name={icon} size={48} color={color} />
          </View>
          <TouchableOpacity
            style={styles.changeIconButton}
            onPress={() => setIcon(getRandomIcon())}
          >
            <Text style={styles.changeIconText}>Change Icon</Text>
          </TouchableOpacity>
        </View>


        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveCategory}>
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
  iconPreview: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
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
  changeIconButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#00C9A7',
    borderRadius: 8,
    alignItems: 'center',
  },
  changeIconText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
});

export default CategoryDetailScreen;
