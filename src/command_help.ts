import type { State } from "./state";

export async function commandHelp(state: State) {
    console.log(`Welcome to the Pokedex!\n\nUsage:`);
    for (const item of Object.values(state.commands)) {
        console.log(`${item.name}: ${item.description}`);
    }
}