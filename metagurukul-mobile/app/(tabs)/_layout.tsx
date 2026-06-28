import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../../constants/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MiniPlayer from "../../components/MiniPlayer";

export default function TabLayout() {

    return (

        <SafeAreaProvider>

            <Tabs

                screenOptions={{

                    headerShown: false,

                    tabBarActiveTintColor: Colors.primary,

                    tabBarStyle: {
                        height: 65,
                        paddingTop: 5,
                        paddingBottom: 8,
                        borderTopWidth: 0,
                        elevation: 10,
                        shadowColor: "#000",
                        shadowOpacity: 0.08,
                        shadowRadius: 10
                    }

                }}

            >

                <Tabs.Screen
                    name="index"
                    options={{

                        title: "Home",

                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home" size={size} color={color} />
                        )

                    }}
                />

                <Tabs.Screen
                    name="courses"
                    options={{

                        title: "Courses",

                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="book" size={size} color={color} />
                        )

                    }}
                />

                <Tabs.Screen
                    name="profile"
                    options={{

                        title: "Profile",

                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person" size={size} color={color} />
                        )

                    }}
                />
                
            </Tabs>
            <MiniPlayer />
        </SafeAreaProvider>
    );

}