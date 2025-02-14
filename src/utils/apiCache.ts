interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface CacheOptions extends RequestInit {
  cacheDuration?: number;
}

class APICache {
  private static cache: { [key: string]: CacheEntry<any> } = {};
  private static DEFAULT_CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

  static async fetchWithCache<T>(
    url: string,
    options?: CacheOptions
  ): Promise<T> {
    const cached = this.cache[url];
    const now = Date.now();
    const cacheDuration = options?.cacheDuration 
      ? options.cacheDuration * 1000 
      : this.DEFAULT_CACHE_DURATION;

    if (cached && now - cached.timestamp < cacheDuration) {
      return cached.data;
    }

    console.debug(`Cache miss for: ${url}`);

    // Remove cacheDuration from options before passing to fetch
    const { cacheDuration: _, ...fetchOptions } = options || {};

    try {
      const response = await fetch(url, fetchOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Cache the new data
      this.cache[url] = {
        data,
        timestamp: now
      };

      return data;
    } catch (error) {
      // If we have stale cache data, return it as fallback
      if (cached) {
        console.warn('Using stale cache data due to API error:', error);
        return cached.data;
      }
      throw error;
    }
  }

  static clearCache() {
    this.cache = {};
  }
}

export default APICache; 