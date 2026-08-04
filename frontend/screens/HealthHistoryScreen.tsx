import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";

import { useEffect, useState } from "react";
import PhoneFrame from "../components/PhoneFrame";
import BottomNavigation from "../components/BottomNavigation";
import BackButton from "../components/BackButton";
import HistoryCard from "../components/HistoryCard";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HealthHistoryScreen() {
  const [history, setHistory] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadHistory = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      try {
        const response = await api.get("/api/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHistory(response.data.history || []);
      } catch (error) {
        console.log("Health history load error:", error);
      }
    };

    loadHistory();
  }, []);
  const filteredHistory = history;

  // const filteredHistory = history.filter((item) => {
  //   const text = search.toLowerCase();
  //   return (
  //     item.date.toLowerCase().includes(text) ||
  //     item.cycle.toLowerCase().includes(text) ||
  //     item.flow.toLowerCase().includes(text) ||
  //     item.mood.toLowerCase().includes(text) ||
  //     item.energy.toLowerCase().includes(text) ||
  //     item.symptoms.join(" ").toLowerCase().includes(text) ||
  //     item.notes.toLowerCase().includes(text)
  //   );
  // });

  return (
    <PhoneFrame>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        <BackButton />

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
          value={search}
          onChangeText={setSearch}
        />

        {/* History Cards */}

        {filteredHistory.map((item) => (
          <HistoryCard
            key={item.date}
            date={item.date}
            cycle={item.cycle}
            duration={item.duration}
            flow={item.flow}
            mood={item.mood}
            energy={item.energy}
            symptoms={item.symptoms}
            notes={item.notes}
          />
        ))}

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