import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import MapView, { Marker } from "react-native-maps";

export default function AddItemScreen({ user, setItems, onSuccess, goBack }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [type, setType] = useState("lost");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showMapPicker, setShowMapPicker] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission needed", "Media‑library access is required.");
      }
    })();
  }, []);

  const handlePickImage = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.5,
      });
      if (!res.canceled && res.assets?.length) {
        setImageUri(res.assets[0].uri);
      }
    } catch (e) {
      console.error(e);
      Alert.alert("Image picker error", "Could not open your gallery.");
    }
  };

  const handleSubmit = () => {
    if (!isValid) return;
    const newItem = {
      title: title.trim(),
      description: description.trim(),
      location: location.trim() || null,
      imageUri,
      type,
      latitude,
      longitude,
      owner: user.username,
      phone: user.phone,
    };
    setItems((prev) => [...prev, newItem]);
    onSuccess();
  };

  const isValid =
    title.trim() !== "" &&
    description.trim() !== "" &&
    latitude !== null &&
    longitude !== null;

  return (
    <ScrollView
      contentContainerStyle={styles.scroll}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        {type === "lost" ? "Post New Lost Item" : "Post New Found Item"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 90 }]}
        multiline
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Location (optional)"
        value={location}
        onChangeText={setLocation}
      />

      <View style={styles.toggleContainer}>
        {["lost", "found"].map((val) => (
          <TouchableOpacity
            key={val}
            style={[
              styles.toggle,
              type === val ? styles.toggleActive : styles.toggleInactive,
            ]}
            onPress={() => setType(val)}
          >
            <Text
              style={
                type === val
                  ? styles.toggleTextActive
                  : styles.toggleTextInactive
              }
            >
              {val === "lost" ? "Lost" : "Found"}
            </Text>
          </TouchableOpacity>
        ))}
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
          style={styles.map}
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
          }}
        >
          {latitude && longitude && (
            <Marker coordinate={{ latitude, longitude }} />
          )}
        </MapView>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButtonRow} onPress={goBack}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.submitButton, !isValid && styles.submitButtonDisabled]}
          disabled={!isValid}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  toggleContainer: { flexDirection: "row", marginBottom: 15 },
  toggle: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: "center",
  },
  toggleActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  toggleInactive: {
    backgroundColor: "white",
    borderColor: "#007AFF",
  },
  toggleTextActive: { color: "#fff" },
  toggleTextInactive: { color: "#007AFF" },
  imagePicker: {
    padding: 12,
    backgroundColor: "#eee",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 12,
  },
  imagePickerText: { color: "#333" },
  imagePreview: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  backButtonRow: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#eee",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  backText: { fontSize: 18, color: "#007AFF" },
  submitButton: {
    backgroundColor: "#34C759",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginLeft: 8,
  },
  submitButtonDisabled: { backgroundColor: "#a5d6a7" },
  submitText: { color: "#fff", fontSize: 18 },
});
