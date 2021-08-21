import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";
import BigLoader from "../components/BigLoader";
import PokemonsList from "../components/PokemonsList";
import {
  FAVORITES_KEY,
  GET_ALL_POKEMONS_ENDPOINT,
  LIKED_COLOR,
} from "../constants";
import styles from "../styles/HomeStyles";
import sharedStyles from "../styles/SharedStyles";
import { favoritesI, PokemonBaseI } from "../types";
import { useQuery } from "react-query";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import usePokemonSearch from "../hooks/usePokemonSearch";
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type NavigationT = NativeStackNavigationProp<RootStackParamList, "Favorites">;
type PageRoutePropsT = RouteProp<RootStackParamList, "Favorites">;

interface props {}

const Favorites: React.FC<props> = () => {
  const navigation = useNavigation<NavigationT>();
  const isFocused = useIsFocused();
  const route = useRoute<PageRoutePropsT>();
  const [parsedStoreData, setParsedStoreData] = useState<favoritesI>({
    favoritePokemons: [],
  });

  useEffect(() => {
    (async function () {
      const storeData = await AsyncStorage.getItem(FAVORITES_KEY);
      if (storeData == null) {
        return [];
      }
      const parsedStoreData: favoritesI = JSON.parse(storeData);
      setParsedStoreData(parsedStoreData);
    })();
  }, [isFocused]);

  const allFavoritedPokemons = useQuery(
    ["getAllPokemons", parsedStoreData],
    async () => {
      const { data } = await axios.get<PokemonBaseI[]>(
        GET_ALL_POKEMONS_ENDPOINT
      );
      const filteredPokemons = data.filter((i) =>
        parsedStoreData.favoritePokemons.includes(i.slug)
      );
      return filteredPokemons;
    }
  );

  const { filteredPokemons, limit, searchPokemons, searchText } =
    usePokemonSearch({
      initLimit: 50,
      basePokemonsArr: allFavoritedPokemons.data || [],
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
      <View
        style={{
          ...sharedStyles.topSearchView,
          marginTop: 60,
        }}
      >
        <TextInput
          value={searchText}
          onChangeText={searchPokemons}
          placeholder="Search Pokemons"
          style={sharedStyles.searchInput}
        />
      </View>
      <View style={styles.listContainer}>
        {allFavoritedPokemons.isLoading ? (
          <BigLoader />
        ) : (
          <>
            <PokemonsList
              data={
                searchText.length > 3
                  ? filteredPokemons
                  : allFavoritedPokemons?.data || []
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

export default Favorites;
