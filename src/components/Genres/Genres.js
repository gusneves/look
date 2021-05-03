import React from "react";
import { Genre, GenreText, NoGenre, Wrapper } from "./styles";
import { useTranslation } from "react-i18next";

export default function Genres({ genres }) {
  const { t } = useTranslation();
  return (
    <Wrapper>
      {genres.length == 0 ? (
        <NoGenre>{t("info.no_genres")}</NoGenre>
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
