import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";

import PhoneFrame from "../components/PhoneFrame";
import BottomNavigation from "../components/BottomNavigation";
import HistoryCard from "../components/HistoryCard";

export default function HealthHistoryScreen() {
  return (
    <PhoneFrame>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        <Text style={styles.title}>
          Health History
        </Text>

        <Text style={styles.subtitle}>
          Track your wellness journey 
        </Text>

        {/* Search Bar */}

        <TextInput
          placeholder="Search by date, symptom..."
          placeholderTextColor="#999"
          style={styles.searchBar}
        />

        {/* History Cards */}

        <HistoryCard
  date="17 Jul 2026"
  cycle="10 Jul → 15 Jul"
  duration="6 Days"
  flow="Medium"
  mood="Happy"
  energy="Normal"
  symptoms={["Acne", "Bloating", "Cravings"]}
  notes="Feeling energetic today."
/>

<HistoryCard
  date="16 Jul 2026"
  cycle="10 Jul → 15 Jul"
  duration="6 Days"
  flow="Heavy"
  mood="Low"
  energy="Low"
  symptoms={["Hair Fall", "Acne"]}
  notes="Experienced cramps in the evening."
/>

<HistoryCard
  date="15 Jul 2026"
  cycle="10 Jul → 15 Jul"
  duration="6 Days"
  flow="Light"
  mood="Happy"
  energy="High"
  symptoms={[]}
  notes=""
/>


        <View style={{ height: 100 }} />

      </ScrollView>

      <BottomNavigation />
    </PhoneFrame>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFF8FB",
    paddingHorizontal: 18,
  },

  title: {
    marginTop: 25,

    fontSize: 30,

    fontWeight: "700",

    color: "#EF4F8F",

    textAlign: "center",
  },

  subtitle: {
    marginTop: 8,

    fontSize: 15,

    color: "#666",

    textAlign: "center",

    marginBottom: 20,
  },

  searchBar: {
    backgroundColor: "#FFFFFF",

    borderWidth: 1,

    borderColor: "#FFD8E5",

    borderRadius: 18,

    paddingHorizontal: 18,

    paddingVertical: 14,

    fontSize: 15,

    color: "#333",

    marginBottom: 20,
  },

});