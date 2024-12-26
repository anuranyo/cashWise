import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomNavigation from '../components/SavingsProgress/BottomNavigation';
import { useTabContext } from '../contexts/TabContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchData } from '../services/api';

// Define the type for the category
type Category = {
  categoryID: number;
  userID: number;
  name: string;
  description: string;
  icon: string; // Add the icon property
};

const CategoriesScreen = () => {
  const router = useRouter();
  const { activeTab, setActiveTab } = useTabContext();
  const [userID, setUserID] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserID = async () => {
      const storedUserID = await AsyncStorage.getItem('userID');
      setUserID(storedUserID);
    };
    fetchUserID();
  }, []);

  useEffect(() => {
    if (userID) {
      const fetchCategories = async () => {
        try {
          const response = await fetchData(`/categories?userID=${userID}`);
          setCategories(response); // Directly set categories from the response
        } catch (error) {
          console.error('Error fetching categories:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchCategories();
    }
  }, [userID]);

  const handleCategoryPress = (category: Category) => {
    router.push({
      pathname: '/(tabs)/AddExpenseScreen',
      params: { categoryId: category.categoryID, categoryName: category.name, userID: userID },
    });
  };

  const handleAddCategory = () => {
    router.push({
      pathname: '/(tabs)/CategoryDetailScreen',
      params: { userID: userID },
    });
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00C9A7" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity onPress={() => router.push({ pathname: "/NotificationScreen", params: { userID } })}>
          <FontAwesome5 name="bell" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Categories Grid */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.categoryID.toString()}
        numColumns={3}
        contentContainerStyle={styles.categoriesGrid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => handleCategoryPress(item)}
          >
            <View style={styles.categoryIcon}>
              <FontAwesome5
                name={item.icon || 'question-circle'} // Dynamically use the icon from the database
                size={24}
                color="#FFFFFF"
              />
            </View>
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Add Category Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddCategory}
      >
        <FontAwesome5 name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
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
  addButton: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    backgroundColor: '#00C9A7',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default CategoriesScreen;
