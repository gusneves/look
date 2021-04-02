import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Platform
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

import { TouchableOpacity } from "react-native-gesture-handler";

export default function List({ navigation }) {
  const [list, setList] = useState();

  const posterpath = "https://image.tmdb.org/t/p/original/";

  async function getList() {
    try {
      const jsonValue = await AsyncStorage.getItem("list");
      setList(JSON.parse(jsonValue));
    } catch (error) {
      Alert.alert("Failed to get list", error.message);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getList();
    });
    return unsubscribe;
  }, [navigation]);

  while (list == undefined) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}> Loading... </Text>
      </SafeAreaView>
    );
  }
  if (list.length == 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.overview}>Your list is currently empty</Text>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  const details = item;
                  navigation.navigate("Info", { details });
                }}
              >
                <View style={styles.listItem}>
                  <View style={styles.imageContainer}>
                    {item.poster_path ? (
                      <Image
                        source={{ uri: posterpath + item.poster_path }}
                        style={styles.image}
                      />
                    ) : (
                      <View style={styles.no_image}>
                        <MaterialIcons name="image" size={45} color="#DDD" />
                      </View>
                    )}
                  </View>
                  <View style={styles.movieText}>
                    <Text style={styles.title}>
                      {item.release_date
                        ? item.title +
                          " (" +
                          item.release_date.slice(0, 4) +
                          ")"
                        : item.title + " (----)"}
                    </Text>
                    <Text style={styles.overview} numberOfLines={5}>
                      {item.overview ? item.overview : "Overview not avaliable"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <StatusBar style="inverted" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    backgroundColor: "#121212"
  },
  header: {
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    color: "#FEF9FF",
  },
  text: {
    fontSize: 14,
    color: "#FFF",
  },
  listItem: {
    flexDirection: "row",
    margin: 20,
    backgroundColor: "#232323",
    paddingRight: 12,
    width: 325,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  imageContainer: {
    backgroundColor: "white",
    width: "30%",
    height: "100%",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  no_image: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FEF9FF",
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    color: "#DDD",
    textAlign: "justify",
    lineHeight: 24
  },
  movieText: {
    flex: 1,
    marginLeft: 12,
    paddingVertical: 15,
  },
});
