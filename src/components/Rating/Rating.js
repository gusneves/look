import * as React from "react";
import { AntDesign } from "@expo/vector-icons";
import {RatingView, RatingNumber} from "./styles";

export default function Rating({ rating }) {
  const filledStars = Math.floor(rating / 2);
  const maxStars = Array(5 - filledStars).fill("staro");
  const r = [...Array(filledStars).fill("star"), ...maxStars];

  return (
    <RatingView>
      <RatingNumber>{rating}</RatingNumber>
      {r.map((type, index) => {
        return (
          <AntDesign
            key={index}
            name={type}
            size={14}
            color="tomato"
            style={{ paddingTop: 1.5 }}
          />
        );
      })}
    </RatingView>
  );
}