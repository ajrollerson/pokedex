export type CacheEntry<T> = {
    createdAt: number,
    val: T
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval
    this.#startReapLoop()
  }

  add<T>(key: string, val: T) {
    const cacheEntry: CacheEntry<T> = {
        createdAt: Date.now(),
        val: val
    }

    this.#cache.set(key, cacheEntry)
  }

  get<T>(key: string): T | undefined {
    return this.#cache.get(key)?.val;
  }

  #reap() {
    for (const [key, val] of this.#cache) {
        if (val.createdAt < (Date.now() - this.#interval)) {
            this.#cache.delete(key)
        }
    }
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => { this.#reap() }, this.#interval)
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId)
    this.#reapIntervalId = undefined
  }
}