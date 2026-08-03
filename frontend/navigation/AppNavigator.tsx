import React, { useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import DashboardScreen from "../screens/DashboardScreen";
import DailyCheckInScreen from "../screens/DailyCheckInScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AIAssistScreen from "../screens/AIAssistScreen";
import JournalScreen from "../screens/JournalScreen";
import HealthHistoryScreen from "../screens/HealthHistoryScreen";
import GenerateReportScreen from "../screens/GenerateReportScreen";

export type RootStackParamList = {
  AppStart: undefined;
  Register: undefined;
  Login: undefined;
  Onboarding: undefined;
  Dashboard: undefined;
  DailyCheckIn: undefined;
  Profile: undefined;
  AiAssist: undefined;
  HealthHistory: undefined;
  Journal: undefined;
  Report: undefined;
};

function AppStartScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const onboardingComplete = await AsyncStorage.getItem("onboardingComplete");

        if (token) {
          navigation.replace(
            onboardingComplete === "true" ? "Dashboard" : "Onboarding"
          );
        } else {
          navigation.replace("Register");
        }
      } catch (error) {
        console.log("App start error:", error);
        navigation.replace("Register");
      }
    };

    bootstrap();
  }, [navigation]);

  return null;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AppStart"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="AppStart" component={AppStartScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="DailyCheckIn" component={DailyCheckInScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="AiAssist" component={AIAssistScreen} />
        <Stack.Screen name="HealthHistory" component={HealthHistoryScreen} />
        <Stack.Screen name="Journal" component={JournalScreen} />
        <Stack.Screen name="Report" component={GenerateReportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}