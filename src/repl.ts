export function cleanInput(input: string): string[] {
  if (typeof input !== "string") {
    throw new Error("Input must be a string!");
  }
  return input.toLowerCase().trim().split(" ").filter((word) => word !== "");
}