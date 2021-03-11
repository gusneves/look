import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";

export default function Main({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Feather
        name="list"
        size={20}
        color="#000"
        onPress={() => {
          navigation.openDrawer();
        }}
      />
      <Text>Main.js</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Info");
        }}
      >
        <Text>info</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
  },
});
