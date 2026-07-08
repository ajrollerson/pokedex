import { createInterface, type Interface } from "readline";
import { getCommands } from "./command.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";

export type State = {
    readline: Interface,
    commands: Record<string, CLICommand>,
    pokeapi: PokeAPI,
    currentLocation: string | null,
    nextLocationsURL: string | null,
    prevLocationsURL: string | null
    pokedex: Record<string, Pokemon>
}

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState () {
    const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > "
  });

  const commands = getCommands();

  const state: State = {
    readline: rl,
    commands: commands,
    pokeapi: new PokeAPI(30000),
    currentLocation: null,
    nextLocationsURL: null,
    prevLocationsURL: null,
    pokedex: {}
  }

  return state
}