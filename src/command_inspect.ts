import type { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
    const pokemonName = args[0];
    if (!pokemonName) {
        console.log("Pokemon does not exist!");
    } else if (!state.pokedex[pokemonName]) {
        console.log("You have not caught that pokemon");
        return;

    } else {
        console.log(`Name: ${state.pokedex[pokemonName].name}`);
        console.log(`Height: ${state.pokedex[pokemonName].height}`);
        console.log(`Weight: ${state.pokedex[pokemonName].weight}`);
        console.log("Stats:");
        for (const stat of state.pokedex[pokemonName].stats) {
            console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
        }
        console.log("Types:");
        for (const type of state.pokedex[pokemonName].types) {
            console.log(`  - ${type.type.name}`);
        };
    };
};