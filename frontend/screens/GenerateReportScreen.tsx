import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PhoneFrame from "../components/PhoneFrame";
import BottomNavigation from "../components/BottomNavigation";

export default function GenerateReportScreen() {
  return (
    <PhoneFrame>
      <View style={styles.container}>
        <Text style={styles.title}>Doctor Report</Text>
      </View>

    </PhoneFrame>
  );
}

const styles = StyleSheet.create({
  container: {
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