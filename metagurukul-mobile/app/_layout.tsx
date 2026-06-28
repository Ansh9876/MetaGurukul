import { Stack, Redirect } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator, View } from "react-native";
import { PlayerProvider } from "@/context/PlayerContext";


export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync("token");
      const user = await SecureStore.getItemAsync("user");

      setLoggedIn(!!(token && user));
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <PlayerProvider>
      {loggedIn ? <Redirect href="/(tabs)" /> : <Redirect href="/auth" />}

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="courseDetails" />
        <Stack.Screen name="bundleDetails" />
        <Stack.Screen name="videoPlayer" />
      </Stack>
    </PlayerProvider>
  );
}