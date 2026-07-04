import type { State } from "./state";

export async function commandMap(state: State) {
    const { next, previous, results } = await state.pokeapi.fetchLocations(state.nextLocationsURL ?? undefined);
    for (const place of results) {
        console.log(place.name);
    }
    state.nextLocationsURL = next
    state.prevLocationsURL = previous
}

export async function commandMapb(state: State) {
    if (state.prevLocationsURL === null) {
        console.log("you're on the first page")
        return
    }
    const { next, previous, results } = await state.pokeapi.fetchLocations(state.prevLocationsURL);
    for (const place of results) {
        console.log(place.name);
    }
    state.nextLocationsURL = next
    state.prevLocationsURL = previous
}
