import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Keyboard,
  Platform,
  Alert,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

import { queryMovie, getDetails, getCredits } from "../../../services/api";
import {
  Button,
  Feedback,
  Form,
  Input,
  ListItem,
  Poster,
  TextGradient,
  Title,
  Wrapper,
} from "./styles";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const { width, height } = Dimensions.get("window");
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.78 : width * 0.8;

export default function MovieSearch({ navigation }) {
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState("");
  const [empty, setEmpty] = useState(false);

  const posterpath = "https://image.tmdb.org/t/p/original/";

  function handleSubmit() {
    Keyboard.dismiss();
    queryMovie(query)
      .then(({ data }) => {
        if (data.total_results == 0) setEmpty(true);
        else {
          setEmpty(false);
          setResult(data.results);
        }
      })
      .catch((e) => {
        Alert.alert("Error", e.message);
      });
  }

  return (
    <Wrapper>
      <Form>
        <Input
          placeholder="Search for a movie..."
          onChangeText={(text) => setQuery(text)}
          defaultValue={query}
          autoCorrect={false}
          onSubmitEditing={handleSubmit}
        />
        <Button
          android_ripple={{
            color: "#DDD",
            borderless: false,
            radius: 25,
          }}
          onPress={handleSubmit}
        >
          <MaterialIcons name="search" size={30} color="#121212" />
        </Button>
      </Form>
      {empty ? (
        <Feedback>Nothing was found, try again</Feedback>
      ) : (
        <FlatList
          data={result}
          keyExtractor={(item) => item.id.toString()}
          snapToInterval={ITEM_SIZE}
          decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={true}
          horizontal={true}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => {
                  let details;
                  getDetails(item.id)
                    .then(async ({ data }) => {
                      details = data;

                      getCredits(item.id)
                        .then(({ data }) => {
                          details = {
                            ...details,
                            director: data.crew.find(
                              (value) => value.job == "Director"
                            ),
                          };
                          navigation.navigate("Info", { details });
                        })
                        .catch((e) => {
                          Alert.alert("Error", e.message);
                        });
                    })
                    .catch((e) => {
                      Alert.alert("Error", e.message);
                    });
                }}
              >
                <View
                  style={{
                    width: ITEM_SIZE,
                  }}
                >
                  <ListItem>
                    {item.poster_path ? (
                      <Poster source={{ uri: posterpath + item.poster_path }} />
                    ) : (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <MaterialIcons
                          name="broken-image"
                          size={75}
                          color="#aaa"
                        />
                        <Text style={{ fontSize: 14, color: "#ddd" }}>
                          No image avaliable
                        </Text>
                      </View>
                    )}
                    <LinearGradient
                      colors={["#121212", "transparent"]}
                      style={styles.textGradient}
                    >
                      <Title>
                        {item.release_date
                          ? item.title +
                            " (" +
                            item.release_date.slice(0, 4) +
                            ")"
                          : item.title + " (----)"}
                      </Title>
                    </LinearGradient>
                  </ListItem>
                </View>
              </Pressable>
            );
          }}
        />
      )}

      <StatusBar style="inverted" />
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  textGradient: {
    position: "absolute",
    width: "100%",
    padding: 10,
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
  },
});
