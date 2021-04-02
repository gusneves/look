import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons, Feather } from "@expo/vector-icons";

import Rating from "../components/Rating";
import Genres from "../components/Genres";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function Info({ navigation, route }) {
  const [included, setIncluded] = useState(false);
  const [storedMovies, setStoredMovies] = useState();
  const [icon, setIcon] = useState("plus");
  const [text, setText] = useState("Add to list");

  const {
    title,
    poster_path,
    overview,
    release_date,
    vote_average,
    id,
    genres,
    director,
  } = route.params.details;

  const posterpath = "https://image.tmdb.org/t/p/original/" + poster_path;

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (included) {
      setIcon("minus");
      setText("Remove from list");
    } else {
      setIcon("plus");
      setText("Add to list");
    }
  }, [included]);

  async function removeFromList() {
    console.log("REMOVENDO-------------");
    let array = storedMovies.filter((value) => {
      return value.id != id;
    });
    setStoredMovies(array);
    await AsyncStorage.setItem("list", JSON.stringify(array));
    setIncluded(false);
  }

  async function addToList() {
    console.log("ADICIONANDO-------------");
    try {
      console.log(title);
      console.log(storedMovies);
      let next = [];
      if (storedMovies != null) next = [...storedMovies];
      next = [
        ...next,
        {
          title,
          poster_path,
          overview,
          release_date,
          vote_average,
          id,
          genres,
          director,
        },
      ];
      setStoredMovies(next);
      console.log("DEPOIS-----------");
      console.log(next);
      await AsyncStorage.setItem("list", JSON.stringify(next));
      setIncluded(true);
    } catch (error) {
      Alert.alert("Failed to add to list", error.message);
    }
  }

  async function getList() {
    console.log("LISTANDO-------------");
    try {
      const jsonValue = await AsyncStorage.getItem("list");
      let value = JSON.parse(jsonValue);
      if (jsonValue != null) {
        value.map((value) => {
          if (value.id == id) setIncluded(true);
        });

        setStoredMovies(JSON.parse(jsonValue));
      }
    } catch (error) {
      Alert.alert("Failed to get list", error.message);
    }
  }

  return (
    <View style={styles.container}>
      {poster_path ? (
        <Image
          source={{ uri: posterpath }}
          style={[StyleSheet.absoluteFillObject]}
        />
      ) : (
        <View style={[StyleSheet.absoluteFillObject, styles.no_image]}>
          <MaterialIcons name="broken-image" size={80} color="#AAA" />
          <Text style={{ fontSize: 14, color: "#ddd" }}>
            No image avaliable
          </Text>
        </View>
      )}
      <ScrollView style={{ flex: 1 }} bounces={true}>
        <LinearGradient colors={["transparent", "#121212"]}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {release_date
                ? title + " (" + release_date.slice(0, 4) + ")"
                : title + " (----)"}
            </Text>
            <Rating rating={vote_average} />
            {genres.length > 0 ? (
              <Genres genres={genres} />
            ) : (
              <Text style={styles.no_genre}>No genres provided</Text>
            )}

            <Text style={styles.rate}>
              Directed by:{" "}
              {director === undefined ? "director not found" : director.name}
            </Text>
            <Text style={styles.overview}>
              {overview ? overview : "Overview not avaliable"}
            </Text>

            {included ? (
              <TouchableOpacity
                style={styles.addToList}
                onPress={removeFromList}
              >
                <Feather name={icon} size={22} color="tomato" />
                <Text style={styles.buttonText}>{text}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.addToList} onPress={addToList}>
                <Feather name={icon} size={22} color="tomato" />
                <Text style={styles.buttonText}>{text}</Text>
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>

        <StatusBar style="inverted" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    flex: 1,
  },
  title: {
    fontSize: 22,
    color: "#FEF9FF",
    fontWeight: "800",
    marginTop: 15,
  },
  rate: {
    fontWeight: "100",
    fontSize: 16,
    color: "#FEF9FF",
    marginBottom: 10,
  },
  overview: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#FEF9FF",
  },
  poster: {
    width: width,
    height: 0.75 * height,
    resizeMode: "stretch",
  },
  no_image: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEF9FF",
  },
  no_genre: {
    fontSize: 14,
    color: "#DDD",
    marginVertical: 10,
    padding: 3,
    fontStyle: "italic",
  },
  textContainer: {
    marginTop: height * 0.8,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  addToList: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginVertical: 10,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 5,
    color: "tomato",
  },
});
