import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import AuthScreen from "./screens/AuthScreen";
import HomeScreen from "./screens/HomeScreen";
import AddItemScreen from "./screens/AddItemScreen";
import LostScreen from "./screens/LostScreen";
import FoundScreen from "./screens/FoundScreen";
import ItemDetailScreen from "./screens/ItemDetailScreen";

import { loadAll, saveAll } from "./utils/api";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);// auth
  const [dataObj, setDataObj] = useState({ accounts: [], items: [] });
  const [loaded, setLoaded]  = useState(false);// load flag

  const [screen, setScreen] = useState("home");// navigation
  const [selectedItem, setSelectedItem] = useState(null);

  const items = dataObj.items;

  useEffect(() => {
    (async () => {
      try {
        const d = await loadAll();
        setDataObj(d);
      } catch (e) {
        console.warn("Load error:", e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    saveAll(dataObj).catch((e) => console.warn("Save error:", e));
  }, [dataObj, loaded]);

  const setItems = (fn) =>
    setDataObj((prev) => ({ ...prev, items: fn(prev.items) }));

  const go = (dest) => setScreen(dest);

  if (!currentUser) {
    return (
      <AuthScreen
        onLogin={setCurrentUser}
        setData={setDataObj}
      />
    );
  }

  switch (screen) {
    case "home":
    return (
      <HomeScreen
        currentUser={currentUser}
        goTo={go}
        logout={() => {
          setCurrentUser(null);  // returns us to AuthScreen
          setScreen("home");
        }}
      />
    );
    case "lost":
      return (
        <LostScreen
          items={items.filter((i) => i.type === "lost")}
          setItems={setItems}
          currentUser={currentUser}
          onSelectItem={(item) => { setSelectedItem(item); go("detail"); }}
          goBack={() => go("home")}
        />
      );
    case "found":
      return (
        <FoundScreen
          items={items.filter((i) => i.type === "found")}
          setItems={setItems}
          currentUser={currentUser}
          onSelectItem={(item) => { setSelectedItem(item); go("detail"); }}
          goBack={() => go("home")}
        />
      );
    case "add":
      return (
        <AddItemScreen
          user={currentUser}
          setItems={setItems}
          onSuccess={() => go("home")}
          goBack={() => go("home")}
        />
      );
    case "detail":
      return (
        <ItemDetailScreen
          item={selectedItem}
          currentUser={currentUser}
          deleteItem={(itm) => setItems((arr) => arr.filter((i) => i !== itm))}
          goBack={() => go("home")}
        />
      );
    default:
      return (
        <View style={styles.center}>
          <Text style={styles.title}>404 – Screen not found</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title:  { fontSize: 32, textAlign: "center" },
});
