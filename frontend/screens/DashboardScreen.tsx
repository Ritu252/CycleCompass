import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import PhoneFrame from "../components/PhoneFrame";
import BottomNavigation from "../components/BottomNavigation";

export default function DashboardScreen() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const loadUserName = async () => {
      const name = await AsyncStorage.getItem("userName");

      if (name) {
        setUserName(name);
      }
    };

    loadUserName();
  }, []);

  return (
    <PhoneFrame>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        <View style={styles.header}>
          <Text style={styles.logo}>
            CycleCompass
          </Text>

          <TouchableOpacity>
            <Image
              source={require("../assets/images/notification.png")}
              style={styles.notification}
            />
          </TouchableOpacity>
        </View>

        {/* Welcome Card */}

        <View style={styles.welcomeCard}>
          <View style={styles.leftSection}>
            <Text style={styles.goodMorning}>
              Good Morning
            </Text>

            <Text style={styles.userName}>
              {userName || "Ritu"}
            </Text>
          </View>

          <Image
            source={require("../assets/images/welcome_girl.png")}
            style={styles.girlImage}
          />
        </View>
      

      {/* Cycle + Streak */}

<View style={styles.doubleCardRow}>

  {/* Current Cycle */}

  <View style={styles.smallCard}>

    <View style={styles.cardHeader}>
      <Image
    source={require("../assets/images/calendar_check.png")}
    style={styles.checkInImage}
  />

      <Text style={styles.cardTitle}>
        Current Cycle
      </Text>
    </View>

    <View style={styles.cardContent}>

      <View style={{ flex: 1 }}>

        <Text style={styles.bigPinkText}>
          Day 12
        </Text>

        <Text style={styles.infoText}>
          🩸 Flow: Medium
        </Text>

        <Text style={styles.infoText}>
          📅 Next Period: 6 days
          {/* <Image
        source={require("../assets/images/circle.png")}
        style={styles.cardImage}
      /> */}
        </Text>

      </View>


    </View>

  </View>

  {/* Current Streak */}

  <View style={styles.smallCard}>

    <View style={styles.cardHeader}>

      <Text style={styles.fireIcon}>
        🔥
      </Text>

      <Text style={styles.cardTitle}>
        Current Streak
      </Text>

    </View>

    <View style={styles.cardContent}>

      <View style={{ flex: 1 }}>

        <Text style={styles.bigPinkText}>
          7 Days
        </Text>

        <Text style={styles.infoText}>
          🏆 You're doing amazing! 
        </Text>

        <Text style={styles.heartRow}>
            {/* <Image
        source={require("../assets/images/trophy.png")}
        style={styles.cardImage}
      /> */}
        </Text>

      </View>

      {/* <Image
        source={require("../assets/images/trophy.png")}
        style={styles.cardImage}
      /> */}

    </View>

  </View>

</View>


 {/* Today's Check-In */}

<View style={styles.checkInCard}>

  <View style={styles.checkInLeft}>

    <Text style={styles.checkInTitle}>
      Today's Check-In 
    </Text>

    <Text style={styles.checkInSubtitle}>
      Track today's mood, symptoms and cycle to keep your health journey on track.
    </Text>

    <TouchableOpacity style={styles.checkInButton}>
      <Text style={styles.checkInButtonText}>
        Check In Now
      </Text>
    </TouchableOpacity>

  </View>

</View>

{/* Health History + AI Insight */}

<View style={styles.bottomRow}>

  {/* Health History */}

  <TouchableOpacity style={styles.dashboardCard}>

    <Image
  source={require("../assets/images/calendar.png")}
  style={styles.calendarImage}
   />

    <Text style={styles.dashboardCardTitle}>
      Health History
    </Text>

    <Text style={styles.dashboardCardText}>
      • Cycle History
    </Text>

    <Text style={styles.dashboardCardText}>
      • Symptoms History
    </Text>

    <Text style={styles.dashboardCardText}>
      • Wellness Trends
    </Text>

    <Text style={styles.viewMore}>
      View History →
    </Text>

  </TouchableOpacity>

  {/* AI Insight */}

  <TouchableOpacity style={styles.dashboardCard}>

    <Image
  source={require("../assets/images/robot_copy.png")}
  style={styles.aiRobotImage}
/>

    <Text style={styles.dashboardCardTitle}>
      AI Insight
    </Text>

    <Text style={styles.dashboardCardText}>
      💧 Drink more water today.
    </Text>

    <Text style={styles.dashboardCardText}>
      Your energy has improved this week.
    </Text>

    <Text style={styles.viewMore}>
      View Insight →
    </Text>

  </TouchableOpacity>

</View>

{/* Generate Report */}

<TouchableOpacity style={styles.reportCard}>

  <View style={styles.reportLeft}>

    <Image
      source={require("../assets/images/doctor_report.png")}
      style={styles.reportIcon}
    />

    <View>

      <Text style={styles.reportTitle}>
        Generate Report
      </Text>

      <Text style={styles.reportSubtitle}>
        Export your cycle & symptom history
      </Text>

    </View>

  </View>

  <Text style={styles.reportArrow}>
    →
  </Text>

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
  fontSize: 16,
  color: "#555",
  marginBottom: 4,
},

userName: {
  fontSize: 26,
  fontWeight: "700",
  color: "#EF4F8F",
  marginBottom: 6,
},

quote: {
  fontSize: 13,
  color: "#666",
  lineHeight: 18,
},

  girlImage: {
  width: 140,
  height: 140,

  resizeMode: "contain",
},

  doubleCardRow: {
  flexDirection: "row",
  justifyContent: "space-between",

  marginTop: 8,
  marginBottom: 18,
 },

cardHeader: {
  flexDirection: "row",
  alignItems: "center",

  marginBottom: 8,
},

cardIcon: {
  width: 20,
  height: 20,

  resizeMode: "contain",

  marginRight: 6,
},

fireIcon: {
  fontSize: 18,
  marginRight: 6,
},

cardTitle: {
  fontSize: 15,
  fontWeight: "700",

  color: "#333",
},

cardContent: {
  flexDirection: "row",

  alignItems: "center",

  justifyContent: "space-between",
},

bigPinkText: {
  fontSize: 24,
  fontWeight: "700",

  color: "#EF4F8F",

  marginBottom: 6,
},

infoText: {
  fontSize: 12,

  color: "#666",

  marginBottom: 2,
},

heartRow: {
  marginTop: 2,
  fontSize: 12,
},

cardImage: {
  width: 75,

  height: 75,

  resizeMode: "contain",
},

checkInCard: {
  backgroundColor: "#FFF0F6",

  borderRadius: 25,

  borderWidth: 1,
  borderColor: "#FFD7E8",

  padding: 18,

  flexDirection: "row",

  justifyContent: "space-between",

  alignItems: "center",

  marginBottom: 18,
},

checkInLeft: {
  flex: 1,

  paddingRight: 10,
},

checkInTitle: {
  fontSize: 21,

  fontWeight: "700",

  color: "#333",

  marginBottom: 8,
},

checkInSubtitle: {
  fontSize: 15,

  color: "#666",

  lineHeight: 22,

  marginBottom: 18,
},

checkInButton: {
  backgroundColor: "#FF5EA8",

  alignSelf: "flex-start",

  paddingHorizontal: 24,

  paddingVertical: 12,

  borderRadius: 30,
},

checkInButtonText: {
  color: "#FFF",

  fontSize: 15,

  fontWeight: "700",
},

checkInImage: {
  width: 20,

  height: 20,
  
  marginRight: 8,

  resizeMode: "contain",
},

smallCard: {
  width: "48.5%",

  backgroundColor: "#FFF",

  borderRadius: 20,

  borderWidth: 1,
  borderColor: "#F7D8E4",

  paddingHorizontal: 14,
  paddingVertical: 10,

  minHeight: 120,
},

smallCardImage: {
  width: 80,
  height: 80,

  resizeMode: "contain",

  marginBottom: 12,
},

smallCardTitle: {
  fontSize: 18,

  fontWeight: "700",

  color: "#333",

  marginBottom: 8,

  textAlign: "center",
},

smallCardSubtitle: {
  fontSize: 14,

  color: "#666",

  textAlign: "center",

  lineHeight: 20,
},

bottomRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 18,
},

dashboardCard: {
  width: "48%",

  backgroundColor: "#FFFFFF",

  borderRadius: 22,

  borderWidth: 1,
  borderColor: "#F7D8E4",

  padding: 16,

  minHeight: 220,

  alignItems: "center",
},

dashboardCardImage: {
  width: 70,
  height: 70,

  resizeMode: "contain",

  marginBottom: 10,
},

dashboardCardTitle: {
  fontSize: 16,

  fontWeight: "700",

  color: "#333",

  marginBottom: 10,

  textAlign: "center",
},

dashboardCardText: {
  fontSize: 13,

  color: "#666",

  lineHeight: 20,

  textAlign: "center",
},

viewMore: {
  marginTop: 14,

  fontSize: 13,

  fontWeight: "700",

  color: "#EF4F8F",
},

calendarImage: {
  width: 35,
  height: 35,

  resizeMode: "contain",

  marginBottom: 8,
},

aiRobotImage: {
  width: 35,
  height: 35,

  resizeMode: "contain",

  marginBottom: 8,
},

reportCard: {
  backgroundColor: "#FFFFFF",

  borderRadius: 20,

  borderWidth: 1,
  borderColor: "#F7D8E4",

  paddingHorizontal: 16,
  paddingVertical: 14,

  flexDirection: "row",

  justifyContent: "space-between",

  alignItems: "center",

  marginBottom: 25,
},

reportLeft: {
  flexDirection: "row",

  alignItems: "center",
},

reportIcon: {
  width: 34,
  height: 34,

  resizeMode: "contain",

  marginRight: 12,
},

reportTitle: {
  fontSize: 16,

  fontWeight: "700",

  color: "#333",
},

reportSubtitle: {
  fontSize: 12,

  color: "#777",

  marginTop: 2,
},

reportArrow: {
  fontSize: 24,

  color: "#EF4F8F",

  fontWeight: "700",
},

});