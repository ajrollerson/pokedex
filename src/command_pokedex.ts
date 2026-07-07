import type { State } from "./state.js";

export async function commandPokedex(state: State, ...args: string[]) {
  console.log("Your Pokedex:")
  for (const [name] of Object.entries(state.pokedex)) {
    console.log(` - ${name}`)
    }
}