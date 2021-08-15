import React, { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import axios from "axios";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { PokemonBaseI } from "../types";
import { getUnique } from "../utils";
import PokemonTile from "../components/PokemonTile";
import { debounce } from "debounce";

export default function Pokemon() {
  const [limit, setLimit] = useState(50);
  const [searchText, setSearchText] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonBaseI[]>([]);

  const allPokemons = useQuery("getAllPokemons", async () => {
    const { data } = await axios.get<PokemonBaseI[]>(
      "https://www.pokemon.com/us/api/pokedex/kalos"
    );
    const uniquifiedData: PokemonBaseI[] = getUnique(data, "id");
    return uniquifiedData;
  });

  const searchForPokemons = useCallback(
    debounce((searchStr: string) => {
      console.log("searching..");
      if (searchStr.length > 3 && allPokemons.data) {
        const filtered = allPokemons.data.filter((i) =>
          i.name.toLowerCase().includes(searchStr)
        );
        console.log(filtered);
        setFilteredPokemons(filtered);
      } else {
        setFilteredPokemons([]);
      }
    }, 500),
    []
  );

  const searchPokemons = useCallback((value: string) => {
    console.log(value);
    setSearchText(value);
    searchForPokemons(value);
  }, []);

  return (
    <SafeAreaView style={styles.centeredContainer}>
      <StatusBar style="auto"></StatusBar>
      <View>
        <TextInput
          value={searchText}
          onChangeText={searchPokemons}
          placeholder="Search Pokemons"
          style={styles.searchInput}
        />
      </View>
      <View style={styles.listContainer}>
        {allPokemons.isLoading ? (
          <View style={styles.centeredContainer}>
            <ActivityIndicator size="large"></ActivityIndicator>
          </View>
        ) : (
          <>
            <FlatList
              numColumns={2}
              style={styles.list}
              data={
                filteredPokemons.length && searchText.length > 3
                  ? filteredPokemons.slice(0, limit)
                  : allPokemons.data?.slice(0, limit)
              }
              renderItem={(i) => <PokemonTile pokemonData={i.item} />}
              keyExtractor={(data) => data.number}
              onEndReached={() => setLimit((l) => l + 20)}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ddd",
  },
  listContainer: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    width: "100%",
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
  },
  searchInput: {
    width: 300,
    height: 35,
    padding: 8,
    marginTop: 80,
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.801)",
    borderRadius: 12,
  },
});
