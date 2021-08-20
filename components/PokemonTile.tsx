import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
} from "react-native";
import { RootStackParamList } from "../App";
import { PokemonBaseI } from "../types";

type NavigatorProp = NativeStackNavigationProp<RootStackParamList, "Home">;
interface props {
  pokemonData: PokemonBaseI;
  onPressFn: () => void;
}

const PokemonTile: React.FC<props> = ({ pokemonData, onPressFn }) => {
  return (
    <TouchableOpacity onPress={onPressFn}>
      <View style={styles.container}>
        <Image
          style={styles.thumbnail}
          source={{ uri: pokemonData.ThumbnailImage }}
        />
        <Text style={styles.name}>{pokemonData.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    width: 110,
    height: 110,
  },
  container: {
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  name: {
    fontWeight: "bold",
    margin: 4,
  },
});

export default PokemonTile;
