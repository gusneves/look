import styled, { css } from "styled-components/native";
import { Platform } from "react-native";

const bg = props => props.theme.background;
const fg = props => props.theme.color;
const itemBg = props => props.theme.listItemBg;
const overviewText = props => props.theme.overviewText;

export const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${bg};
`;

export const Loading = styled.Text`
  font-size: 14px;
  color: ${fg};
`;

export const ListItem = styled.View`
  flex-direction: row;
  margin: 20px;
  background-color: ${itemBg};
  padding-right: 12px;
  width: 325px;
  border-radius: 10px;
  ${Platform.select({
    ios: css`
      shadow-color: #000;
      shadow-offset: { width: 0px, height: 2px };
      shadow-opacity: 0.8;
      shadow-radius: 2px;
    `,
    android: css`
      elevation: 8;
    `,
  })}
`;

export const PosterContainer = styled.View`
  background-color: white;
  width: 30%;
  height: 100%;
`;

export const Poster = styled.Image`
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const NoImage = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${fg};
  margin-bottom: 10px;
`;

export const Overview = styled.Text`
  font-size: 16px;
  color: ${overviewText};
  text-align: left;
  line-height: 24px;
`;

export const MovieText = styled.View`
  flex: 1;
  margin-left: 12px;
  padding: 15px 0px 15px 0px;
`;
