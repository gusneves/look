import React, { useState } from "react";
import { FlatList, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import {
  ListItem,
  Loading,
  MovieText,
  Title,
  Overview,
  Poster,
  PosterContainer,
  Wrapper,
  NoImage,
} from "./styles";

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
      <Wrapper>
        <Loading> Loading... </Loading>
      </Wrapper>
    );
  }
  if (list.length == 0) {
    return (
      <Wrapper>
        <Overview>Your list is currently empty</Overview>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <FlatList
          data={list}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => {
                  const details = item;
                  navigation.navigate("Info", { details });
                }}
              >
                <ListItem>
                  <PosterContainer>
                    {item.poster_path ? (
                      <Poster source={{ uri: posterpath + item.poster_path }} />
                    ) : (
                      <NoImage>
                        <MaterialIcons name="broken-image" size={45} color="#DDD" />
                      </NoImage>
                    )}
                  </PosterContainer>
                  <MovieText>
                    <Title>
                      {item.release_date
                        ? item.title +
                          " (" +
                          item.release_date.slice(0, 4) +
                          ")"
                        : item.title + " (----)"}
                    </Title>
                    <Overview numberOfLines={5}>
                      {item.overview ? item.overview : "Overview not avaliable"}
                    </Overview>
                  </MovieText>
                </ListItem>
              </Pressable>
            );
          }}
        />

        <StatusBar style="inverted" />
      </Wrapper>
    );
  }
}
