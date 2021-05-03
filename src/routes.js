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

import { useTranslation } from "react-i18next";

import MovieSearch from "./screens/Movie/Search/MovieSearch";
import Info from "./screens/Movie/Info/Info";
import List from "./screens/List/List";
import Settings from "./screens/Settings/Settings";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function InfoStack({ navigation }) {
  const { t, i18n } = useTranslation();
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
          title: t("routes.movie_search"),
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
          title: t("routes.info"),
        }}
      />
    </Stack.Navigator>
  );
}

function ListStack({ navigation }) {
  const { t, i18n } = useTranslation();
  const scheme = useColorScheme();
  const iconColor = scheme === "dark" ? "#FFF" : "#121212";

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My List"
        component={List}
        options={{
          title: t("routes.list"),
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
          title: t("routes.info"),
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack({ navigation }) {
  const { t, i18n } = useTranslation();
  const scheme = useColorScheme();
  const iconColor = scheme === "dark" ? "#FFF" : "#121212";
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: t("routes.config"),
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
    </Stack.Navigator>
  );
}

export default function Router() {
  const { t, i18n } = useTranslation();
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
            title: t("routes.movie_search"),
            drawerIcon: ({ color, size }) => {
              return <MaterialIcons name="search" size={size} color={color} />;
            },
          }}
        />
        <Drawer.Screen
          name="My List"
          component={ListStack}
          options={{
            title: t("routes.list"),
            drawerIcon: ({ color, size }) => {
              return <AntDesign name="tag" size={size} color={color} />;
            },
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsStack}
          options={{
            title: t("routes.config"),
            drawerIcon: ({ color, size }) => {
              return (
                <MaterialIcons name="settings" size={size} color={color} />
              );
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
