import React, { useState } from "react";
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
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.78 : width * 0.8;

export default function Main({ navigation }) {
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState("");
  const [empty, setEmpty] = useState(false);
  const [star, setStar] = useState("star-outline");

  const posterpath = "https://image.tmdb.org/t/p/original/";

  async function executeQuery(search) {
    await axios
      .get(
        "https://api.themoviedb.org/3/search/movie?api_key=eb2f3bd9659b7a07bbb515ec2adf6930&query=" +
          search
      )
      .then(({ data }) => {
        if (data.total_results == 0) setEmpty(true);
        else {
          setEmpty(false);
          setResult(data.results);
        }
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
      <LinearGradient style={styles.form} colors={["#121212", "transparent"]}>
        <TextInput
          placeholder="Search for a movie..."
          onChangeText={(text) => setQuery(text)}
          defaultValue={query}
          style={styles.input}
          autoCorrect={false}
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
      </LinearGradient>
      {empty ? (
        <Text style={{fontSize: 18, color:"#EDEDED"}} >Nothing was found, try again</Text>
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
                <View
                  style={{
                    width: ITEM_SIZE,
                  }}
                >
                  <View style={styles.listItem}>
                    {item.poster_path ? (
                      <Image
                        source={{ uri: posterpath + item.poster_path }}
                        style={styles.image}
                      />
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
                          {" "}
                          No image avaliable{" "}
                        </Text>
                      </View>
                    )}
                    <LinearGradient
                      colors={["#121212", "transparent"]}
                      style={styles.textGradient}
                    >
                      <Text style={styles.title}>
                        {item.release_date
                          ? item.title +
                            " (" +
                            item.release_date.slice(0, 4) +
                            ")"
                          : item.title + " (----)"}
                      </Text>
                    </LinearGradient>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}

      <StatusBar style="inverted" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginTop: 0.1 * height,
    marginBottom: 0.1 * height,
  },
  input: {
    height: 55,
    width: 285,
    backgroundColor: "#FEF9FF",
    color: "black",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    fontSize: 20
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
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    height: 0.65 * height,
    borderRadius: 24,
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
  image: {
    flex: 1,
    borderRadius: 23,
    resizeMode: "cover",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FEF9FF",
    fontFamily: 'Menlo'
  },
  textGradient: {
    position: "absolute",
    width: "100%",
    padding: 10,
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
  },
});
