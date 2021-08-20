import React, { useState } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import styles from "../styles/SharedStyles";
import { PokemonBaseI } from "../types";
import PokemonTile from "./PokemonTile";

interface props {
  data: PokemonBaseI[];
  initLimit: number;
  onPressFn: (i: ListRenderItemInfo<PokemonBaseI>) => void;
}

const PokemonsList: React.FC<props> = ({ data, initLimit, onPressFn }) => {
  const [limit, setLimit] = useState(initLimit);

  return (
    <FlatList
      numColumns={2}
      style={styles.list}
      data={data.slice(0, limit)}
      renderItem={(i) => (
        <PokemonTile onPressFn={() => onPressFn(i)} pokemonData={i.item} />
      )}
      keyExtractor={(data, idx) => data.number + idx}
      onEndReached={() => setLimit((l) => l + 20)}
    />
  );
};

export default PokemonsList;
