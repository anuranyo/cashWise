import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const MyTargets = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>My Targets</Text>
      <View style={styles.progressRow}>
        {/* Travel Circular Progress */}
        <View style={styles.progressItem}>
          <AnimatedCircularProgress
            size={100}
            width={10}
            fill={30}
            tintColor="#006DFF"
            backgroundColor="#E8FFF7"
          >
            {() => <Text style={styles.progressPercent}>30%</Text>}
          </AnimatedCircularProgress>
          <Text style={styles.progressLabel}>Travel</Text>
        </View>

        {/* Car Circular Progress */}
        <View style={styles.progressItem}>
          <AnimatedCircularProgress
            size={100}
            width={10}
            fill={50} 
            tintColor="#006DFF"
            backgroundColor="#E8FFF7"
          >
            {() => <Text style={styles.progressPercent}>50%</Text>}
          </AnimatedCircularProgress>
          <Text style={styles.progressLabel}>Car</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressItem: {
    alignItems: 'center',
    width: '45%',
  },
  progressLabel: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  progressPercent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006DFF',
  },
});

export default MyTargets;
