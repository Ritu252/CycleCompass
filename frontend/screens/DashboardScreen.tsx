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
import api from "../services/api";

export default function DashboardScreen() {
  const [userName, setUserName] = useState("");
  const [currentCycle, setCurrentCycle] = useState({
    day: "Not tracked",
    flow: "No data",
    lastLogged: null as string | null,
  });
  const [streak, setStreak] = useState({
    days: 0,
    message: "Start your streak today",
  });
  const navigation = useNavigation<any>();

  useEffect(() => {
    const loadDashboardData = async () => {
      const storedName = await AsyncStorage.getItem("name");
      setUserName(storedName || "Ritu");

      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      try {
        const response = await api.get("/api/dashboard/summary", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data?.currentCycle) {
          setCurrentCycle(response.data.currentCycle);
        }
        if (response.data?.streak) {
          setStreak(response.data.streak);
        }
      } catch (error) {
        console.log("Dashboard summary error:", error);
      }
    };

    loadDashboardData();
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
            <Text style={styles.goodMorning}>🌸 Welcome back</Text>
            <Text style={styles.userName}>{userName || "Ritu"}</Text>
            <Text style={styles.welcomeMessage}>
              You’re doing great — let’s make today feel a little lighter and more balanced.
            </Text>
          </View>
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
                <Text style={styles.bigPinkText}>{currentCycle.day}</Text>
                <Text style={styles.infoText}>🩸 Flow: {currentCycle.flow}</Text>
                <Text style={styles.infoText}>
                  📅 Last logged: {currentCycle.lastLogged || "No record"}
                </Text>
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
                <Text style={styles.bigPinkText}>{streak.days} Days</Text>
                <Text style={styles.infoText}>🏆 {streak.message}</Text>
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
          onPress={() => navigation.navigate("HealthInsights")}
        >
          <View style={styles.reportLeft}>
            <Text style={styles.insightsIcon}>📊</Text>

            <View>
              <Text style={styles.reportTitle}>Health Insights</Text>
              <Text style={styles.reportSubtitle}>
                See your weight trends over time
              </Text>
            </View>
          </View>

          <Text style={styles.reportArrow}>→</Text>
        </TouchableOpacity>

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

  welcomeMessage: {
    color: "#8B5E6D",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
    maxWidth: 280,
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

  insightsIcon: {
    fontSize: 26,
    marginRight: 12,
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