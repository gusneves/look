import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

import Rating from "../../../components/Rating/Rating";
import Genres from "../../../components/Genres/Genres";

import {
  Wrapper,
  Title,
  TextContainer,
  Overview,
  Director,
  Button,
  ButtonText,
  NoImage,
} from "./styles";

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
    runtime,
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
          runtime,
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
    <Wrapper>
      {poster_path ? (
        <Image
          source={{ uri: posterpath }}
          style={[StyleSheet.absoluteFillObject]}
        />
      ) : (
        <NoImage>
          <MaterialIcons name="broken-image" size={80} color="#AAA" />
          <Text style={{ fontSize: 14, color: "#ddd" }}>
            No image avaliable
          </Text>
        </NoImage>
      )}
      <ScrollView style={{ flex: 1 }} bounces={true}>
        <LinearGradient colors={["transparent", "#121212"]}>
          <TextContainer>
            <Title>
              {release_date
                ? title + " (" + release_date.slice(0, 4) + ")"
                : title + " (----)"}
            </Title>
            <Rating rating={vote_average} />

            <Genres genres={genres} />

            <Director>
              Directed by:{" "}
              {director === undefined ? "director not found" : director.name}
            </Director>
            <Director>Duration: {runtime} min</Director>
            <Overview>
              {overview ? overview : "Overview not avaliable"}
            </Overview>

            {included ? (
              <Button onPress={removeFromList}>
                <Feather name={icon} size={22} color="tomato" />
                <ButtonText>{text}</ButtonText>
              </Button>
            ) : (
              <Button onPress={addToList}>
                <Feather name={icon} size={22} color="tomato" />
                <ButtonText>{text}</ButtonText>
              </Button>
            )}
          </TextContainer>
        </LinearGradient>

        <StatusBar style="inverted" />
      </ScrollView>
    </Wrapper>
  );
}
