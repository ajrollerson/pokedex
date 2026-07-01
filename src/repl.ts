import { createInterface } from "readline";
import { getCommands } from "./command.js";

export function cleanInput(input: string): string[] {
  if (typeof input !== "string") {
    throw new Error("Input must be a string!");
  }
  return input.toLowerCase().trim().split(" ").filter((word) => word !== "");
}

export function startREPL () {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > "
  });

  rl.prompt()
  rl.on("line", (input: string) => {
  const words = cleanInput(input);
  if (words.length === 0) {
    rl.prompt();
    return;
  }
  const order = words[0];
  const commands = getCommands();
  const cmd = commands[order];
 
  if (cmd === undefined) {
    console.log("Unknown command");
    rl.prompt();
    return;
  } 
  try {
    cmd.callback(commands);
  } catch (err) {
    console.log(err);
  }
  
  rl.prompt();
});
}
