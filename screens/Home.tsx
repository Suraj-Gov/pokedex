import React from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import axios from "axios";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { PokemonBaseI } from "../types";
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
import { LIKED_COLOR, NOT_LIKED_COLOR } from "../constants";

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

  return (
    <SafeAreaView
      style={[
        sharedStyles.centeredContainer,
        sharedStyles.parentView,
        sharedStyles.fullHeightContainer,
      ]}
    >
      <StatusBar style="auto"></StatusBar>
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
        {allPokemons.isLoading ? (
          <BigLoader />
        ) : (
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
                });
              }}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
