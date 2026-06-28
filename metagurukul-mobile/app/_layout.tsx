import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { View, ActivityIndicator } from "react-native";
import { PlayerProvider } from "@/context/PlayerContext";
import MiniPlayer from "../components/MiniPlayer";
import { usePathname } from "expo-router";

export default function RootLayout() {

    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = async () => {

        const token = await SecureStore.getItemAsync("token");
        const user = await SecureStore.getItemAsync("user");

        console.log("TOKEN =", token);
        console.log("USER =", user);

        if (token && user) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

        setLoading(false);

    };

    if (loading) {
        return (
            <PlayerProvider>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <ActivityIndicator size="large" />
                </View>

                {pathname.startsWith("/(tabs)") && <MiniPlayer />}

            </PlayerProvider>
        );
    }

    return (

        <PlayerProvider>

            <View style={{ flex: 1 }}>

                <Stack screenOptions={{ headerShown: false }}>

                    {isLoggedIn ? (
                        <Stack.Screen name="(tabs)" />
                    ) : (
                        <Stack.Screen name="auth" />
                    )}

                    <Stack.Screen name="courseDetails" />
                    <Stack.Screen name="videoPlayer" />

                </Stack>



            </View>

        </PlayerProvider>

    );

}