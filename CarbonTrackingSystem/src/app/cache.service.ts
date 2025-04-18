import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CacheService {
    private cache = new Map<string, any>();

    constructor() {}

    setCache(key: string, data: any) {
        this.cache.set(key, data);
        localStorage.setItem(key, JSON.stringify(data)); // Store in localStorage too
    }

    getCache(key: string): any {
        //const cacheEntry = this.cache.get(key);
        //if (cacheEntry) return cacheEntry;
        //return null;
        if (this.cache.has(key)) {
            return this.cache.get(key); // Get from in-memory cache first
          }
      
          const storedData = localStorage.getItem(key);
          if (storedData) {
            const parsed = JSON.parse(storedData);
            this.cache.set(key, parsed); // Sync it back into in-memory cache
            return parsed;
          }
      
          return null;
    }

    deleteCache(key: string) {
        this.cache.delete(key);
        localStorage.removeItem(key);
    }
    clearAllCache() {
        this.cache.clear();
        localStorage.clear();
    }
}
