import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import poster_placeholder from "../../assets/poster_placeholder.png";
import axios from "axios";

export default function Main({ navigation }) {
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState("");
  const posterpath = "https://image.tmdb.org/t/p/original/";

  async function executeQuery(search) {
    await axios
      .get(
        "https://api.themoviedb.org/3/search/movie?api_key=eb2f3bd9659b7a07bbb515ec2adf6930&query=" +
          search
      )
      .then(({ data }) => {
        setResult(data.results);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.topText}>Search for a film</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Insira sua pesquisa aqui..."
          onChangeText={(text) => setQuery(text)}
          defaultValue={query}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => {
            console.log(query);
            executeQuery(query);
          }}
          style={styles.button}
        >
          <MaterialIcons name="search" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={result}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
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
                    ? item.title + " (" + item.release_date.slice(0, 4) + ")"
                    : item.title + " (----)"}
                </Text>
                <Text style={styles.overview} numberOfLines={5}>
                  {item.overview ? item.overview : "Overview not avaliable"}
                </Text>
              </View>
            </View>
          );
        }}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    fontSize: 18,
    backgroundColor: "#1A1D1A",
  },
  form: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
    marginHorizontal: 15,
  },
  topText: {
    color: "#FEF9FF",
    fontWeight: "bold",
    fontSize: 22,
    marginTop: 80,
  },
  input: {
    height: 55,
    width: 260,
    backgroundColor: "#FEF9FF",
    color: "#14161B",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    fontSize: 20,
  },
  button: {
    height: 55,
    width: 55,
    backgroundColor: "#FEF9FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  listItem: {
    flexDirection: "row",
    margin: 20,
    backgroundColor: "#14161B",
    paddingRight: 12,
    width: 325,
    borderRadius: 5,
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
  },
  movieText: {
    flex: 1,
    marginLeft: 12,
    paddingVertical: 15,
  },
});
// Bone ECE2D0width: 93.8,
//   height: 205
