import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const SecurityScreen = () => {
  const router = useRouter();
  const [expandedOption, setExpandedOption] = useState<string | null>(null);

  const toggleExpand = (optionId: string) => {
    setExpandedOption((prev) => (prev === optionId ? null : optionId));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#E6FFF5" }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push("/ProfileScreen")}>
            <FontAwesome5 name="arrow-left" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Security</Text>
          <TouchableOpacity onPress={() => router.push("/NotificationScreen")}>
            <FontAwesome5 name="bell" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Security Options */}
        <View style={styles.securityContainer}>
          <Text style={styles.sectionTitle}>Security</Text>

          {/* Change Pin Option */}
          <View>
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => toggleExpand("changePin")}
            >
              <Text style={styles.optionText}>Change Pin</Text>
              <FontAwesome5
                name={expandedOption === "changePin" ? "chevron-up" : "chevron-down"}
                size={16}
                color="#7D7D7D"
              />
            </TouchableOpacity>
            {expandedOption === "changePin" && (
              <View style={styles.expandedContent}>
                <Text style={styles.descriptionText}>
                  Securely change your PIN.
                </Text>
                <TextInput
                  placeholder="Current PIN"
                  secureTextEntry
                  keyboardType="numeric"
                  style={styles.input}
                />
                <TextInput
                  placeholder="New PIN"
                  secureTextEntry
                  keyboardType="numeric"
                  style={styles.input}
                />
                <TextInput
                  placeholder="Confirm New PIN"
                  secureTextEntry
                  keyboardType="numeric"
                  style={styles.input}
                />
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => alert("PIN Changed")}
                >
                  <Text style={styles.actionButtonText}>Change PIN</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Change Password Option */}
          <View>
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => toggleExpand("changePassword")}
            >
              <Text style={styles.optionText}>Change Password</Text>
              <FontAwesome5
                name={
                  expandedOption === "changePassword"
                    ? "chevron-up"
                    : "chevron-down"
                }
                size={16}
                color="#7D7D7D"
              />
            </TouchableOpacity>
            {expandedOption === "changePassword" && (
              <View style={styles.expandedContent}>
                <Text style={styles.descriptionText}>
                  Securely change your password.
                </Text>
                <TextInput
                  placeholder="Current Password"
                  secureTextEntry
                  style={styles.input}
                />
                <TextInput
                  placeholder="New Password"
                  secureTextEntry
                  style={styles.input}
                />
                <TextInput
                  placeholder="Confirm New Password"
                  secureTextEntry
                  style={styles.input}
                />
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => alert("Password Changed")}
                >
                  <Text style={styles.actionButtonText}>Change Password</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Terms and Conditions Option */}
          <View>
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => router.push("/TermsAndConditionsScreen")}
            >
              <Text style={styles.optionText}>Terms And Conditions</Text>
              <FontAwesome5 name="chevron-right" size={16} color="#7D7D7D" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    backgroundColor: '#E6FFF5',
  },
  header: {
    backgroundColor: "#00C9A7",
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  securityContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    color: "#333333",
  },
  expandedContent: {
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  descriptionText: {
    fontSize: 14,
    color: "#7D7D7D",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: "#333333",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  actionButton: {
    backgroundColor: "#00C9A7",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default SecurityScreen;
