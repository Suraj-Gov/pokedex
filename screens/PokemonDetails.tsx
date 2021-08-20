import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useQuery } from "react-query";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { LIKED_COLOR, NOT_LIKED_COLOR, pokemonBySlug } from "../constants";
import BigLoader from "../components/BigLoader";
import sharedStyles from "../styles/SharedStyles";
import { abilityI, PokemonDetailsI, statI } from "../types";
import WithLabel from "../components/WithLabel";
import { FlatList } from "react-native-gesture-handler";
import { HeartIcon } from "../assets/icons";

type navigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PokemonDetails"
>;
type pageRouteProp = RouteProp<RootStackParamList, "PokemonDetails">;

interface props {}

const PokemonDetails: React.FC<props> = ({}) => {
  const route = useRoute<pageRouteProp>();
  const navigation = useNavigation<navigationProp>();

  useEffect(() => {
    navigation.setOptions({
      title: route.params.slug,
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={() => {
              // TODO
            }}
          >
            <HeartIcon fill={true ? NOT_LIKED_COLOR : LIKED_COLOR} />
          </TouchableOpacity>
        );
      },
    });
  }, []);

  const pokemonDetails = useQuery([route.params.slug], async () => {
    const { data } = await axios.get<PokemonDetailsI>(
      pokemonBySlug + route.params.slug
    );
    return data;
  });

  return (
    <SafeAreaView style={[sharedStyles.horizontallyCenteredContainer]}>
      <StatusBar style="auto"></StatusBar>
      {pokemonDetails.isLoading ? (
        <BigLoader />
      ) : !pokemonDetails.isSuccess ? (
        <View
          style={[
            sharedStyles.fullHeightContainer,
            sharedStyles.centeredContainer,
          ]}
        >
          <Text>Something went wrong</Text>
          <Button title="Retry" onPress={() => pokemonDetails.refetch} />
        </View>
      ) : (
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 200, height: 200 }}
              source={{ uri: route.params.imageUrl }}
            />
            <View>
              <Text style={styles.nameStyle}>{pokemonDetails.data.name}</Text>
              <WithLabel labelTitle="XP">
                <Text style={styles.statTextStyle}>
                  {pokemonDetails.data.base_experience}
                </Text>
              </WithLabel>
            </View>
          </View>
          <View>
            <WithLabel labelTitle="Abilities">
              <FlatList
                style={{ marginTop: 10 }}
                horizontal
                data={pokemonDetails.data.abilities}
                keyExtractor={(i: any) => i.ability.name}
                renderItem={(i) => {
                  return (
                    <View style={{ marginRight: 10 }}>
                      <Button
                        title={i.item.ability.name}
                        onPress={() => {
                          navigation.navigate("Ability", {
                            name: i.item.ability.name,
                            abilityUrl: i.item.ability.url,
                          });
                        }}
                      />
                    </View>
                  );
                }}
              />
            </WithLabel>
            <FlatList
              data={pokemonDetails.data.stats}
              keyExtractor={(i: statI) => i.stat.name}
              renderItem={(i) => {
                const s: statI = i.item;
                return (
                  <View style={{ marginVertical: 5 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          ...styles.statTextStyle,
                          marginRight: 5,
                        }}
                      >
                        {s.stat.name.toUpperCase()}
                      </Text>
                      <Text style={[styles.statTextStyle, styles.boldText]}>
                        {s.base_stat}
                      </Text>
                    </View>
                    <View>
                      <Text>Effort: {s.effort}</Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PokemonDetails;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
  },
  nameStyle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
  },
  statTextStyle: {
    fontSize: 24,
    fontWeight: "500",
  },
  boldText: {
    fontWeight: "bold",
  },
});
