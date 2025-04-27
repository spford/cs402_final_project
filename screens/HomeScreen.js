import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ currentUser, goTo, logout }) {
  return (
    <View style={styles.container}>
      <Text style={styles.logged}>Logged in as {currentUser.username}</Text>
      <Text style={styles.title}>FoundIt</Text>

      <TouchableOpacity style={styles.button} onPress={() => goTo("lost")}>
        <Text style={styles.buttonText}>Browse Lost Items</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => goTo("found")}>
        <Text style={styles.buttonText}>Browse Found Items</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.addButton]}
        onPress={() => goTo("add")}
      >
        <Text style={styles.buttonText}>Post New Item</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  logged: { position: "absolute", top: 50, fontSize: 14, color: "#666" },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 40 },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  addButton: { backgroundColor: "#34C759" },
  buttonText: { color: "#fff", fontSize: 18 },
  logout: { marginTop: 40 },
  logoutText: { color: "#FF3B30", fontSize: 16 },
});
