import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTabContext } from '../../contexts/TabContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BottomNavigation = () => {
  const { activeTab, setActiveTab } = useTabContext();
  const [userID, setUserID] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserID = async () => {
      const storedUserID = await AsyncStorage.getItem('userID');
      setUserID(storedUserID);
    };
    fetchUserID();
  }, []);

  const handleNavigation = (tab: 'home' | 'chart' | 'transfer' | 'layers' | 'profile', path: string) => {
    setActiveTab(tab);
    router.push({
      pathname: path,
      params: { userID },
    });
  };

  return (
    <View style={styles.navContainer}>
      <TouchableOpacity onPress={() => handleNavigation('home', '/HomeScreen')}>
        <View style={[styles.iconContainer, activeTab === 'home' && styles.activeIconContainer]}>
          <FontAwesome5 name="home" size={20} color={activeTab === 'home' ? '#000000' : '#7D7D7D'} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('chart', '/Analysis')}>
        <View style={[styles.iconContainer, activeTab === 'chart' && styles.activeIconContainer]}>
          <FontAwesome5 name="chart-line" size={20} color={activeTab === 'chart' ? '#000000' : '#7D7D7D'} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('transfer', '/TransferScreen')}>
        <View style={[styles.iconContainer, activeTab === 'transfer' && styles.activeIconContainer]}>
          <FontAwesome5 name="exchange-alt" size={20} color={activeTab === 'transfer' ? '#000000' : '#7D7D7D'} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('layers', '/CategoriesScreen')}>
        <View style={[styles.iconContainer, activeTab === 'layers' && styles.activeIconContainer]}>
          <FontAwesome5 name="layer-group" size={20} color={activeTab === 'layers' ? '#000000' : '#7D7D7D'} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('profile', '/ProfileScreen')}>
        <View style={[styles.iconContainer, activeTab === 'profile' && styles.activeIconContainer]}>
          <FontAwesome5 name="user" size={20} color={activeTab === 'profile' ? '#000000' : '#7D7D7D'} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#00C9A7',
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
  },
  iconContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconContainer: {
    backgroundColor: '#E8FFF7',
  },
});

export default BottomNavigation;
