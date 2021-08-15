import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "./screens/Home"
import PokemonDetails from "./screens/PokemonDetails";

const appNavigator = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    PokemonDetails: {
      screen: PokemonDetails
    }
  }, {
    initialRouteName: "Home"
  }
)

const AppContainer = createAppContainer(appNavigator)

interface props {}

const App:React.FC<props> = () => {
  return (
    <AppContainer />
  )
}

export default App;