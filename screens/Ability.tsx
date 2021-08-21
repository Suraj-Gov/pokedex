import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View, TextInput, TouchableOpacity, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-svg";
import { useQuery } from "react-query";
import { RootStackParamList } from "../App";
import { HeartIcon } from "../assets/icons";
import BigLoader from "../components/BigLoader";
import PokemonsList from "../components/PokemonsList";
import { GET_ALL_POKEMONS_ENDPOINT, LIKED_COLOR } from "../constants";
import usePokemonSearch from "../hooks/usePokemonSearch";
import sharedStyles from "../styles/SharedStyles";
import { PokemonBaseI } from "../types";
import { getUnique } from "../utils";

type navigationT = NativeStackNavigationProp<RootStackParamList, "Ability">;
type pageRouteProps = RouteProp<RootStackParamList, "Ability">;

interface props {}

const Ability: React.FC<props> = () => {
  const navigation = useNavigation<navigationT>();
  const route = useRoute<pageRouteProps>();

  useEffect(() => {
    navigation.setOptions({
      title: route.params.name,
    });
  }, []);

  // prettier-ignore
  const pokemonsWithAbility = useQuery<PokemonBaseI[]>(route.params.name, async () => {
		const {data: pokemonsOfAbility} = await axios.get(route.params.abilityUrl);
		const pokemonNames = pokemonsOfAbility.pokemon.map((i: any) => i.pokemon.name.toLowerCase())
		const {data: pokemons} = await axios.get<PokemonBaseI[]>(GET_ALL_POKEMONS_ENDPOINT)
		const filteredPokemons = pokemons.filter(i => pokemonNames.includes(i.slug))
		return getUnique(filteredPokemons, "slug");
	})

  const { filteredPokemons, limit, searchPokemons, searchText } =
    usePokemonSearch({
      initLimit: 50,
      basePokemonsArr: pokemonsWithAbility.data,
    });

  return (
    <SafeAreaView
      style={[sharedStyles.centeredContainer, sharedStyles.parentView]}
    >
      <StatusBar style="auto" />
      <View style={sharedStyles.topSearchView}>
        <TextInput
          value={searchText}
          onChangeText={(text) => searchPokemons(text)}
          placeholder={`Search all ${route.params.name} Pokemons`}
          style={sharedStyles.searchInput}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Favorites")}
          style={{ marginLeft: 10 }}
        >
          <HeartIcon fill={LIKED_COLOR} />
        </TouchableOpacity>
      </View>
      {pokemonsWithAbility.isLoading ? (
        <BigLoader />
      ) : pokemonsWithAbility.isError ? (
        <View style={sharedStyles.centeredContainer}>
          <Text>Something went wrong</Text>
          <Button
            title="Try again"
            onPress={() => pokemonsWithAbility.refetch()}
          />
        </View>
      ) : (
        <PokemonsList
          data={
            searchText.length > 3
              ? filteredPokemons
              : pokemonsWithAbility?.data || []
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
      )}
    </SafeAreaView>
  );
};

export default Ability;
