import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
} from "react-native";
import { loadAll, saveAll } from "../utils/api";

export default function AuthScreen({ onLogin, setData }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const submit = async () => {
    const data = await loadAll();

    if (mode === "signup") {
      if (data.accounts.find((u) => u.username === username)) {
        alert("Username taken"); return;
      }
      data.accounts.push({ username, password, phone });
      await saveAll(data);
    }

    const u = data.accounts.find(
      (x) => x.username === username && x.password === password
    );
    if (!u) { alert("Bad credentials"); return; }

    setData(data);
    onLogin(u);
  };

  return (
    <View style={s.c}>
      <Text style={s.t}>{mode === "login" ? "Log In" : "Sign Up"}</Text>

      <TextInput style={s.i} placeholder="Username" autoCapitalize="none"
        value={username} onChangeText={setUsername} />
      <TextInput style={s.i} placeholder="Password" secureTextEntry
        value={password} onChangeText={setPassword} />
      {mode === "signup" && (
        <TextInput style={s.i} placeholder="Phone" keyboardType="phone-pad"
          value={phone} onChangeText={setPhone} />
      )}

      <TouchableOpacity style={s.p} onPress={submit}>
        <Text style={s.pt}>
          {mode === "login" ? "Log In" : "Create Account"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setMode(mode === "login" ? "signup" : "login")}>
        <Text style={s.link}>
          {mode === "login" ? "Need an account? Sign up" : "Already have one? Log in"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  c:{ flex:1,justifyContent:"center",padding:20 },
  t:{ fontSize:32,fontWeight:"bold",marginBottom:30,textAlign:"center" },
  i:{ borderWidth:1,borderColor:"#ccc",borderRadius:8,padding:12,marginBottom:12 },
  p:{ backgroundColor:"#007AFF",padding:14,borderRadius:8,alignItems:"center" },
  pt:{ color:"#fff",fontSize:18 },
  link:{ marginTop:18,color:"#007AFF",textAlign:"center" },
});
