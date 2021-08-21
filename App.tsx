import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { LogBox } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import Ability from "./screens/Ability";
import Favorites from "./screens/Favorites";
import Home from "./screens/Home";
import PokemonDetails from "./screens/PokemonDetails";
import { PokemonBaseI } from "./types";

LogBox.ignoreLogs(["Setting a timer"]);

export type RootStackParamList = {
  Home: undefined;
  PokemonDetails: {
    slug: string;
    imageUrl: string;
    pokemonBaseData: PokemonBaseI;
  };
  Ability: {
    name: string;
    abilityUrl: string;
  };
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface props {}

const App: React.FC<props> = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Pokedex",
            }}
          />
          <Stack.Screen name="Favorites" component={Favorites} />
          <Stack.Screen name="Ability" component={Ability} />
          <Stack.Screen name="PokemonDetails" component={PokemonDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
