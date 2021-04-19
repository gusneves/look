import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";

import Look from "../../../assets/icon.png"

import { ImageView, Logo } from "./styles";

export function DrawerContent(props) {
  return (
      <DrawerContentScrollView {...props}>
        <ImageView>
          <Logo source={Look} />
        </ImageView>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
  );
}
