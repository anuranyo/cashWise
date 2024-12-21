import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Pdf from "react-native-pdf"; // Библиотека для отображения PDF

const SecurityScreen = () => {
  const router = useRouter();
  const [expandedOption, setExpandedOption] = useState<string | null>(null);

  const toggleExpand = (optionId: string) => {
    setExpandedOption((prev) => (prev === optionId ? null : optionId));
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome5 name="arrow-left" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security</Text>
        <TouchableOpacity onPress={() => router.push("./NotificationScreen")}>
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

        {/* Terms and Conditions Option */}
        <View>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => toggleExpand("termsAndConditions")}
          >
            <Text style={styles.optionText}>Terms And Conditions</Text>
            <FontAwesome5
              name={
                expandedOption === "termsAndConditions" ? "chevron-up" : "chevron-down"
              }
              size={16}
              color="#7D7D7D"
            />
          </TouchableOpacity>
          {expandedOption === "termsAndConditions" && (
            <View style={styles.expandedContent}>
              {/* PDF Viewer */}
              <Pdf
                source={{
                  uri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                  cache: true,
                }}
                style={styles.pdf}
                onLoadComplete={(numberOfPages) =>
                  console.log(`PDF загружен. Количество страниц: ${numberOfPages}`)
                }
                onPageChanged={(page, numberOfPages) =>
                  console.log(`Страница: ${page} из ${numberOfPages}`)
                }
                onError={(error) => console.log("Ошибка отображения PDF:", error)}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

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
  pdf: {
    flex: 1,
    width: "100%",
    height: 400,
  },
});

export default SecurityScreen;
