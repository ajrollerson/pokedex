import { createInterface } from "readline";

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
  const words = cleanInput(input)
  if (words.length === 0) {
    rl.prompt()
    return
  }
  console.log(`Your command was: ${words[0]}`)
  rl.prompt()
});
}
