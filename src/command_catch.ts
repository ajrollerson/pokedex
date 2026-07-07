import type { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
    const pokemonName = args[0];
    if (!pokemonName) {
        throw new Error("Pokemon does not exist!");
    }

    const pokemon = await state.pokeapi.fetchPokemon(pokemonName);
    const base_experience = pokemon.base_experience;

    console.log(`Throwing a Pokeball at ${pokemon.name}...`)
    if ((base_experience * Math.random()) < 30) {
        state.pokedex[pokemonName] = pokemon;
        console.log(`${pokemon.name} was caught!`);
        console.log("you may now inspect it with the inspect command.")
    } else {
        console.log(`${pokemon.name} escaped!`);
    }
}