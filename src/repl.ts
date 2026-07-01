import { createInterface } from "readline";
import { getCommands } from "./command.js";
import { initState } from "./state.js";

export function cleanInput(input: string): string[] {
  if (typeof input !== "string") {
    throw new Error("Input must be a string!");
  }
  return input.toLowerCase().trim().split(" ").filter((word) => word !== "");
}

export function startREPL () {
  const state = initState();
  const rl = state.readline;
  const commands = state.commands;

  rl.prompt()
  rl.on("line", (input: string) => {
  const words = cleanInput(input);
  if (words.length === 0) {
    rl.prompt();
    return;
  }
  const order = words[0];
  const cmd = commands[order];
 
  if (cmd === undefined) {
    console.log("Unknown command");
    rl.prompt();
    return;
  } 
  try {
    cmd.callback(state);
  } catch (err) {
    console.log(err);
  }
  
  rl.prompt();
});
}
