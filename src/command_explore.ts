import { ShallowLocations } from "./pokeapi.js";
import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {

    const areaName = args[0];

    if (!areaName) {
        console.log("Location field not filled, please explore using 'explore <location>'!")
        return
    }
    const location = await state.pokeapi.fetchLocation(state, areaName)

    console.log(`Exploring ${areaName}...`)
    console.log("Found Pokemon:")
    for (const pokemon of location.pokemon_encounters) {
        console.log(` - ${pokemon.pokemon.name}`)
    }
}
