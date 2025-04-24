import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function ItemCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text numberOfLines={1} style={styles.itemDesc}>
        {item.description}
      </Text>
      {item.location && (
        <Text style={styles.itemLocation}>{item.location}</Text>
      )}
      {item.imageUri && (
        <Image source={{ uri: item.imageUri }} style={styles.image} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
    width: "100%",
  },
  itemTitle: { fontSize: 20, fontWeight: "bold" },
  itemDesc: { fontSize: 16, marginTop: 4 },
  itemLocation: { fontSize: 14, color: "#666", marginTop: 4 },
  image: {
    width: "100%",
    height: 150,
    marginTop: 10,
    borderRadius: 8,
  },
});
