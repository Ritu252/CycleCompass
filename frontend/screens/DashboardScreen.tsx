import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import PhoneFrame from "../components/PhoneFrame";
import BottomNavigation from "../components/BottomNavigation";

export default function DashboardScreen() {
  const [userName, setUserName] = useState("");
  const navigation = useNavigation<any>();

  useEffect(() => {
    const loadUserName = async () => {
      const storedName = await AsyncStorage.getItem("name");
      setUserName(storedName || "Ritu");
    };

    loadUserName();
  }, []);

  return (
    <PhoneFrame>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.logo}>CycleCompass</Text>

          <TouchableOpacity>
            <Image
              source={require("../assets/images/notification.png")}
              style={styles.notification}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.welcomeCard}>
          <View style={styles.leftSection}>
            <Text style={styles.goodMorning}>Good Morning</Text>
            <Text style={styles.userName}>{userName || "Ritu"}</Text>
          </View>

          <Image
            source={require("../assets/images/welcome_girl.png")}
            style={styles.girlImage}
          />
        </View>

        <View style={styles.doubleCardRow}>
          <View style={styles.smallCard}>
            <View style={styles.cardHeader}>
              <Image
                source={require("../assets/images/calendar_check.png")}
                style={styles.checkInImage}
              />
              <Text style={styles.cardTitle}>Current Cycle</Text>
            </View>

            <View style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text style={styles.bigPinkText}>Day 12</Text>
                <Text style={styles.infoText}>🩸 Flow: Medium</Text>
                <Text style={styles.infoText}>📅 Next Period: 6 days</Text>
              </View>
            </View>
          </View>

          <View style={styles.smallCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.fireIcon}>🔥</Text>
              <Text style={styles.cardTitle}>Current Streak</Text>
            </View>

            <View style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text style={styles.bigPinkText}>7 Days</Text>
                <Text style={styles.infoText}>🏆 You're doing amazing!</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.checkInCard}>
          <View style={styles.checkInLeft}>
            <Text style={styles.checkInTitle}>Today's Check-In</Text>
            <Text style={styles.checkInSubtitle}>
              Track today's mood, symptoms and cycle to keep your health journey on track.
            </Text>

            <TouchableOpacity
              style={styles.checkInButton}
              onPress={() => navigation.navigate("DailyCheckIn")}
            >
              <Text style={styles.checkInButtonText}>Check In Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <TouchableOpacity
            style={styles.dashboardCard}
            onPress={() => navigation.navigate("HealthHistory")}
          >
            <Image
              source={require("../assets/images/calendar.png")}
              style={styles.calendarImage}
            />

            <Text style={styles.dashboardCardTitle}>Health History</Text>
            <Text style={styles.dashboardCardText}>• Cycle History</Text>
            <Text style={styles.dashboardCardText}>• Symptoms History</Text>
            <Text style={styles.dashboardCardText}>• Wellness Trends</Text>
            <Text style={styles.viewMore}>View History →</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dashboardCard}>
            <Image
              source={require("../assets/images/robot_copy.png")}
              style={styles.aiRobotImage}
            />

            <Text style={styles.dashboardCardTitle}>AI Insight</Text>
            <Text style={styles.dashboardCardText}>💧 Drink more water today.</Text>
            <Text style={styles.dashboardCardText}>Your energy has improved this week.</Text>
            <Text style={styles.viewMore}>View Insight →</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.reportCard}
          onPress={() => navigation.navigate("Report")}
        >
          <View style={styles.reportLeft}>
            <Image
              source={require("../assets/images/doctor_report.png")}
              style={styles.reportIcon}
            />

            <View>
              <Text style={styles.reportTitle}>Generate Report</Text>
              <Text style={styles.reportSubtitle}>
                Export your cycle & symptom history
              </Text>
            </View>
          </View>

          <Text style={styles.reportArrow}>→</Text>
        </TouchableOpacity>
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

  header: {
    marginTop: 25,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    flex: 1,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
    color: "#EF4F8F",
  },

  notification: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },

  welcomeCard: {
    height: 140,
    backgroundColor: "#FFEFF5",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#FFD8E5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    marginBottom: 18,
  },

  leftSection: {
    flex: 1,
  },

  goodMorning: {
    color: "#EF4F8F",
    fontWeight: "600",
    marginBottom: 4,
  },

  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#3A2C34",
  },

  girlImage: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },

  doubleCardRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },

  smallCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: "#F7DDE8",
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  checkInImage: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: "contain",
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#5B3E49",
  },

  cardContent: {
    justifyContent: "center",
  },

  bigPinkText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#EF4F8F",
    marginBottom: 6,
  },

  infoText: {
    color: "#7C5B66",
    fontSize: 12,
    marginBottom: 2,
  },

  fireIcon: {
    fontSize: 18,
    marginRight: 6,
  },

  checkInCard: {
    backgroundColor: "#FDE7F0",
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },

  checkInLeft: {
    flex: 1,
  },

  checkInTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#7A3554",
    marginBottom: 6,
  },

  checkInSubtitle: {
    color: "#9A6C7C",
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },

  checkInButton: {
    backgroundColor: "#EF4F8F",
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
    width: 140,
  },

  checkInButtonText: {
    color: "#FFF",
    fontWeight: "700",
  },

  bottomRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },

  dashboardCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: "#F7DDE8",
  },

  calendarImage: {
    width: 24,
    height: 24,
    marginBottom: 8,
    resizeMode: "contain",
  },

  aiRobotImage: {
    width: 24,
    height: 24,
    marginBottom: 8,
    resizeMode: "contain",
  },

  dashboardCardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#5B3E49",
    marginBottom: 8,
  },

  dashboardCardText: {
    color: "#7C5B66",
    fontSize: 12,
    marginBottom: 2,
  },

  viewMore: {
    color: "#EF4F8F",
    fontWeight: "700",
    marginTop: 8,
  },

  reportCard: {
    backgroundColor: "#FFF0F6",
    borderRadius: 22,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  reportLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  reportIcon: {
    width: 30,
    height: 30,
    marginRight: 12,
    resizeMode: "contain",
  },

  reportTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#7A3554",
  },

  reportSubtitle: {
    color: "#9A6C7C",
    fontSize: 13,
    marginTop: 2,
  },

  reportArrow: {
    fontSize: 22,
    color: "#EF4F8F",
    fontWeight: "700",
  },
});