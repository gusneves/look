import React from "react";
import {
  NavigationContainer,
  DarkTheme,
} from "@react-navigation/native";
import {
  createStackNavigator,
} from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";

import Main from "./screens/Main";
import Info from "./screens/Info";
import List from "./screens/List";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function InfoStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Main}
        options={{
          headerShown: true,
          headerTitleAlign: "center",

          headerLeft: () => {
            return (
              <Feather
                name="list"
                size={24}
                color="#FEF9FF"
                onPress={() => {
                  navigation.openDrawer();
                }}
                style={{
                  marginLeft: 15,
                }}
              />
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
              <Feather
                name="list"
                size={24}
                color="#FEF9FF"
                onPress={() => {
                  navigation.openDrawer();
                }}
                style={{
                  marginLeft: 15,
                }}
              />
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

export default function Router({ navigation }) {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Drawer.Navigator initialRouteName="Search">
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
