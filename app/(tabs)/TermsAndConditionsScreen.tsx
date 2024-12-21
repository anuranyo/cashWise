import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

type State = {
  isAccepted: boolean;
};

class TermsAndConditionsScreen extends Component<{}, State> {
  state: State = {
    isAccepted: false,
  };

  handleAccept = () => {
    if (this.state.isAccepted) {
      alert("Thank you for accepting the terms!");
      // Navigate to HomeScreen
    } else {
      alert("Please accept the terms to proceed.");
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/SecurityScreen')}>
            <FontAwesome5 name="arrow-left" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Terms And Conditions</Text>
          <TouchableOpacity></TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.content}>
          <Text style={styles.title}>Welcome to Our Terms and Conditions</Text>
          <Text style={styles.paragraph}>
            These terms and conditions outline the rules and regulations for the
            use of our application. By accessing this application, we assume
            you accept these terms and conditions. Do not continue to use the
            application if you do not agree to all the terms and conditions
            stated on this page.
          </Text>
          <Text style={styles.sectionHeader}>License</Text>
          <Text style={styles.paragraph}>
            Unless otherwise stated, we own the intellectual property rights
            for all material on this application. All intellectual property
            rights are reserved. You may access this from the application for
            your own personal use subjected to restrictions set in these terms
            and conditions.
          </Text>
          <Text style={styles.sectionHeader}>You must not:</Text>
          <Text style={styles.listItem}>1. Republish material from the app</Text>
          <Text style={styles.listItem}>2. Sell, rent, or sub-license material</Text>
          <Text style={styles.listItem}>
            3. Reproduce, duplicate, or copy material
          </Text>
          <Text style={styles.listItem}>
            4. Redistribute content from the application
          </Text>
          <Text style={styles.sectionHeader}>Limitation of Liability</Text>
          <Text style={styles.paragraph}>
            In no event shall we or our suppliers be liable for any damages
            arising out of the use or inability to use the application.
          </Text>
          <Text style={styles.sectionHeader}>Governing Law</Text>
          <Text style={styles.paragraph}>
            These terms and conditions are governed by and construed in
            accordance with the laws of your country, and you irrevocably
            submit to the exclusive jurisdiction of the courts in that location.
          </Text>
          <Text style={styles.footer}>
            If you have any questions, feel free to contact us at support@example.com.
          </Text>
        </ScrollView>

        {/* Accept Button */}
        <TouchableOpacity
          style={[
            styles.actionButton,
            !this.state.isAccepted && styles.disabledButton,
          ]}
          onPress={() => router.push('/SecurityScreen')}
          disabled={!this.state.isAccepted}
        >
          <Text style={styles.actionButtonText}>Accept</Text>
        </TouchableOpacity>

        {/* Checkbox for Acceptance */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() =>
            this.setState((prevState) => ({
              isAccepted: !prevState.isAccepted,
            }))
          }
        >
          <FontAwesome5
            name={this.state.isAccepted ? "check-square" : "square"}
            size={20}
            color="#00C9A7"
          />
          <Text style={styles.checkboxText}>
            I accept the terms and conditions
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  content: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    color: "#7D7D7D",
    marginBottom: 10,
    lineHeight: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 10,
    marginBottom: 5,
  },
  listItem: {
    fontSize: 14,
    color: "#333333",
    marginBottom: 5,
    marginLeft: 10,
  },
  footer: {
    fontSize: 14,
    color: "#333333",
    marginTop: 15,
    fontStyle: "italic",
  },
  actionButton: {
    backgroundColor: "#00C9A7",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: "#B0E6D5",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  checkboxText: {
    fontSize: 14,
    color: "#333333",
    marginLeft: 10,
  },
});

export default TermsAndConditionsScreen;
