import { describe, expect, test } from "vitest";
import { cleanInput } from "./repl.js";

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "        hello       world",
    expected: ["hello", "world"],
  },
  {
    input: "  hElLo  wOrlD  ",
    expected: ["hello", "world"],
  },
  {
    input: "  hElLo  wOrlD 65 ",
    expected: ["hello", "world", "65"],
  },
  {
    input: "  HELLO  WORLD  ",
    expected: ["hello", "world"],
  },
 
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input)
    
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});

test("cleanInput throws on invalid input (number)", () => {
  expect(() => cleanInput(65 as any)).toThrow();
});

test("cleanInput throws on invalid input (null)", () => {
  expect(() => cleanInput(null as any)).toThrow();
});

test("cleanInput throws on invalid input (boolean)", () => {
  expect(() => cleanInput(true as any)).toThrow();
});

test("cleanInput throws on invalid input (string array)", () => {
  expect(() => cleanInput(["stick", "potato"] as any)).toThrow();
});

test("cleanInput throws on invalid input (undefined)", () => {
  expect(() => cleanInput(undefined as any)).toThrow();
});