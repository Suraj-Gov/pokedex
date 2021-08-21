import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { COMPARE_TUPLE_KEY, MAX_COMPARE_TUPLES } from "../constants";
import { compareTupleI, PokemonBaseI } from "../types";
import useStoreData from "./useStoreData";

export default function useIsPokemonCompare(
  pokemonBaseData: PokemonBaseI
): [isInCompare: boolean, toggleCompare: () => void] {
  const [isInCompare, setIsInCompare] = useState(false);
  const [storeData, setStoreData] =
    useStoreData<compareTupleI>(COMPARE_TUPLE_KEY);

  const checkIsInCompare = useCallback(() => {
    (async function () {
      // await AsyncStorage.removeItem(COMPARE_TUPLE_KEY);
    })();
    if (!storeData || storeData.compareTuple.length === 0) {
      setStoreData({
        compareTuple: [],
      });
      setIsInCompare(false);
      return false;
    }
    setIsInCompare(
      storeData?.compareTuple.some(
        (i) => i !== null && i.slug === pokemonBaseData.slug
      )
    );
    return true;
  }, [isInCompare, storeData]);

  useEffect(() => {
    checkIsInCompare();
  }, [storeData]);

  const toggleCompare = async () => {
    if (isInCompare) {
      const newStoreData: compareTupleI = {
        compareTuple: storeData!.compareTuple.filter(
          (i) => i.slug !== pokemonBaseData.slug
        ),
      };
      await setStoreData(newStoreData);
      setIsInCompare(false);
    } else {
      let newTuple = [...(storeData?.compareTuple || []), pokemonBaseData];
      if (newTuple.length > MAX_COMPARE_TUPLES) {
        newTuple = newTuple.slice(1, MAX_COMPARE_TUPLES + 1);
      }
      await setStoreData({
        compareTuple: newTuple,
      });
      setIsInCompare(true);
    }
  };

  return [isInCompare, toggleCompare];
}
