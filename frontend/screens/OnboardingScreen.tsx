import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import PhoneFrame from "../components/PhoneFrame";
import api from "../services/api";

export default function OnboardingScreen() {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [pcos_status, setPcosStatus] = useState("");
  const navigation = useNavigation<any>();

  const handleOnboard = async () => {
    try {
      let userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");

      if (!userId && token) {
        const profileResponse = await api.get("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        userId = profileResponse.data.user?.userId?.toString();
        if (userId) {
          await AsyncStorage.setItem("userId", userId);
        }
      }

      if (!userId) {
        alert("User session not found. Please log in again.");
        return;
      }

      const response = await api.put(`/api/onboard/profile/${userId}`, {
        age: Number(age),
        height: Number(height),
        weight: Number(weight),
        pcos_status,
      });

      await AsyncStorage.setItem("onboardingComplete", "true");
      alert(response.data.message);
      navigation.replace("Dashboard");

      setAge("");
      setHeight("");
      setWeight("");
      setPcosStatus("");
    } catch (error: any) {
      console.log("Onboarding Error:", error);
      alert(error.response?.data?.message || "Onboard Failed");
    }
  };

  return (
    <PhoneFrame>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Tell Us About Yourself</Text>
        <Text style={styles.subtitle}>
          Let's personalize your CycleCompass journey
        </Text>

        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="24"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <Text style={styles.label}>Height (cm)</Text>
        <TextInput
          style={styles.input}
          placeholder="152"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />

        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          placeholder="49"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />

        <Text style={styles.label}>Have you been diagnosed with PCOS/PMOS?</Text>

        <TouchableOpacity
          style={[styles.option, pcos_status === "Diagnosed" && styles.selectedOption]}
          onPress={() => setPcosStatus("Diagnosed")}
        >
          <Text>Diagnosed</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, pcos_status === "Not Diagnosed" && styles.selectedOption]}
          onPress={() => setPcosStatus("Not Diagnosed")}
        >
          <Text>Not Diagnosed</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, pcos_status === "Not Sure" && styles.selectedOption]}
          onPress={() => setPcosStatus("Not Sure")}
        >
          <Text>Not Sure</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleOnboard}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </PhoneFrame>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 60,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#DB2777",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 12,
    color: "#374151",
  },

  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 15,
    padding: 15,
  },

  option: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
  },

  selectedOption: {
    backgroundColor: "#FBCFE8",
    borderColor: "#DB2777",
  },

  button: {
    backgroundColor: "#DB2777",
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 30,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});