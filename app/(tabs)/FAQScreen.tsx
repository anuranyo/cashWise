import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

const FAQScreen = () => {
  const [selectedTab, setSelectedTab] = useState("FAQ");
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const toggleExpand = (question: string) => {
    setExpandedQuestion((prev) => (prev === question ? null : question));
  };

  const faqs = [
    { question: "How to use FinWise?", category: "General" },
    { question: "How much does it cost to use FinWise?", category: "General" },
    { question: "How to contact support?", category: "Account" },
    { question: "How can I reset my password if I forget it?", category: "Account" },
    {
      question: "Are there any privacy or data security measures in place?",
      category: "Services",
    },
    { question: "Can I customize settings within the application?", category: "Services" },
    { question: "How can I delete my account?", category: "Account" },
    { question: "How do I access my expense history?", category: "General" },
    { question: "Can I use the app offline?", category: "Services" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/ProfileScreen')}>
          <FontAwesome5 name="arrow-left" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & FAQs</Text>
        <TouchableOpacity></TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "FAQ" && styles.activeTab]}
          onPress={() => setSelectedTab("FAQ")}
        >
          <Text style={[styles.tabText, selectedTab === "FAQ" && styles.activeTabText]}>
            FAQ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "Contact Us" && styles.activeTab]}
          onPress={() => setSelectedTab("Contact Us")}
        >
          <Text style={[styles.tabText, selectedTab === "Contact Us" && styles.activeTabText]}>
            Contact Us
          </Text>
        </TouchableOpacity>
      </View>

      {selectedTab === "FAQ" && (
        <>
          {/* Categories */}
          <View style={styles.categoryContainer}>
            <TouchableOpacity
              style={[styles.category, selectedCategory === "General" && styles.activeCategory]}
              onPress={() => setSelectedCategory("General")}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === "General" && styles.activeCategoryText,
                ]}
              >
                General
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.category, selectedCategory === "Account" && styles.activeCategory]}
              onPress={() => setSelectedCategory("Account")}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === "Account" && styles.activeCategoryText,
                ]}
              >
                Account
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.category, selectedCategory === "Services" && styles.activeCategory]}
              onPress={() => setSelectedCategory("Services")}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === "Services" && styles.activeCategoryText,
                ]}
              >
                Services
              </Text>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#B0B0B0"
          />

          {/* FAQ List */}
          <ScrollView style={styles.faqList}>
            {faqs
              .filter((faq) => faq.category === selectedCategory)
              .map((faq, index) => (
                <View key={index}>
                  <TouchableOpacity
                    style={styles.faqItem}
                    onPress={() => toggleExpand(faq.question)}
                  >
                    <Text style={styles.faqQuestion}>{faq.question}</Text>
                    <FontAwesome5
                      name={expandedQuestion === faq.question ? "chevron-up" : "chevron-down"}
                      size={16}
                      color="#7D7D7D"
                    />
                  </TouchableOpacity>
                  {expandedQuestion === faq.question && (
                    <Text style={styles.faqAnswer}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin viverra urna
                      in orci varius, et sodales justo commodo.
                    </Text>
                  )}
                </View>
              ))}
          </ScrollView>
        </>
      )}

{selectedTab === "Contact Us" && (
  <ScrollView contentContainerStyle={styles.contactUsContainer}>
    <TouchableOpacity style={styles.contactItem} onPress={() => console.log("Website")}>
      <View style={styles.contactIcon}>
        <FontAwesome5 name="globe" size={20} color="#00C9A7" />
      </View>
      <Text style={styles.contactText}>Website</Text>
      <FontAwesome5 name="chevron-right" size={16} color="#7D7D7D" />
    </TouchableOpacity>

    <TouchableOpacity style={styles.contactItem} onPress={() => console.log("Facebook")}>
      <View style={styles.contactIcon}>
        <FontAwesome5 name="facebook" size={20} color="#00C9A7" />
      </View>
      <Text style={styles.contactText}>Facebook</Text>
      <FontAwesome5 name="chevron-right" size={16} color="#7D7D7D" />
    </TouchableOpacity>

    <TouchableOpacity style={styles.contactItem} onPress={() => console.log("WhatsApp")}>
      <View style={styles.contactIcon}>
        <FontAwesome5 name="whatsapp" size={20} color="#00C9A7" />
      </View>
      <Text style={styles.contactText}>WhatsApp</Text>
      <FontAwesome5 name="chevron-right" size={16} color="#7D7D7D" />
    </TouchableOpacity>

    <TouchableOpacity style={styles.contactItem} onPress={() => console.log("Instagram")}>
      <View style={styles.contactIcon}>
        <FontAwesome5 name="instagram" size={20} color="#00C9A7" />
      </View>
      <Text style={styles.contactText}>Instagram</Text>
      <FontAwesome5 name="chevron-right" size={16} color="#7D7D7D" />
    </TouchableOpacity>
    </ScrollView>
    )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6FFF5",
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
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
  },
  activeTab: {
    backgroundColor: "#00C9A7",
  },
  tabText: {
    fontSize: 14,
    color: "#7D7D7D",
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  category: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: "#F0F0F0",
  },
  activeCategory: {
    backgroundColor: "#B2F5E6",
  },
  categoryText: {
    fontSize: 14,
    color: "#7D7D7D",
  },
  activeCategoryText: {
    fontWeight: "bold",
    color: "#00C9A7",
  },
  searchInput: {
    marginHorizontal: 15,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    color: "#333333",
  },
  faqList: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  faqItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  faqQuestion: {
    fontSize: 16,
    color: "#333333",
  },
  faqAnswer: {
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 15,
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.5)", 
    backgroundColor: "#FFFFFF", 
    padding: 10, 
    borderRadius: 10, 
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  contactUsContainer: {
    padding: 15,
    backgroundColor: "#E6FFF5",
    flexGrow: 1,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E6FFF5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  contactText: {
    fontSize: 16,
    color: "#333333",
    flex: 1,
  },
  
});

export default FAQScreen;
