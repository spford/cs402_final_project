import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import MapView, { Marker } from "react-native-maps";

export default function AddItemScreen({ setItems, onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [type, setType] = useState("lost");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showMapPicker, setShowMapPicker] = useState(false);

  useEffect(() => {
    const runPermissionCheck = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
      }
    };

    runPermissionCheck();
  }, []);

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.5,
      });

      console.log("Image picker result:", result);

      if (!result.canceled && result.assets?.length > 0) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Image picker error:", error);
      alert("Failed to open image picker.");
    }
  };

  const handleSubmit = () => {
    const newItem = {
      title,
      description,
      location: location.trim() || null,
      imageUri,
      type,
      latitude,
      longitude,
    };
    setItems((prev) => [...prev, newItem]);
    onSuccess();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Location (optional)"
        value={location}
        onChangeText={setLocation}
      />

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggle, type === "lost" && styles.toggleActive]}
          onPress={() => setType("lost")}
        >
          <Text style={styles.toggleText}>Lost</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggle, type === "found" && styles.toggleActive]}
          onPress={() => setType("found")}
        >
          <Text style={styles.toggleText}>Found</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
        <Text style={styles.imagePickerText}>
          {imageUri ? "Change Image" : "Pick an Image (optional)"}
        </Text>
      </TouchableOpacity>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}

      <TouchableOpacity
        style={styles.imagePicker}
        onPress={() => setShowMapPicker(true)}
      >
        <Text style={styles.imagePickerText}>Drop Pin on Map</Text>
      </TouchableOpacity>

      {showMapPicker && (
        <MapView
          style={{ width: "100%", height: 200, marginBottom: 15 }}
          initialRegion={{
            latitude: 43.60304,
            longitude: -116.20088,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }}
          onPress={(e) => {
            const { latitude, longitude } = e.nativeEvent.coordinate;
            setLatitude(latitude);
            setLongitude(longitude);
            setShowMapPicker(false);
          }}
        >
          {latitude && longitude && (
            <Marker coordinate={{ latitude, longitude }} />
          )}
        </MapView>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  toggleContainer: { flexDirection: "row", marginBottom: 15 },
  toggle: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  toggleActive: {
    backgroundColor: "#007AFF",
  },
  toggleText: {
    color: "#fff",
  },
  imagePicker: {
    padding: 12,
    backgroundColor: "#eee",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 15,
  },
  imagePickerText: {
    color: "#333",
  },
  imagePreview: {
    width: "100%",
    height: 150,
    marginBottom: 15,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: "#34C759",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
  },
});
