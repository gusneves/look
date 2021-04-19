import React from "react";
import { Pressable, useColorScheme } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";

import { DrawerContent } from "./components/DrawerContent/DrawerContent";

import MovieSearch from "./screens/Movie/Search/MovieSearch";
import Info from "./screens/Movie/Info/Info";
import List from "./screens/List/List";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function InfoStack({ navigation }) {
  const scheme = useColorScheme();
  const iconColor = scheme === "dark" ? "#FFF" : "#121212";
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={MovieSearch}
        options={{
          headerShown: true,
          headerTitleAlign: "center",

          headerLeft: () => {
            return (
              <Pressable
                style={{
                  flex: 1,
                  padding: 15,
                  paddingLeft: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                android_ripple={{
                  color: "#DDD",
                  borderless: false,
                  radius: 25,
                }}
                onPress={() => {
                  navigation.openDrawer();
                }}
              >
                <Entypo
                  name="dots-three-vertical"
                  size={24}
                  color={iconColor}
                />
              </Pressable>
            );
          },
        }}
      />
      <Stack.Screen
        name="Info"
        component={Info}
        options={{
          headerTitleAlign: "center",
          title: "About",
        }}
      />
    </Stack.Navigator>
  );
}

function ListStack({ navigation }) {
  const scheme = useColorScheme();
  const iconColor = scheme === "dark" ? "#FFF" : "#121212";

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My List"
        component={List}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          drawerIcon: ({ color }) => {
            return <AntDesign name="tag" size={24} color={color} />;
          },
          headerLeft: () => {
            return (
              <Pressable
                style={{
                  flex: 1,
                  padding: 15,
                  paddingLeft: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                android_ripple={{
                  color: "#DDD",
                  borderless: false,
                  radius: 25,
                }}
                onPress={() => {
                  navigation.openDrawer();
                }}
              >
                <Entypo
                  name="dots-three-vertical"
                  size={24}
                  color={iconColor}
                />
              </Pressable>
            );
          },
        }}
      />
      <Stack.Screen
        name="Info"
        component={Info}
        options={{
          headerTitleAlign: "center",
          title: "About",
        }}
      />
    </Stack.Navigator>
  );
}

export default function Router() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator
        initialRouteName="Search"
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Search"
          component={InfoStack}
          options={{
            drawerIcon: ({ color }) => {
              return <MaterialIcons name="search" size={24} color={color} />;
            },
          }}
        />
        <Drawer.Screen
          name="My List"
          component={ListStack}
          options={{
            drawerIcon: ({ color }) => {
              return <AntDesign name="tag" size={24} color={color} />;
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
