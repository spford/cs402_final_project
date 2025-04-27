import React, { useState } from "react";
import {
  View, FlatList, Text, StyleSheet, TouchableOpacity, TextInput,
} from "react-native";
import ItemCard from "../components/ItemCard";

export default function LostScreen({
  items, setItems, currentUser, onSelectItem, goBack,
}) {
  const [q, setQ] = useState("");

  const filtered = items.filter(
    (i) => i.title.toLowerCase().includes(q.toLowerCase()) ||
           i.description.toLowerCase().includes(q.toLowerCase())
  );

  const clearLost = () =>
    setItems((arr) => arr.filter((i) => i.type !== "lost"));

  const delItem = (item) => {
    if (item.owner !== currentUser.username) return;
    setItems((arr) => arr.filter((i) => i !== item));
  };

  return (
    <View style={s.c}>
      <Text style={s.t}>Lost Items</Text>

      <TextInput style={s.s} placeholder="Search…" value={q} onChangeText={setQ} />

      <FlatList
        data={filtered}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onPress={() => onSelectItem(item)}
            onLongPress={() => delItem(item)}
          />
        )}
      />

      <View style={s.row}>
        <TouchableOpacity style={s.btn} onPress={goBack}>
          <Text style={s.bt}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.btn, { backgroundColor: "#FF3B30" }]} onPress={clearLost}>
          <Text style={s.bt}>Delete All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  c:{ flex:1,padding:20 }, t:{ fontSize:28,fontWeight:"bold",marginBottom:20 },
  s:{ borderWidth:1,borderColor:"#ccc",borderRadius:8,padding:10,marginBottom:15 },
  row:{ flexDirection:"row",justifyContent:"space-between" },
  btn:{ flex:1,backgroundColor:"#007AFF",paddingVertical:12,borderRadius:12,
        alignItems:"center",marginHorizontal:4 },
  bt:{ color:'#fff',fontSize:18 },
});
