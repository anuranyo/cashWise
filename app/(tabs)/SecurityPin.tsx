import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';

const SecurityPinScreen = () => {
  const router = useRouter();
  const [pin, setPin] = useState(['', '', '', '', '', '']); 
  const pinInputs = useRef<Array<TextInput | null>>([]); 

  const handleInputChange = (value: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = value.slice(-1); // Only allow one digit per input
    setPin(newPin);

    if (value && index < pin.length - 1) {
      pinInputs.current[index + 1]?.focus();
    }

    if (!value && index > 0) {
      pinInputs.current[index - 1]?.focus();
    }
  };

  const handleAccept = () => {
    const enteredPin = pin.join('');
    console.log('Entered PIN:', enteredPin);
    router.push('/NewPassword'); // Navigate to NewPassword screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Security Pin</Text>
      <Text style={styles.subHeader}>Enter Security Pin</Text>

      <View style={styles.pinContainer}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (pinInputs.current[index] = ref)} 
            style={styles.pinBox}
            value={digit}
            onChangeText={(value) => handleInputChange(value, index)}
            maxLength={1} 
            keyboardType="numeric"
            autoFocus={index === 0} 
          />
        ))}
      </View>

      <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
        <Text style={styles.buttonText}>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sendAgainButton}>
        <Text style={styles.buttonText}>Send Again</Text>
      </TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5FFF4',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00D699',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    color: '#7D7D7D',
    marginBottom: 20,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  pinBox: {
    width: 50, 
    height: 50,
    padding: 0,
    borderRadius: 10, 
    borderWidth: 2,
    borderColor: '#00D699',
    textAlign: 'center',
    fontSize: 24,
    color: '#00D699',
    marginHorizontal: 5,
    paddingVertical: 5, 
  },  
  acceptButton: {
    backgroundColor: '#00D699',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  sendAgainButton: {
    backgroundColor: '#D9EDE8',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerText: {
    marginTop: 20,
    color: '#7D7D7D',
    fontSize: 14,
  },
  socialText: {
    fontWeight: 'bold',
    color: '#00D699',
  },
  linkText: {
    fontWeight: 'bold',
    color: '#00D699',
  },
});

export default SecurityPinScreen;
