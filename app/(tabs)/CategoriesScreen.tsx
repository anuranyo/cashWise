import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomNavigation from '../components/SavingsProgress/BottomNavigation';

const categoriesData = [
  { id: '1', icon: 'utensils', name: 'Food' },
  { id: '2', icon: 'bus', name: 'Transport' },
  { id: '3', icon: 'pills', name: 'Medicine' },
  { id: '4', icon: 'shopping-basket', name: 'Groceries' },
  { id: '5', icon: 'home', name: 'Rent' },
  { id: '6', icon: 'gift', name: 'Gifts' },
  { id: '7', icon: 'piggy-bank', name: 'Savings' },
  { id: '8', icon: 'ticket-alt', name: 'Entertainment' },
  { id: '9', icon: 'plus', name: 'More' },
];

const CategoriesScreen = () => {
  const router = useRouter();

  const handleCategoryPress = (category: { id: string; name: string }) => {
    if (category.id === '9') {
      // Navigate to CategoryDetailScreen for the "More" category
      router.push({
        pathname: '/(tabs)/CategoryDetailScreen',
        params: { categoryId: category.id, categoryName: category.name },
      });
    } else {
      // Navigate to AddExpenseScreen for other categories
      router.push({
        pathname: '/(tabs)/AddExpenseScreen',
        params: { categoryId: category.id, categoryName: category.name },
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome5 name="arrow-left" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity>
          <FontAwesome5 name="bell" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Categories Grid */}
      <FlatList
        data={categoriesData}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.categoriesGrid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => handleCategoryPress(item)}
          >
            <View style={styles.categoryIcon}>
              <FontAwesome5 name={item.icon} size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
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
  categoriesGrid: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  categoryCard: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1A73E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default CategoriesScreen;
