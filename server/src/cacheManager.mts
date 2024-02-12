import * as fs from "fs";
import path from "node:path";
import mainLogger from "./logger.mjs";

const logger = mainLogger.child({ service: "cacheManager" });

interface CacheItem<T> {
  [key: string]: T;
}

export enum CacheName {
  AirportInfo = "airportInfo",
}

export class CacheManager<T> {
  private static instances: Map<CacheName, CacheManager<any>> = new Map();
  private cache: CacheItem<T> = {};
  private hits: number = 0;
  private misses: number = 0;
  private cacheName: string = "";

  private constructor(cacheName: CacheName) {
    this.cacheName = cacheName;
  }

  public static getInstance<T>(cacheName: CacheName): CacheManager<T> {
    if (!CacheManager.instances.has(cacheName)) {
      CacheManager.instances.set(cacheName, new CacheManager<T>(cacheName));
    }
    return CacheManager.instances.get(cacheName) as CacheManager<T>;
  }

  public set(key: string, value: T): void {
    this.cache[key] = value;
  }

  public get(key: string): T {
    const result = this.cache[key];

    result ? this.hits++ : this.misses++;

    return result;
  }

  public remove(key: string): void {
    delete this.cache[key];
  }

  public clear(): void {
    this.cache = {};
    this.hits = 0;
    this.misses = 0;
  }

  public printStatistics(): void {
    logger.debug(`${this.cacheName} hits: ${this.hits}, misses: ${this.misses}`);
  }

  public async saveToFile(cacheDirectory: string): Promise<void> {
    const fileName = path.join(cacheDirectory, `${this.cacheName}.cache.json`);

    try {
      await fs.promises.writeFile(fileName, JSON.stringify(this.cache, null, 2));
      logger.debug(`Cache saved to ${fileName} successfully.`, { fileName });
    } catch (error) {
      const err = error as Error;
      logger.error(`Error saving ${this.cacheName} cache to ${fileName}: ${error}`, { fileName });
    }
  }

  public async loadFromFile(cacheDirectory: string): Promise<void> {
    const fileName = path.join(cacheDirectory, `${this.cacheName}.cache.json`);

    try {
      const data = await fs.promises.readFile(fileName, "utf-8");
      this.cache = JSON.parse(data);
      logger.debug(`Cache ${this.cacheName} loaded from ${fileName} successfully.`, { fileName });
    } catch (error) {
      logger.error(`Error loading ${this.cacheName} cache from ${fileName}: ${error}`, {
        fileName,
      });
    }
  }
}
