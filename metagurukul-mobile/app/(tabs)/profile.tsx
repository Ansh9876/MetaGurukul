import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const userData = await SecureStore.getItemAsync("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("user");
    router.replace("/auth?mode=loginr"); // 🔥 go to auth properly
  };

  return (

    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
      </View>

      {/* PROFILE CARD */}
      {user && (
        <View style={styles.card}>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.name?.charAt(0).toUpperCase()}
            </Text>
          </View>

          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Role</Text>
            <Text style={styles.infoValue}>{user.role}</Text>
          </View>

        </View>
      )}

      {/* LOGOUT */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={handleLogout}
        activeOpacity={0.8}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20
  },

  header: {
    marginBottom: 20
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333"
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    marginBottom: 30
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#7d380a",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15
  },

  avatarText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold"
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5
  },

  email: {
    color: "#777",
    marginBottom: 15
  },

  infoBox: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center"
  },

  infoLabel: {
    fontSize: 12,
    color: "#777"
  },

  infoValue: {
    fontSize: 16,
    fontWeight: "600"
  },

  logoutBtn: {
    backgroundColor: "#7d380a",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    elevation: 5
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }

});