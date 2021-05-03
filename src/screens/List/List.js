import React, { useState, useEffect } from "react";
import { FlatList, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
        <Loading>{t("list.load")}</Loading>
      </Wrapper>
    );
  }
  if (list.length == 0) {
    return (
      <Wrapper>
        <Overview>{t("list.overview")}</Overview>
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
                        <MaterialIcons
                          name="broken-image"
                          size={45}
                          color="#DDD"
                        />
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
                      {item.overview ? item.overview : t("list.not_avaliable")}
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
