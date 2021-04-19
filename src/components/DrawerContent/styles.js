import styled from "styled-components/native";
import { Dimensions } from "react-native";
const { height } = Dimensions.get("window");

export const ImageView = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.Image`
  width: ${height * 0.2}px;
  height: ${height * 0.2}px;
`;
