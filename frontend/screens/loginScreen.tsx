import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import PhoneFrame from "../components/PhoneFrame";


export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log({
      email,
      password,
    });
  };

  return (
    <PhoneFrame>
    <SafeAreaView style={styles.container}>
      <View style={styles.phoneFrame}>
        <View style={styles.card}>
          <Image
            source={require("../assets/images/cycle-compass2.png")}
            style={styles.teddy}
          />

          <Text style={styles.heading}>
            Welcome Back 💕
          </Text>

          <Text style={styles.brand}>
            CycleCompass
          </Text>

          <Text style={styles.subHeading}>
            Log in and continue your wellness journey 
          </Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#B59AA6"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#B59AA6"
            style={styles.input}
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />

          <TouchableOpacity onPress={handleLogin}>
            <LinearGradient
              colors={["#FF9BC9", "#FF5EA8"]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                Login
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.footer}>
            Don't have an account?
            <Text style={styles.login}> Register</Text>
          </Text>
        </View>
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
  },

  phoneFrame: {
    width: 390,
    maxWidth: "95%",
    height: 844,
    backgroundColor: "#FFF3F8",
    justifyContent: "center",
    padding: 20,
    borderRadius: 40,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.15,
    shadowRadius: 20,

    elevation: 10,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 35,
    padding: 28,

    shadowColor: "#FFB6D5",

    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.18,
    shadowRadius: 12,

    elevation: 10,
  },

  teddy: {
    width: 180,
    height: 180,
    alignSelf: "center",
    marginBottom: 10,
  },

  heading: {
    textAlign: "center",
    fontSize: 22,
    color: "#6C4E5D",
  },

  brand: {
    textAlign: "center",
    fontSize: 38,
    fontWeight: "800",
    color: "#FF5EA8",
    marginBottom: 10,
  },

  subHeading: {
    textAlign: "center",
    color: "#967A87",
    lineHeight: 22,
    marginBottom: 25,
  },

  input: {
    backgroundColor: "#FFF7FA",
    borderWidth: 1.5,
    borderColor: "#FFD7E8",
    borderRadius: 22,
    paddingHorizontal: 20,
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

  footer: {
    textAlign: "center",
    marginTop: 25,
    color: "#8C6E7B",
  },

  login: {
    color: "#FF5EA8",
    fontWeight: "700",
  },
});