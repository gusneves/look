import styled, { css } from "styled-components/native";
import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

const bg = (props) => props.theme.background;
const fg = (props) => props.theme.color;

const shadow = Platform.select({
  ios: css`
    shadow-color: #000;
    shadow-offset: { width: 0px, height: 2px };
    shadow-opacity: 0.8;
    shadow-radius: 2px;
  `,
  android: css`
    elevation: 8;
  `,
});

export const Wrapper = styled.View`
  align-items: center;
  flex: 1;
  background-color: ${bg};
`;

export const Form = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 25px 0px;
  margin-bottom: ${0.05 * height}px;
`;

export const Button = styled.Pressable`
  height: 55px;
  width: 55px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  ${shadow};
`;

export const Input = styled.TextInput`
  height: 55px;
  width: 285px;
  background-color: #fff;
  color: black;
  padding: 10px;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 20px;
  ${shadow};
`;

export const ListItem = styled.View`
  background-color: #fff;
  margin: 0px 10px;
  height: ${height * 0.7}px;
  border-radius: 24px;
  ${shadow}
`;

export const Poster = styled.Image`
  flex: 1;
  border-radius: 23px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: 800;
  color: #fef9ff;
  font-family: Menlo;
`;

export const Feedback = styled.Text`
  text-align: center;
  font-size: 18px;
  color: ${fg};
`;
