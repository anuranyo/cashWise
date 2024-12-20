import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const Signup = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Заголовок */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Create Account</Text>
      </View>

      {/* Форма */}
      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* Full Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="example@example.com"
            placeholderTextColor="#95D9A7"
          />
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="example@example.com"
            placeholderTextColor="#95D9A7"
            keyboardType="email-address"
          />
        </View>

        {/* Mobile Number */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="+123 456 789"
            placeholderTextColor="#95D9A7"
            keyboardType="phone-pad"
          />
        </View>

        {/* Date of Birth */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Date Of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="DD / MM / YYYY"
            placeholderTextColor="#95D9A7"
          />
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#95D9A7"
            secureTextEntry={true}
          />
        </View>

        {/* Confirm Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#95D9A7"
            secureTextEntry={true}
          />
        </View>

        {/* Terms and Policy */}
        <Text style={styles.policyText}>
          By continuing, you agree to{' '}
          <Text style={styles.policyLink}>Terms of Use</Text> and{' '}
          <Text style={styles.policyLink}>Privacy Policy</Text>.
        </Text>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Already have an account */}
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={styles.loginLink} onPress={() => router.push('/login')}>
            Log In
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D09E', // Фон для нижнего контейнера
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerContainer: {
    backgroundColor: '#fff', // Белый фон для заголовка
    paddingVertical: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00D09E',
  },
  formContainer: {
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    backgroundColor: '#00D09E',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#C6F5D9',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },
  policyText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  policyLink: {
    color: '#C6F5D9',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#00D09E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  loginLink: {
    color: '#C6F5D9',
    fontWeight: 'bold',
  },
});

export default Signup;
