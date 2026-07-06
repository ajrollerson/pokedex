import { createInterface } from "readline";
import { getCommands } from "./command.js";
import { initState } from "./state.js";

export function cleanInput(input: string): string[] {
  if (typeof input !== "string") {
    throw new Error("Input must be a string!");
  }
  return input.toLowerCase().trim().split(" ").filter((word) => word !== "");
}

export async function startREPL () {
  const state = initState();
  const rl = state.readline;
  const commands = state.commands;

  rl.prompt()
  rl.on("line", async (input: string) => {
  const words = cleanInput(input);
  if (words.length === 0) {
    rl.prompt();
    return;
  }
  const order = words[0];
  const args = words.slice(1);
  const cmd = commands[order];
 
  if (cmd === undefined) {
    console.log("Unknown command");
    rl.prompt();
    return;
  } 
  try {
    await cmd.callback(state, ...args);
  } catch (err) {
    console.log(err);
  }
  
  rl.prompt();
});
}
