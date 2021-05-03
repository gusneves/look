import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

import { Pressable, View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { StatusBar } from "expo-status-bar";
import { Wrapper, ListItem, Label } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const themeContext = useContext(ThemeContext);

  console.log("Current theme: ", themeContext);

  useEffect(() => {
    setSelectedLanguage(i18n.language);
  }, []);

  async function changeLanguage(lng) {
    i18n.changeLanguage(lng);

    try {
      await AsyncStorage.setItem("language", lng);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Wrapper>
      <ListItem>
        <Label>{t("settings.lang")}</Label>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedLanguage(itemValue);
            changeLanguage(itemValue);
          }}
          mode="dropdown"
          dropdownIconColor={themeContext.color}
          style={{ width: 210 }}
        >
          <Picker.Item
            label="English"
            color="#888"
            style={{ backgroundColor: themeContext.background }}
            value="en"
          />
          <Picker.Item
            label="Português Brasileiro"
            color="#888"
            style={{ backgroundColor: themeContext.background }}
            value="pt_br"
          />
        </Picker>
      </ListItem>

      <StatusBar style="inverted" />
    </Wrapper>
  );
}
