import APICache from '../utils/apiCache';
import { CryptoAsset } from '../types/crypto';
import { mockPortfolio } from '../data/mockPortfolio';

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

// Fetch categories list first
export const getCoinCategories = async () => {
  const url = `${COINGECKO_BASE_URL}/coins/categories/list`;
  try {
    return await APICache.fetchWithCache<any[]>(url);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Get market data for specific coins with their categories
export const getTopCryptos = async (limit: number = 100): Promise<CryptoAsset[]> => {
  const url = `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&sparkline=false`;
  
  try {
    const marketData = await APICache.fetchWithCache<CryptoAsset[]>(url);
    
    // Fetch detailed data (including categories) for each coin
    const detailedData = await Promise.all(
      marketData.map(async (coin) => {
        const detailUrl = `${COINGECKO_BASE_URL}/coins/${coin.id}`;
        try {
          const details = await APICache.fetchWithCache<any>(detailUrl, { cacheDuration: 24 * 60 * 60 });
          return {
            ...coin,
            categories: details.categories || ['unavailable']
          };
        } catch (error) {
          console.warn(`Failed to fetch details for ${coin.id}:`, error);
          return { 
            ...coin, 
            categories: ['unavailable']
          };
        }
      })
    );

    return detailedData;

  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return [];
  }
}; 