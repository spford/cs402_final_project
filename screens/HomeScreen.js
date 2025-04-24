import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ goTo }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FoundIt</Text>

      <TouchableOpacity style={styles.button} onPress={() => goTo("lost")}>
        <Text style={styles.buttonText}>Lost Items</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => goTo("found")}>
        <Text style={styles.buttonText}>Found Items</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.addButton]}
        onPress={() => goTo("add")}
      >
        <Text style={styles.buttonText}>Add New Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
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
});
