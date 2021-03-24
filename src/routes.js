import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { AntDesign, MaterialIcons } from "@expo/vector-icons";

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
          headerShown: false,
          headerLeft: () => {
            return (
              <Feather
                name="list"
                size={20}
                color="#000"
                onPress={() => {
                  navigation.openDrawer();
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

export default function Router() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Drawer.Navigator backBehavior="history" initialRouteName="Search">
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
          component={List}
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
