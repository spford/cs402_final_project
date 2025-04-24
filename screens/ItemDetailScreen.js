import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function ItemDetailScreen({ item, goBack }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      {item.location && <Text style={styles.location}>{item.location}</Text>}
      {item.imageUri && (
        <Image source={{ uri: item.imageUri }} style={styles.image} />
      )}
      {item.latitude && item.longitude && (
        <MapView
          style={styles.map}
          region={{
            latitude: item.latitude,
            longitude: item.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
        >
          <Marker
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
          />
        </MapView>
      )}
      <TouchableOpacity style={styles.button} onPress={goBack}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  desc: { fontSize: 16, marginBottom: 10 },
  location: { fontSize: 14, color: "#666", marginBottom: 10 },
  image: { width: "100%", height: 200, borderRadius: 8, marginBottom: 15 },
  map: { width: "100%", height: 200, marginBottom: 20 },
  button: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18 },
});
