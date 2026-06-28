import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
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

  const handleLogout = () => {

    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await SecureStore.deleteItemAsync("token");
            await SecureStore.deleteItemAsync("user");
            router.replace("/auth?mode=login");
          },
        },
      ]
    );

  };

  return (

    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View>
        <Text style={styles.title}>My Profile</Text>
        <Text style={styles.subtitle}>
          Manage your account information
        </Text>
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

      <View style={styles.versionCard}>
        <Text style={styles.versionLabel}>App Version</Text>
        <Text style={styles.versionValue}>1.0.0</Text>
      </View>

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

  subtitle: {
    color: "#777",
    fontSize: 14,
    marginTop: 4,
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
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#7d380a",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    borderWidth: 4,
    borderColor: "#fff",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
},

  avatarText: {
    color: "#fff",
    fontSize: 34,
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

  versionCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  versionLabel: {
    color: "#777",
    fontSize: 13,
  },

  versionValue: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
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