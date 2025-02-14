export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  categories?: string[];
}

export interface PortfolioHolding {
  id: string;
  symbol: string;
  amount: number;
  purchasePrice: number;
  categories?: string[];
}

export interface NarrativeAllocation {
  narrative: string;
  percentage: number;
  value: number;
}

// Map CoinGecko categories to our simplified narratives
export const CATEGORY_TO_NARRATIVE: { [key: string]: string } = {
  // Layer 0/1
  'layer-1': 'Layer 0/1',
  'ethereum-ecosystem': 'Layer 0/1',
  'cosmos-ecosystem': 'Layer 0/1',
  'binance-smart-chain': 'Layer 0/1',
  'avalanche-ecosystem': 'Layer 0/1',
  'polkadot-ecosystem': 'Layer 0/1',
  
  // DeFi
  'decentralized-finance-defi': 'DeFi',
  'decentralized-exchange': 'DeFi',
  'yield-farming': 'DeFi',
  'lending-borrowing': 'DeFi',
  
  // Gaming
  'gaming': 'Gaming',
  'play-to-earn': 'Gaming',
  'gaming-guild': 'Gaming',
  
  // Meme
  'meme': 'Meme',
  'dog-themed': 'Meme',
  
  // AI
  'ai-artificial-intelligence': 'AI',
  'machine-learning': 'AI',
  
  // Infrastructure
  'infrastructure': 'Infrastructure',
  'oracle': 'Infrastructure',
  'storage': 'Infrastructure',
  'identity': 'Infrastructure',
  
  // Default
  'other': 'Other'
};