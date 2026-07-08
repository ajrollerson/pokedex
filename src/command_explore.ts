import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
    const areaName = args[0];
    if (!areaName) {
        throw new Error("Area does not exist!")
    }

    const location = await state.pokeapi.fetchLocation(state, areaName)

    console.log(`Exploring ${areaName}...`)
    console.log("Found Pokemon:")
    for (const pokemon of location.pokemon_encounters) {
        console.log(` - ${pokemon.pokemon.name}`)
    }
}
