import React from "react";
import {
  NavigationContainer,
  navigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { AntDesign, Feather } from "@expo/vector-icons";

import Main from "./Screens/Main";
import Info from "./Screens/Info";
import Fav from "./Screens/Fav";

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
          headerLeft: () =>{
              return <Feather name="list" size={20} color="#000" onPress={() => { navigation.openDrawer()}}/>
          }
        }}
      />
      <Stack.Screen
        name="Info"
        component={Info}
        options={{
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}

export default function Router() {
  return (
    <NavigationContainer>
      <Drawer.Navigator backBehavior="history" initialRouteName="Search">
        <Drawer.Screen
          name="Search"
          component={InfoStack}
          options={{
            drawerIcon: ({ color }) => {
              return <Feather name="search" size={20} color={color} />;
            },
          }}
        />
        <Drawer.Screen
          name="Favourites"
          component={Fav}
          options={{
            drawerIcon: ({ color }) => {
              return <AntDesign name="staro" size={20} color={color} />;
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
