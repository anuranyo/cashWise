import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const SavingsProgress = () => {
  const progressValue = 30; // percentage of progress bar

  return (
    <View style={styles.progressContainer}>
      <AnimatedCircularProgress
        size={80} 
        width={6}
        fill={progressValue}
        tintColor="#00C9A7"
        backgroundColor="#E8FFF7" 
      >
        {() => (
          <FontAwesome5 name="car" size={24} color="#00C9A7" />
        )}
      </AnimatedCircularProgress>
      <Text style={styles.progressText}>Savings On Goals</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  progressText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
});

export default SavingsProgress;
