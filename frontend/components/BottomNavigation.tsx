import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";


export default function BottomNavigation() {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate("Dashboard")}
        >
        <Image
          source={require("../assets/images/home.png")}  
          style={styles.icon}
        />
        <Text style={styles.activeLabel}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={styles.tab}
      onPress={() => navigation.navigate("HealthHistory")}
      >
        <Image
          source={require("../assets/images/calendar_check.png")}
          style={styles.icon}
        />
        <Text style={styles.label}>History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.centerButton}
        onPress={() => navigation.navigate("DailyCheckIn")}
        >
        <Image
          source={require("../assets/images/plus.png")}
          style={styles.plusIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity
      style={styles.tab}
      onPress={() => navigation.navigate("Journal")}
      >
        <Image
          source={require("../assets/images/journal.png")}
          style={styles.icon}
        />
        <Text style={styles.label}>Journal</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={styles.tab}
      onPress={() => navigation.navigate("Profile")}
      >
        <Image
          source={require("../assets/images/profile.png")}
          style={styles.icon}
        />
        <Text style={styles.label}>Profile</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    height: 82,

    backgroundColor: "#FFFFFF",

    flexDirection: "row",

    justifyContent: "space-around",

    alignItems: "center",

    borderTopWidth: 1,

    borderTopColor: "#F3D7E2",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    elevation: 10,
  },

  tab: {
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    width: 24,
    height: 24,

    resizeMode: "contain",

    marginBottom: 5,
  },

  label: {
    fontSize: 11,
    color: "#999",
  },

  activeLabel: {
    fontSize: 11,
    color: "#EF4F8F",
    fontWeight: "700",
  },

  centerButton: {
    width: 62,
    height: 62,

    borderRadius: 31,

    backgroundColor: "#EF4F8F",

    justifyContent: "center",
    alignItems: "center",

    marginTop: -28,

    elevation: 8,
  },

  plusIcon: {
  width: 104,
  height: 104,

  resizeMode: "contain",
},

});