import styled from "styled-components/native";

const bg = (props) => props.theme.background;
const fg = (props) => props.theme.color;

export const Wrapper = styled.View`
  align-items: center;
  flex: 1;
  background-color: ${bg};
`;

export const ListItem = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
  border-bottom-color: #ddd;
  border-bottom-width: 0.5px;
`;

export const Label = styled.Text`
  color: ${fg};
  flex: 3;
  font-size: 16px;
  font-weight: bold;
`;
