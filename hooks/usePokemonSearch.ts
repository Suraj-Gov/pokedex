import debounce from "debounce";
import { useCallback, useState } from "react";
import { PokemonBaseI } from "../types";

interface optsI {
  initLimit: number;
  basePokemonsArr?: PokemonBaseI[];
}

export default function usePokemonSearch(opts: optsI) {
  const { basePokemonsArr, initLimit } = opts;
  const [limit, setLimit] = useState(initLimit);
  const [searchText, setSearchText] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonBaseI[]>([]);

  const searchForPokemons = useCallback(
    debounce((searchStr: string) => {
      console.log("searching..");
      if (searchStr.length > 3 && basePokemonsArr) {
        const filtered = basePokemonsArr.filter((i) =>
          i.name.toLowerCase().includes(searchStr)
        );
        console.log(filtered);
        setFilteredPokemons(filtered);
      } else {
        setFilteredPokemons([]);
      }
    }, 500),
    []
  );

  const searchPokemons = useCallback((value: string) => {
    setSearchText(value);
    searchForPokemons(value);
  }, []);

  return {
    filteredPokemons,
    limit,
    searchPokemons,
    searchText,
  };
}
