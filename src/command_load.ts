import { Save } from "./command_save.js";
import { State } from "./state.js";
import { readFile } from 'fs/promises';

export async function commandLoad(state: State, ...args: string[]) {
    const saveName = args[0];
    if (!saveName) {
        throw new Error("Must provide a save file name!");
    }

    const saveDestination = `data/${saveName}.json`
    const saveData = await readFile(saveDestination, 'utf8');

    const save: Save = await JSON.parse(saveData)

    state.currentLocation = save.currentLocation
    state.nextLocationsURL = save.nextLocationsURL
    state.prevLocationsURL = save.prevLocationsURL
    state.pokedex = save.pokedex

    console.log(`Save file ${saveName} loaded!`)

}