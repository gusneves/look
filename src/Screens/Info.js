import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";

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
          <Text style={styles.rate}>{vote_average}/10</Text>
          <Text style={styles.rate}>
            {genres.map((value, index) => {
              if (index != genres.length - 1) return value.name + ", ";
              else return value.name;
            })}
          </Text>
          <Text style={styles.rate}>Directed by: {director.name}</Text>
          <Text style={styles.overview}>
            {overview ? overview : "Overview not avaliable"}
          </Text>
        </View>

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
    marginVertical: 15,
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
  textContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
});
