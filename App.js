import React from "react";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components";
import { useFonts } from "expo-font";
import themes from "./src/themes";
import Router from "./src/routes";

export default function App() {
  const deviceTheme = useColorScheme();
  const theme = themes[deviceTheme] || themes.dark;

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
