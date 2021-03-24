import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

import { getDetails, getCredits } from "../services/api";

export default function List() {
  const [list, setList] = useState([]);
  const [result, setResult] = useState([]);

  async function getList() {
    try {
      const response = await AsyncStorage.getItem("list");
      if (response != null) {
        const stored = response.split(",").map((value) => {
          return value;
        });
        console.log(stored);
        setList(stored);
      }
    } catch (error) {
      Alert.alert("Failed to load list", error.message);
    }
  }

  async function getResults() {
    list.map((value) => {
      let details;
      getDetails(value)
        .then(async ({ data }) => {
          details = data;

          getCredits(value)
            .then(({ data }) => {
              details = {
                ...details,
                director: data.crew.find((person) => person.job == "Director"),
              };
              setResult((result) => [...result, details]);
            })
            .catch((e) => {
              Alert.alert("Error", e.message);
            });
        })
        .catch((e) => {
          Alert.alert("Error", e.message);
        });
    });
  }

  useEffect(() => {
    getList();
    getResults();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My List</Text>

      <FlatList
        data={result}
        keyExtractor={() => {
          list.map((value) => {
            return value;
          });
        }}
        renderItem={({ item }) => {
          return <Text style={styles.text} >{item.name}</Text>;
        }}
      />

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
  title: {
    fontSize: 24,
    backgroundColor: "#FEF9FF",
    fontFamily: "Menlo",
  },
  text: {
    fontSize: 14,
    color: "#FFF",
  },
});
