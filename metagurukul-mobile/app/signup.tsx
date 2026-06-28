import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { API } from "../services/api";
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';

export default function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [whatsNumber, setWhatsNumber] = useState("");

    const [success, setSuccess] = useState(false);

    const handleSignup = async () => {

        try {

            const res = await API.post("/auth/signup", {
                name,
                email,
                password,
                whatsNumber
            });

            await SecureStore.setItemAsync("token", res.data.token);

            setSuccess(true);

            setTimeout(() => {
                router.replace("/");
            }, 1500);

        } catch (err: any) {
            console.log(err);
            alert(err.response?.data?.message || "Signup failed ❌");
        }

    };

    return (

        <View style={styles.container}>

            <Text style={styles.title}>Create Account</Text>

            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />

            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />
            <TextInput
                placeholder="WhatsApp Number"
                value={whatsNumber}
                onChangeText={setWhatsNumber}
                style={styles.input}
            />

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
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
    }
});