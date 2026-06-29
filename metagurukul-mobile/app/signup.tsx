import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { API } from "../services/api";
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from "@expo/vector-icons";

export default function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [whatsNumber, setWhatsNumber] = useState("");

    const [success, setSuccess] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignup = async () => {

        setError("");

        if (!name || !email || !password || !whatsNumber) {
            setError("Please fill in all fields.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);

        try {

            const res = await API.post("/auth/signup", {
                name,
                email,
                password,
                whatsNumber
            });

            await SecureStore.setItemAsync("token", res.data.token);
            
            await SecureStore.setItemAsync("token", res.data.token);

await SecureStore.setItemAsync(
    "user",
    JSON.stringify({
        name: res.data.name,
        email: res.data.email,
        role: res.data.role
    })
);

            setSuccess(true);

            setTimeout(() => {
                router.replace("/(tabs)");
            }, 1500);

        } catch (err: any) {

            const message = err.response?.data?.message;

            if (message) {
                setError(message);
            } else {
                setError("Something went wrong. Please try again.");
            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <View style={styles.container}>

            <Text style={styles.title}>Create Account</Text>

            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={(text) => {
                    setName(text);
                    setError("");
                }}
                placeholderTextColor="#777"
                style={styles.input}
            />

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => {
                    setEmail(text);
                    setError("");
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#777"
                style={styles.input}
            />

            <View style={styles.passwordContainer}>

                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#777"
                    secureTextEntry={!showPassword}
                    value={password}
                    style={styles.passwordInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text) => {
                        setPassword(text);
                        setError("");
                    }}

                />

                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        size={22}
                        color="#777"
                    />
                </TouchableOpacity>

            </View>

            <TextInput
                placeholder="WhatsApp Number"
                value={whatsNumber}
                onChangeText={(text) => {
                    setWhatsNumber(text);
                    setError("");
                }}
                keyboardType="phone-pad"
                placeholderTextColor="#777"
                style={styles.input}
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
                onPress={handleSignup}
            >
                <Text style={styles.buttonText}>
                    {loading ? "Creating Account..." : "Sign Up"}
                </Text>
            </TouchableOpacity>

            <Text
                style={styles.link}
                onPress={() => router.replace("/auth")}
            >
                Already have an account? Login
            </Text>
            {success && (
                <View style={styles.popup}>
                    <Text style={styles.popupText}>Signup Successful 🎉</Text>
                </View>
            )}
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
        textAlign: "center",
        fontWeight: "bold"
    },
    link: {
        marginTop: 15,
        textAlign: "center",
        color: "#7d380a",
        fontWeight: "600"
    },
    popup: {
        position: "absolute",
        top: 60,
        alignSelf: "center",
        backgroundColor: "#4CAF50",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        zIndex: 10
    },

    popupText: {
        color: "#fff",
        fontWeight: "bold"
    },

    error: {
        color: "#d32f2f",
        fontSize: 14,
        marginBottom: 12,
        marginLeft: 4,
    },

    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        backgroundColor: "#fafafa",
        paddingHorizontal: 14,
        marginBottom: 15,
    },

    passwordInput: {
        flex: 1,
        paddingVertical: 14,
        color: "#000",
    },
});