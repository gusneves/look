import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Genres({ genres }) {
  return (
    <View style={styles.genres}>
      {genres.map((genre, i) => {
        return (
          <View key={genre.id} style={styles.genre}>
            <Text style={styles.genreText}>{genre.name}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 15
  },
  genre: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#555',
    marginRight: 4,
    marginBottom: 4,
},
genreText: {
    fontSize: 12,
    color: "#DDD",
  }
});
