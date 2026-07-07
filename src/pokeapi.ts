import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(interval: number) {
    this.cache = new Cache(interval)
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;

    const cacheResult = this.cache.get(url)
    if (cacheResult) {
      return cacheResult as ShallowLocations
    } else {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json() as ShallowLocations;
    this.cache.add(url, result)
    return result
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cacheResult = this.cache.get(url)
    if (cacheResult) {
      return cacheResult as Location
    } else {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json() as Location;
    this.cache.add(url, result)
    return result
    }
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    const cacheResult = this.cache.get(url)
    if (cacheResult) {
      return cacheResult as Pokemon
    } else {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json() as Pokemon;
    this.cache.add(url, result)
    return result
    }
  }

}

export type Place = {
    name: string,
    url: string
};

export type ShallowLocations = {
  count: number,
  next: string | null,
  previous: string | null,
  results: Array<Place>
};

type Location = {
  name: string
  pokemon_encounters: {
    pokemon: {
      name: string
    }
  }[]
};

export type Pokemon = {
  name: string,
  base_experience: number,
  height: number,
  weight: number,
  stats: {
  base_stat: number;
  effort: number;
  stat: {
    name: string; 
    url: string;
    };
  }[];
  types: {
  slot: number;
  type: {
    name: string;
    url: string;
    };
  }[];
}