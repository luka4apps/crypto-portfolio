import { CryptoAsset } from '../types/crypto';
import { mockPortfolio } from '../data/mockPortfolio';
import APICache from '../utils/apiCache';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const fetchTopCryptos = async (): Promise<CryptoAsset[]> => {
  const portfolioIds = new Set(mockPortfolio.map(coin => coin.id));

  // Use APICache for market data
  const marketData = await APICache.fetchWithCache<CryptoAsset[]>(
    `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=false`
  );

  // Get detailed data only for portfolio coins
  const detailedData = await Promise.all(
    marketData.map(async (coin: CryptoAsset) => {
      if (portfolioIds.has(coin.id)) {
        try {
          const details = await APICache.fetchWithCache<any>(
            `${COINGECKO_API}/coins/${coin.id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`,
            { cacheDuration: 24 * 60 * 60 } // Cache for 24 hours
          );

          return {
            ...coin,
            categories: details.categories?.map((c: string) => c.toLowerCase()) || ['unavailable']
          };
        } catch (error) {
          return { ...coin, categories: ['unavailable'] };
        }
      }
      return { ...coin, categories: [] };
    })
  );

  return detailedData;
};