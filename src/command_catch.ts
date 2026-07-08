import type { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
    const pokemonName = args[0];
    if (!pokemonName) {
        throw new Error("Pokemon does not exist!");
    }

    const pokemon = await state.pokeapi.fetchPokemon(pokemonName);
    const base_experience = pokemon.base_experience;
    const location = await state.pokeapi.fetchLocation(state, state.currentLocation as string)


    for (const areaPokemon of location.pokemon_encounters) {
        if (areaPokemon.pokemon.name.includes(pokemonName)) {
            console.log(`Throwing a Pokeball at ${pokemon.name}...`)
            if ((base_experience * Math.random()) < 30) {
                state.pokedex[pokemonName] = pokemon;
                console.log(`${pokemon.name} was caught!`);
                console.log("You may now inspect it with the inspect command.")
                return
            } else {
                console.log(`${pokemon.name} escaped!`);
                return
            } 
        }
    }
    console.log(`${pokemon.name} is not here!`)
}