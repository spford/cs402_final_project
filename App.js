import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import LostScreen from "./screens/LostScreen";
import FoundScreen from "./screens/FoundScreen";
import AddItemScreen from "./screens/AddItemScreen";
import ItemDetailScreen from "./screens/ItemDetailScreen";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const navigate = (target) => setScreen(target);

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return <HomeScreen goTo={navigate} />;
      case "lost":
        return (
          <LostScreen
            items={items.filter((item) => item.type === "lost")}
            onSelectItem={(item) => {
              setSelectedItem(item);
              setScreen("detail");
            }}
            goBack={() => setScreen("home")}
          />
        );
      case "found":
        return (
          <FoundScreen
            items={items.filter((item) => item.type === "found")}
            onSelectItem={(item) => {
              setSelectedItem(item);
              setScreen("detail");
            }}
            goBack={() => setScreen("home")}
          />
        );
      case "add":
        return (
          <AddItemScreen
            setItems={setItems}
            onSuccess={() => setScreen("home")}
          />
        );
      case "detail":
        return (
          <ItemDetailScreen
            item={selectedItem}
            goBack={() => setScreen("home")}
          />
        );
      default:
        return <Text style={styles.title}>404 - Screen not found</Text>;
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 32, textAlign: "center", marginTop: 50 },
});
