import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import colors from "../styles/theme";
import { Text } from "react-native"; // Add this import
import FleurViolet from "@/components/Svg/FleurViolet";
import FleurGris from "@/components/Svg/FleurGris";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="Accueil"
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <FleurViolet width={25} height={25} />
            ) : (
              <FleurGris width={25} height={25} />
            ), // Added return
          // tabBarIcon: ({ color, focused }) => <FontAwesome size={28} name="home" color={focused ? colors.primary : color} />,
          tabBarLabel: ({ color, focused }) => (
            <Text style={{ color: focused ? colors.primary : color }}>
              Accueil
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6
              name="user-large"
              size={28}
              color={focused ? colors.primary : color}
            />
          ),
          tabBarLabel: ({ color, focused }) => (
            <Text style={{ color: focused ? colors.primary : color }}>
              Profile
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
