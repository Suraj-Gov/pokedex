import React from "react";
import { LogBox } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./screens/Home"
import PokemonDetails from "./screens/PokemonDetails";

LogBox.ignoreLogs(["Setting a timer"])

const appNavigator = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    PokemonDetails: {
      screen: PokemonDetails
    }
  }, {
    initialRouteName: "Home",
    headerMode: "none"
  }
)

const AppContainer = createAppContainer(appNavigator)

interface props {}

const App:React.FC<props> = () => {
  
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
    <AppContainer /></QueryClientProvider>
  )
}

export default App;