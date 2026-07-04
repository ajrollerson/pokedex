export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;
    
    const response = await fetch(url);
    if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json() as ShallowLocations;
    return result
  }

}

export type Place = {
    name: string,
    url: string
}

export type ShallowLocations = {
  count: number,
  next: string | null,
  previous: string | null
  results: Array<Place>
};

export type Location = {
  name: string
};