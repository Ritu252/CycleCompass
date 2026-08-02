import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import PhoneFrame from "../components/PhoneFrame";
import BottomNavigation from "../components/BottomNavigation";

export default function ProfileScreen() {

  return (

    <PhoneFrame>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >

        {/* Avatar */}

        <View style={styles.header}>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👩</Text>
          </View>

          <Text style={styles.name}>
            Ritu Rani
          </Text>

          <Text style={styles.email}>
            riturani@gmail.com
          </Text>

        </View>

        {/* Personal Info */}

        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            🌸 Personal Information
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>Age</Text>
            <Text style={styles.value}>24 Years</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Height</Text>
            <Text style={styles.value}>5'0"</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Weight</Text>
            <Text style={styles.value}>49 kg</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Condition</Text>
            <Text style={styles.value}>PCOS</Text>
          </View>

        </View>

        {/* Account */}

        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            ⚙️ Account
          </Text>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>
              ✏️ Edit Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>
              🔒 Change Password
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>
              📄 Privacy Policy
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>
              ℹ️ About CycleCompass
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>
              🚪 Logout
            </Text>
          </TouchableOpacity>

        </View>

        <Text style={styles.version}>
          Version 1.0.0
        </Text>

      </ScrollView>

      <BottomNavigation />

    </PhoneFrame>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFF8FB",
    paddingHorizontal: 20,
  },

  header: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 25,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFE6F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  avatarText: {
    fontSize: 46,
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#EF4F8F",
  },

  email: {
    fontSize: 15,
    color: "#777",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FFD7E6",
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#EF4F8F",
    marginBottom: 18,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  label: {
    fontSize: 16,
    color: "#666",
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  option: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3E2EA",
  },

  optionText: {
    fontSize: 16,
    color: "#444",
  },

  logoutButton: {
    marginTop: 22,
    backgroundColor: "#EF4F8F",
    borderRadius: 30,
    alignItems: "center",
    paddingVertical: 14,
  },

  logoutText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  version: {
    textAlign: "center",
    color: "#999",
    marginBottom: 30,
  },

});