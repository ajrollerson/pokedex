import { State } from "./state.js";

export async function commandWhere(state: State) {
    if (!state.currentLocation) {
        console.log("You haven't started your Pokemon Journey yet. Please use 'map' and then 'explore <location>' to begin")
        return
    } else {
        console.log("You are currently in:")
        console.log(`${state.currentLocation}`)
    }
}