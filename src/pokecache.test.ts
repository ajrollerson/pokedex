import { Cache } from "./pokecache.js";
import { vi, test, expect } from "vitest";
import { PokeAPI } from "./pokeapi.js";

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500, // 1/2 second
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000, // 1 second
  },
  {
  key: "https://pokeapi.co/api/v2/location-area",
  val: { count: 1, next: "", previous: "", results: [{ name: "pallet-town", url: "..." }] },
  interval: 500,
  },

])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval * 2));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
})

test("adding the same key twice overwrites the first value", () => {
  const cache = new Cache(5000);
  
  cache.add("https://example.com", "first");
  cache.add("https://example.com", "second");
  
  const result = cache.get("https://example.com");
  expect(result).toBe("second");
  
  cache.stopReapLoop();
});

test("adding a blank key", () => {
  const cache = new Cache(5000);
  
  cache.add("", "example");
  
  const result = cache.get("");
  expect(result).toBe("example");
  
  cache.stopReapLoop();
});

test("an empty value", () => {
  const cache = new Cache(5000);
  
  cache.add("https://example.com", "");
  
  const result = cache.get("https://example.com");
  expect(result).toBe("");
  
  cache.stopReapLoop();
});









;