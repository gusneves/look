import * as React from "react";
import { Genre, GenreText, NoGenre, Wrapper } from "./styles";

export default function Genres({ genres }) {
  return (
    <Wrapper>
      {genres.length == 0 ? (
        <NoGenre>No genres provided</NoGenre>
      ) : (
        genres.map((genre, i) => {
          return (
            <Genre key={genre.id}>
              <GenreText>{genre.name}</GenreText>
            </Genre>
          );
        })
      )}
    </Wrapper>
  );
}