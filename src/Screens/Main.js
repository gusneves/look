import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Keyboard,
  Platform,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

export default function Main({ navigation }) {
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState("");
  const [star, setStar] = useState("star-outline");

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

  async function getDetails(id) {
    return await axios.get(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "?api_key=eb2f3bd9659b7a07bbb515ec2adf6930"
    );
  }
  async function getCredits(id) {
    return await axios.get(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "/credits?api_key=eb2f3bd9659b7a07bbb515ec2adf6930"
    );
  }

  function handleSubmit() {
    Keyboard.dismiss();
    executeQuery(query);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder="Search for a movie..."
          onChangeText={(text) => setQuery(text)}
          defaultValue={query}
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="words"
          onSubmitEditing={handleSubmit}
        />
        {Platform.OS == "android" ? (
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#2352ff", false)}
            onPress={handleSubmit}
          >
            <View style={styles.button}>
              <MaterialIcons name="search" size={30} color="#121212" />
            </View>
          </TouchableNativeFeedback>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <MaterialIcons name="search" size={30} color="#121212" />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        alwaysBounceVertical={true}
        data={result}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        bounces={true}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={async () => {
                let details = [];
                details.fin;
                await getDetails(item.id)
                  .then(async ({ data }) => {
                    details = data;

                    await getCredits(item.id)
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
                        Alert("Error");
                      });
                  })
                  .catch((e) => {
                    Alert("Error");
                  });
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
                      <MaterialIcons
                        name="broken-image"
                        size={45}
                        color="#FEF9FF"
                      />
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
                  <MaterialIcons
                    name={star}
                    style={{ alignSelf: "flex-end", marginTop: 5 }}
                    size={25}
                    color="#FEF9FF"
                    onPress={() => {
                      star == "star-outline"
                        ? setStar("star")
                        : setStar("star-outline");
                    }}
                  />
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

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    fontSize: 18,
    backgroundColor: "#121212",
  },
  form: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
    marginBottom: 15,
    marginTop: 80,
  },
  topText: {
    color: "#FEF9FF",
    fontWeight: "bold",
    fontSize: 22,
    marginTop: 80,
  },
  input: {
    height: 55,
    width: 285,
    backgroundColor: "#FEF9FF",
    color: "black",
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
    backgroundColor: "#232323",
    paddingRight: 12,
    width: 350,
    borderRadius: 5,
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
    backgroundColor: "#ECE2D0",
    width: "35%",
    height: "100%",
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
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
    textAlign: "left",
  },
  movieText: {
    flex: 1,
    marginLeft: 12,
    paddingTop: 15,
    paddingBottom: 12,
  },
});
// Bone ECE2D0width: 93.8,
//   height: 205
