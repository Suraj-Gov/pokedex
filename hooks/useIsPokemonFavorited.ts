import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { FAVORITES_KEY } from "../constants";
import { favoritesI } from "../types";

const useIsPokemonFavorited = (slug: string): [boolean | null, () => void] => {
  const [isFavorite, setIsFavorite] = useState<boolean | null>(() => false);

  const checkFavorite = useCallback(() => {
    (async function () {
      try {
        const data = await AsyncStorage.getItem(FAVORITES_KEY);
        if (data === null) {
          setIsFavorite(false);
        } else {
          const parsedData: favoritesI = JSON.parse(data);
          if (parsedData.favoritePokemons.includes(slug)) {
            setIsFavorite(true);
          }
        }
      } catch (err) {
        console.log(err);
        setIsFavorite(false);
      }
    })();
  }, [isFavorite]);

  useEffect(() => {
    checkFavorite();
  }, []);

  const toggleFavorite = useCallback(() => {
    (async function () {
      let favoriteArray: string[] = [];
      try {
        const data = await AsyncStorage.getItem(FAVORITES_KEY);
        if (data !== null) {
          const parsedData: favoritesI = JSON.parse(data);
          favoriteArray = parsedData.favoritePokemons;
        }
        if (isFavorite) {
          favoriteArray = favoriteArray.filter((i) => i !== slug);
          const dataToSave: favoritesI = {
            favoritePokemons: favoriteArray,
          };
          await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(dataToSave));
          setIsFavorite(false);
          console.log("unhearted", slug);
        } else {
          favoriteArray.push(slug);
          const dataToSave: favoritesI = {
            favoritePokemons: favoriteArray,
          };
          await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(dataToSave));
          setIsFavorite(true);
          console.log("hearted", slug);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [isFavorite]);

  return [isFavorite, toggleFavorite];
};

export default useIsPokemonFavorited;
