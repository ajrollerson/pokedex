import { State } from "./state.js";
import { Pokemon } from "./pokeapi.js";
import { promises as fs } from 'fs';

export type Save = {
    currentLocation: string | null,
    nextLocationsURL: string | null,
    prevLocationsURL: string | null
    pokedex: Record<string, Pokemon>
}

export async function commandSave(state: State, ...args: string[]) {
    const saveName = args[0];
    if (!saveName) {
        throw new Error("Must provide a save file name!");
    }

    const save: Save = {
        currentLocation: state.currentLocation,
        nextLocationsURL: state.nextLocationsURL,
        prevLocationsURL: state.prevLocationsURL,
        pokedex: state.pokedex
    }

    try {
    const jsonString = JSON.stringify(save); 
    const saveDestination = `data/${saveName}.json`
    
    await fs.writeFile(saveDestination, jsonString, 'utf8');
    console.log('Game saved!');
  } catch (error) {
    console.error('Error writing JSON file:', error);
  }

}