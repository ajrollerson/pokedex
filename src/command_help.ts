import type { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>) {
    console.log(`Welcome to the Pokedex!\n\nUsage:`);
    for (const item of Object.values(commands)) {
        console.log(`${item.name}: ${item.description}`);
    }
}