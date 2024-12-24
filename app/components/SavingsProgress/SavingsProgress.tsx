import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

type SavingsProgressProps = {
  savingsAmount: number;
  goal: number;
};

const SavingsProgress: React.FC<SavingsProgressProps> = ({ savingsAmount, goal }) => {
  const progressValue = Math.min((savingsAmount / goal) * 100, 100); // Calculate progress percentage

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
          <Text style={styles.progressValueText}>{progressValue.toFixed(1)}%</Text>
        )}
      </AnimatedCircularProgress>
      <Text style={styles.progressText}>Savings On Goals</Text>
      <Text style={styles.goalText}>
        {progressValue.toFixed(1)}% of ${goal.toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  progressValueText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00C9A7',
  },
  progressText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  goalText: {
    marginTop: 5,
    fontSize: 12,
    color: '#7D7D7D',
  },
});

export default SavingsProgress;
