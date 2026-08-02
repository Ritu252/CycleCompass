import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegisterScreen from "../screens/registerScreen";
import LoginScreen from "../screens/loginScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import DashboardScreen from "../screens/DashboardScreen";
import DailyCheckInScreen from "../screens/DailyCheckInScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AIAssistScreen from "../screens/AIAssistScreen";
import JournalScreen from "../screens/JournalScreen";
import HealthHistoryScreen from "../screens/HealthHistoryScreen";
import GenerateReportScreen from "../screens/GenerateReportScreen";



export type RootStackParamList = {
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

const Stack = createNativeStackNavigator<RootStackParamList>();



export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
        />

        <Stack.Screen
          name="DailyCheckIn"
          component={DailyCheckInScreen}
        />

        <Stack.Screen
         name = "Profile"
         component={ProfileScreen}
         />

        <Stack.Screen
         name = "AiAssist"
         component={AIAssistScreen}
         />
        
        <Stack.Screen
         name = "HealthHistory"
         component={HealthHistoryScreen}
         />

        <Stack.Screen
         name = "Journal"
         component={JournalScreen}
         />
        
        <Stack.Screen
         name = "Report"
         component={GenerateReportScreen}
         />


      </Stack.Navigator>
    </NavigationContainer>
  );
}