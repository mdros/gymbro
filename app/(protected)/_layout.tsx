import { Stack } from "expo-router";

import { useProtectedRoute } from "~/components/auth/ctx";

export default function Navigation() {
  useProtectedRoute();

  return (
    <Stack>
      <Stack.Screen
        name="scan"
        options={{
          presentation: "modal",
          title: "Add product",
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
