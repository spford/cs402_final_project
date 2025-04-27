import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function ItemDetailScreen({
  item,
  currentUser,   // <-- new prop
  goBack,
  deleteItem,    // <-- new prop (called when owner taps Delete)
}) {
  const isOwner = currentUser.username === item.owner;
  const intro =
    item.type === "lost"
      ? `Item was lost by ${item.owner}`
      : `Item was found by ${item.owner}`;

  return (
    <View style={styles.container}>
      <Text style={styles.intro}>{intro}</Text>

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

      <View style={styles.btnRow}>
        {isOwner ? (
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: "#FF3B30" }]}
            onPress={() => {
              deleteItem(item);
              goBack();
            }}
          >
            <Text style={styles.actionText}>Delete Post</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => item.phone && Linking.openURL(`tel:${item.phone}`)}
            disabled={!item.phone}
          >
            <Text style={styles.actionText}>Contact Poster</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  intro: { fontSize: 16, color: "#333", marginBottom: 8 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  desc: { fontSize: 16, marginBottom: 10 },
  location: { fontSize: 14, color: "#666", marginBottom: 10 },
  image: { width: "100%", height: 200, borderRadius: 8, marginBottom: 15 },
  map: { width: "100%", height: 200, marginBottom: 20 },

  btnRow: { flexDirection: "row", justifyContent: "space-between" },

  actionBtn: {
    flex: 1,
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 8,
  },
  actionText: { color: "#fff", fontSize: 18 },

  backBtn: {
    flex: 1,
    backgroundColor: "#34C759",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 8,
  },
  backText: { color: "#fff", fontSize: 18 },
});
