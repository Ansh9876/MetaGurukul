import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import Login from "./login";
import Signup from "./signup";
import { useLocalSearchParams } from "expo-router";

export default function Auth() {

  const { mode } = useLocalSearchParams();
  const [isLogin, setIsLogin] = useState(mode !== "signup");

  return (
    <View style={styles.container}>

      {/* LOGO / TITLE */}
      <Text style={styles.logo}>MetaGurukul</Text>
      <Text style={styles.tagline}>Learn Faster 🚀</Text>

      {/* TOGGLE */}
      <View style={styles.switch}>
        <TouchableOpacity
          style={[styles.tab, isLogin && styles.activeTab]}
          onPress={() => setIsLogin(true)}
        >
          <Text style={isLogin ? styles.activeText : styles.inactiveText}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, !isLogin && styles.activeTab]}
          onPress={() => setIsLogin(false)}
        >
          <Text style={!isLogin ? styles.activeText : styles.inactiveText}>
            Signup
          </Text>
        </TouchableOpacity>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        {isLogin ? <Login /> : <Signup />}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    padding: 20
  },

  logo: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    color: "#7d380a"
  },

  tagline: {
    textAlign: "center",
    color: "#777",
    marginBottom: 30
  },

  switch: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    borderRadius: 30,
    padding: 4,
    marginBottom: 20
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 30
  },

  activeTab: {
    backgroundColor: "#7d380a"
  },

  activeText: {
    color: "#fff",
    fontWeight: "bold"
  },

  inactiveText: {
    color: "#777"
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 }
  }

});