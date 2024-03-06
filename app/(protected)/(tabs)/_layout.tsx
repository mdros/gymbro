import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { useProtectedRoute } from "~/components/auth/ctx";

export { ErrorBoundary } from "expo-router";

export default function Navigation() {
  useProtectedRoute();

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "hsl(240 3.7% 15.9%)",
        },
        tabBarActiveTintColor: "hsl(0 0% 98%)",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-variant"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
