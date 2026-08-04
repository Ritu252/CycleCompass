import React, { useState } from "react";
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
import BackButton from "../components/BackButton";
import api from "../services/api";

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await api.put(
        "/api/auth/change-password",
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      alert(response.data.message || "Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      navigation.goBack();
    } catch (error: any) {
      console.log("Change password error:", error);
      alert(error.response?.data?.message || "Unable to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PhoneFrame>
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <BackButton />
          <Text style={styles.heading}>Change Password</Text>
          <Text style={styles.subHeading}>
            Update your account password to keep your profile secure.
          </Text>

          <TextInput
            placeholder="Current Password"
            placeholderTextColor="#B59AA6"
            style={styles.input}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
          />

          <TextInput
            placeholder="New Password"
            placeholderTextColor="#B59AA6"
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />

          <TextInput
            placeholder="Confirm New Password"
            placeholderTextColor="#B59AA6"
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity onPress={handleChangePassword} disabled={loading}>
            <LinearGradient
              colors={loading ? ["#E5A1BC", "#E57BA6"] : ["#FF9BC9", "#FF5EA8"]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                {loading ? "Saving..." : "Save Password"}
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
