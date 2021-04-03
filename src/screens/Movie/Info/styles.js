import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const Wrapper = styled.View`
  background-color: #121212;
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 22px;
  color: #fef9ff;
  font-weight: 800;
  margin-top: 15px;
`;

export const Director = styled.Text`
  font-weight: 100;
  font-size: 14px;
  color: #fef9ff;
  margin-bottom: 10px;
`;

export const TextContainer = styled.View`
  margin-top: ${height * 0.8}px;
  padding: 0px 15px 15px 15px;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-self: flex-end;
  margin: 10px 10px 10px 0px;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  margin-left: 5px;
  color: tomato;
`;

export const Overview = styled.Text`
  font-size: 18px;
  font-style: italic;
  color: #fef9ff;
`;

export const NoImage = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: ${width}px;
  height: ${height}px;
  justify-content: center;
  align-items: center;
  background-color: #fef9ff;
`;
