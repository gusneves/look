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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Info({ navigation, route }) {
  const [included, setIncluded] = useState(false);
  const [storedIds, setStoredIds] = useState([]);
  const [icon, setIcon] = useState("plus");
  const [text, setText] = useState("Add to the list");

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
      setText("Remove from the list");
    } else {
      setIcon("plus");
      setText("Add to the list");
    }
  }, [included]);

  async function removeFromList() {
    let array = storedIds.filter((value) => {
      return value != id;
    });
    setStoredIds(array);
    await AsyncStorage.setItem("list", array.join(","));
    setIncluded(false);
  }

  async function addToList() {
    try {
      let value = [...storedIds, id];
      console.log(value.join(","));
      await AsyncStorage.setItem("list", value.join(","));
      setIncluded(true);
    } catch (error) {
      Alert.alert("Failed to add to list", "Please try again");
    }
  }

  async function getList() {
    try {
      const jsonValue = await AsyncStorage.getItem("list");
      console.log(jsonValue);
      if (jsonValue != null) {
        const stored = jsonValue.split(",").map((value) => {
          if (value === id.toString()) setIncluded(true);
          return value;
        });

        setStoredIds(stored);
        console.log(storedIds);
      }
    } catch (error) {
      Alert.alert("Failed to add to list", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {poster_path ? (
          <Image source={{ uri: posterpath }} style={styles.poster} />
        ) : (
          <View style={styles.no_image}>
            <MaterialIcons name="broken-image" size={80} color="#FEF9FF" />
          </View>
        )}
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
            Directed by: {director===undefined ? "director not found" : director.name}
          </Text>
          <Text style={styles.overview}>
            {overview ? overview : "Overview not avaliable"}
          </Text>

          {included ? (
            <TouchableOpacity style={styles.addToList} onPress={removeFromList}>
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

        <StatusBar style="inverted" hidden={true} />
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
    width: windowWidth,
    height: 0.75 * windowHeight,
    resizeMode: "stretch",
  },
  no_image: {
    width: windowWidth,
    height: 0.75 * windowHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECE2D0",
    elevation: 10,
  },
  no_genre: {
    fontSize: 14,
    color: "#DDD",
    marginVertical: 10,
    padding: 3,
    fontStyle: "italic"
  },
  textContainer: {
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
