import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import ItemCard from "../components/ItemCard";

export default function FoundScreen({
  items,
  setItems,
  currentUser,
  onSelectItem,
  goBack,
}) {
  const [query, setQuery] = useState("");
  const filtered = items.filter(
    (i) =>
      i.title.toLowerCase().includes(query.toLowerCase()) ||
      i.description.toLowerCase().includes(query.toLowerCase())
  );
  const deleteItem = (item) => {
    if (item.owner !== currentUser.username) return;
    setItems((arr) => arr.filter((i) => i !== item));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.user}>{currentUser.username}</Text>
      <Text style={styles.title}>Found Items</Text>

      <TextInput
        style={styles.search}
        placeholder="Search found items…"
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filtered}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onPress={() => onSelectItem(item)}
            onLongPress={() => deleteItem(item)}
          />
        )}
      />
      <TouchableOpacity style={styles.button} onPress={goBack}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  user: {
    alignSelf: "flex-end",
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginBottom: 4,
  },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontSize: 18 },
});
