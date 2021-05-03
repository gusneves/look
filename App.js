import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { useTranslation } from "react-i18next";
import themes from "./src/themes";
import Router from "./src/routes";
import "./src/locale/i18n";



export default function App() {
  const deviceTheme = useColorScheme();
  const theme = themes[deviceTheme] || themes.dark;
  const {i18n} = useTranslation();

  async function getLang(){
    try {
      console.log('teste');
      const value = await AsyncStorage.getItem('language')
      if(value !== null) {
        i18n.changeLanguage(value);
      }
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(()=> {
    getLang();
  }, []);

  const [loaded] = useFonts({
    Menlo: require("./assets/Menlo.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}
