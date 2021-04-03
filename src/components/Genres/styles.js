import styled from 'styled-components/native';

const genreTint = props => props.theme.genre;

export const Wrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px 0px 10px 0px ;
`;

export const Genre = styled.View`
  padding: 2px 6px 2px 6px;
  border: 1px solid #555;
  border-radius: 5px;
  margin-right: 4px;
  margin-bottom: 4px;
`;

export const GenreText = styled.Text`
  font-size: 12px;
  color: #DDD;
`;

export const NoGenre = styled.Text`
  font-size: 14px;
  color: #DDD;
  margin: 5px 0px 5px 0px;
  font-style: italic;
`;