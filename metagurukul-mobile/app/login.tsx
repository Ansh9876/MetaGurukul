import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { API } from "../services/api";
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const res = await API.post("/auth/login", {

                email,
                password

            });

            await SecureStore.setItemAsync(
                "token",
                res.data.token
            );

            await SecureStore.setItemAsync(
                "user",
                JSON.stringify(res.data)
            );

            router.replace("/(tabs)");

        } catch (error: any) {
            console.log("LOGIN ERROR:", error.response?.data || error.message);
        }

    };

    return (

        <View style={styles.container}>

            <Text style={styles.title}>
                MetaGurukul Login
            </Text>

            <TextInput

                placeholder="Email"

                style={styles.input}

                value={email}

                onChangeText={setEmail}

            />

            <TextInput

                placeholder="Password"

                secureTextEntry

                style={styles.input}

                value={password}

                onChangeText={setPassword}

            />

            <TouchableOpacity

                style={styles.button}

                onPress={handleLogin}

            >

                <Text style={styles.buttonText}>
                    Login
                </Text>

            </TouchableOpacity>
            <Text
                style={styles.link}
                onPress={() => router.replace("/auth?mode=signup")}
            >
                Don't have an account? Signup
            </Text>

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        padding: 20
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },

    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 14,
        borderRadius: 12,
        marginBottom: 15,
        backgroundColor: "#fafafa"
    },

    button: {
        backgroundColor: "#7d380a",
        padding: 14,
        borderRadius: 14,
        alignItems: "center",
        marginTop: 10
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16
    },

    link: {
        marginTop: 15,
        textAlign: "center",
        color: "#7d380a",
        fontWeight: "600"
    }

});