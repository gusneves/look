import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";

import Rating from "../components/Rating";
import Genres from "../components/Genres";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Info({ navigation, route }) {
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

  console.log(id);
  const posterpath = "https://image.tmdb.org/t/p/original/" + poster_path;

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
          
          <Text style={styles.rate}>Directed by: {director.name}</Text>
          <Text style={styles.overview}>
            {overview ? overview : "Overview not avaliable"}
          </Text>
          {genres.length > 0 ? (
            <Genres genres={genres} />
          ) : (
            <Text style={styles.no_genre}>No genres provided</Text>
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
    fontStyle: "italic",
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
  no_genre:{
    alignSelf: "center",
    fontSize: 12,
    color: "#DDD",
    marginTop: 10,
    padding: 3,
  },
  textContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
});
