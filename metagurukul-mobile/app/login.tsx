import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { API } from "../services/api";
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {

        setError("");

        if (!email || !password) {
            setError("Please enter email and password.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        try {

            const res = await API.post("/auth/login", {
                email,
                password
            });

            await SecureStore.setItemAsync("token", res.data.token);

            await SecureStore.setItemAsync(
                "user",
                JSON.stringify({
                    name: res.data.name,
                    email: res.data.email,
                    role: res.data.role
                })
            );

            router.replace("/(tabs)");

        } catch (error: any) {

            const message = error.response?.data?.message;

            if (message) {
                setError(message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {

            setLoading(false);
        };
    };
    return (

        <View style={styles.container}>

            <Text style={styles.title}>
                MetaGurukul Login
            </Text>

            <TextInput

                placeholder="Email"
                placeholderTextColor="#777"
                style={[styles.input, { color: "#000" }]}

                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(text) => {
                    setEmail(text);
                    setError("");
                }}

            />

            <TextInput

                placeholder="Password"
                placeholderTextColor="#777"
                secureTextEntry

                style={[styles.input, { color: "#000" }]}

                value={password}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(text) => {
                    setPassword(text);
                    setError("");
                }}

            />

            {error ? (
                <Text style={styles.error}>
                    {error}
                </Text>
            ) : null}

            <TouchableOpacity
                style={[
                    styles.button,
                    loading && { opacity: 0.7 }
                ]}
                disabled={loading}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>
                    {loading ? "Logging in..." : "Login"}
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
        backgroundColor: "#fafafa",
        color: "#000", // 👈 Add this
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
    },
    error: {
        color: "#d32f2f",
        fontSize: 14,
        marginBottom: 12,
        marginLeft: 4
    },

});