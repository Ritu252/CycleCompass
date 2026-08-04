import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PhoneFrame from "../components/PhoneFrame";
import BottomNavigation from "../components/BottomNavigation";
import BackButton from "../components/BackButton";

export default function GenerateReportScreen() {
  return (
    <PhoneFrame>
      <View style={styles.container}>
        <BackButton style={styles.backButton} />

        <View style={styles.content}>
          <Text style={styles.title}>Doctor Report</Text>
        </View>
      </View>

    </PhoneFrame>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  backButton: {
    marginBottom: 0,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#EF4F8F",
  },
});