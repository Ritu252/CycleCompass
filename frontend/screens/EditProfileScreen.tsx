import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import PhoneFrame from "../components/PhoneFrame";
import api from "../services/api";

export default function EditProfileScreen() {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [condition, setCondition] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem("profileData");
        const token = await AsyncStorage.getItem("token");

        if (token) {
          const response = await api.get("/api/onboard/profile/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const profile = response.data?.profile || {};
          setAge(profile.age != null ? String(profile.age) : "");
          setHeight(profile.height != null ? String(profile.height) : "");
          setWeight(profile.weight != null ? String(profile.weight) : "");
          setCondition(profile.condition || "");
        } else if (storedProfile) {
          const parsedProfile = JSON.parse(storedProfile);
          setAge(parsedProfile.age || "");
          setHeight(parsedProfile.height || "");
          setWeight(parsedProfile.weight || "");
          setCondition(parsedProfile.condition || "");
        }
      } catch (error) {
        console.log("Load profile error:", error);
      }
    };

    loadProfile();
  }, []);

  const handleSaveProfile = async () => {
    if (!age.trim() || !height.trim() || !weight.trim() || !condition.trim()) {
      alert("Please fill in all personal information fields.");
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");
      const profileData = {
        age: Number(age.trim()),
        height: Number(height.trim()),
        weight: Number(weight.trim()),
        pcos_status: condition.trim(),
      };

      if (token) {
        const response = await api.put("/api/onboard/profile/me", profileData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert(response.data.message || "Profile updated successfully.");
      } else {
        await AsyncStorage.setItem(
          "profileData",
          JSON.stringify({
            age: age.trim(),
            height: height.trim(),
            weight: weight.trim(),
            condition: condition.trim(),
          })
        );
        alert("Profile updated successfully.");
      }

      await AsyncStorage.setItem(
        "profileData",
        JSON.stringify({
          age: age.trim(),
          height: height.trim(),
          weight: weight.trim(),
          condition: condition.trim(),
        })
      );
      navigation.goBack();
    } catch (error) {
      console.log("Save profile error:", error);
      alert("Unable to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PhoneFrame>
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.heading}>Edit Profile</Text>
          <Text style={styles.subHeading}>
            Update your personal information below.
          </Text>

          <TextInput
            placeholder="Age"
            placeholderTextColor="#B59AA6"
            style={styles.input}
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />

          <TextInput
            placeholder="Height"
            placeholderTextColor="#B59AA6"
            style={styles.input}
            value={height}
            onChangeText={setHeight}
          />

          <TextInput
            placeholder="Weight"
            placeholderTextColor="#B59AA6"
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />

          <TextInput
            placeholder="Condition"
            placeholderTextColor="#B59AA6"
            style={styles.input}
            value={condition}
            onChangeText={setCondition}
          />

          <TouchableOpacity onPress={handleSaveProfile} disabled={loading}>
            <LinearGradient
              colors={loading ? ["#E5A1BC", "#E57BA6"] : ["#FF9BC9", "#FF5EA8"]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                {loading ? "Saving..." : "Save Profile"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </PhoneFrame>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDECF4",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 12,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#6C4E5D",
    marginBottom: 10,
  },
  subHeading: {
    color: "#967A87",
    lineHeight: 22,
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#FFF7FA",
    borderWidth: 1.5,
    borderColor: "#FFD7E8",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    borderRadius: 24,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 18,
  },
  cancelText: {
    marginTop: 18,
    textAlign: "center",
    color: "#FF5EA8",
    fontSize: 16,
  },
});
