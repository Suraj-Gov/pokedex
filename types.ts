export interface PokemonBaseI {
  abilities: string[];
  detailPageURL: string;
  weight: string;
  weakness: string[];
  number: string;
  height: string;
  collectibles_slug: string;
  slug: string;
  name: string;
  ThumbnailAltText: string;
  ThumbnailImage: string;
  id: string;
  type: string[];
}

export interface abilityI {
  name: string;
  url: string;
}

export interface statI {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
  };
}

export interface PokemonDetailsI {
  abilities: {
    ability: abilityI;
  }[];
  base_experience: number;
  name: string;
  stats: statI[];
}

export interface kStringI {
  [key: string]: any;
}

export interface favoritesI {
  favoritePokemons: string[];
}

export interface compareTupleI {
  compareTuple: PokemonBaseI[];
}
