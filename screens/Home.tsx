import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import axios from "axios";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { compareTupleI, PokemonBaseI } from "../types";
import { getUnique } from "../utils";
import { HeartIcon } from "../assets/icons";
import styles from "../styles/HomeStyles";
import BigLoader from "../components/BigLoader";
import sharedStyles from "../styles/SharedStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import PokemonsList from "../components/PokemonsList";
import usePokemonSearch from "../hooks/usePokemonSearch";
import {
  COMPARE_TUPLE_KEY,
  LIKED_COLOR,
  MAX_COMPARE_TUPLES,
} from "../constants";
import useStoreData from "../hooks/useStoreData";
import PokemonTile from "../components/PokemonTile";

type NavigationT = NativeStackNavigationProp<RootStackParamList, "Home">;

interface props {}

const Home: React.FC<props> = ({}) => {
  const navigation = useNavigation<NavigationT>();

  const allPokemons = useQuery("getAllPokemons", async () => {
    const { data } = await axios.get<PokemonBaseI[]>(
      "https://www.pokemon.com/us/api/pokedex/kalos"
    );
    const uniquifiedData: PokemonBaseI[] = getUnique(data, "id");
    return uniquifiedData;
  });

  const { filteredPokemons, limit, searchPokemons, searchText } =
    usePokemonSearch({
      basePokemonsArr: allPokemons.data,
      initLimit: 50,
    });

  const [compareTuple, setCompareTuple] =
    useStoreData<compareTupleI>(COMPARE_TUPLE_KEY);

  console.log({ compareTuple });

  return (
    <SafeAreaView
      style={[
        sharedStyles.centeredContainer,
        sharedStyles.parentView,
        sharedStyles.fullHeightContainer,
      ]}
    >
      <StatusBar style="auto"></StatusBar>

      {allPokemons.isLoading ? (
        <BigLoader />
      ) : (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 20,
            }}
          >
            {!compareTuple ||
            compareTuple.compareTuple.length < MAX_COMPARE_TUPLES ? (
              <Text>Select any two Pokemons to compare</Text>
            ) : (
              compareTuple.compareTuple.map((pokemon, idx, arr) => (
                <View
                  style={{ marginRight: idx === 0 && arr.length >= 2 ? 15 : 0 }}
                >
                  <PokemonTile
                    pokemonData={pokemon}
                    key={idx}
                    onPressFn={() => {
                      navigation.navigate("PokemonDetails", {
                        imageUrl: pokemon.ThumbnailImage,
                        slug: pokemon.slug,
                        pokemonBaseData: pokemon,
                      });
                    }}
                  />
                </View>
              ))
            )}
          </View>
          <View style={sharedStyles.topSearchView}>
            <TextInput
              value={searchText}
              onChangeText={searchPokemons}
              placeholder="Search Pokemons"
              style={sharedStyles.searchInput}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("Favorites")}
              style={{ marginLeft: 10 }}
            >
              <HeartIcon fill={LIKED_COLOR} />
            </TouchableOpacity>
          </View>
          <View style={styles.listContainer}>
            <>
              <PokemonsList
                data={
                  searchText.length > 3
                    ? filteredPokemons
                    : allPokemons?.data || []
                }
                initLimit={limit}
                onPressFn={(i) => {
                  const pokemonData: PokemonBaseI = i.item;
                  navigation.navigate("PokemonDetails", {
                    slug: pokemonData.slug,
                    imageUrl: pokemonData.ThumbnailImage,
                    pokemonBaseData: pokemonData,
                  });
                }}
              />
            </>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
