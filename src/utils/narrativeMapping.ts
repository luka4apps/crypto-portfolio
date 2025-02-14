export type Narrative = 
  | 'Layer 0/1'
  | 'DeFi'
  | 'Gaming'
  | 'Meme'
  | 'AI'
  | 'Infrastructure'
  | 'Other'
  | 'Unavailable';

// Map CoinGecko category IDs to our high-level narratives
export const categoryToNarrative: { [key: string]: Narrative } = {
  // Layer 0/1
  'layer-0-l0': 'Layer 0/1',
  'layer-1': 'Layer 0/1',
  'smart-contract-platform': 'Layer 0/1',
  'layer-2': 'Layer 0/1',
  'scaling': 'Layer 0/1',
  'rollup': 'Layer 0/1',
  'cosmos-ecosystem': 'Layer 0/1',
  'polkadot-ecosystem': 'Layer 0/1',

  // DeFi
  'decentralized-finance-defi': 'DeFi',
  'decentralized-exchange': 'DeFi',
  'automated-market-maker-amm': 'DeFi',
  'yield-farming': 'DeFi',
  'lending-borrowing': 'DeFi',
  'liquid-staking': 'DeFi',
  'liquid-staking-tokens': 'DeFi',
  'stablecoins': 'DeFi',
  'crypto-backed-stablecoin': 'DeFi',
  'fiat-backed-stablecoin': 'DeFi',
  'decentralized-perpetuals': 'DeFi',

  // Gaming
  'gaming': 'Gaming',
  'play-to-earn': 'Gaming',
  'metaverse': 'Gaming',

  // Meme
  'meme-token': 'Meme',
  'dog-themed-coins': 'Meme',
  'frog-themed-coins': 'Meme',
  'elon-musk-inspired-coins': 'Meme',

  // AI
  'artificial-intelligence': 'AI',
  'ai-agents': 'AI',

  // Infrastructure
  'infrastructure': 'Infrastructure',
  'oracle': 'Infrastructure',
  'storage': 'Infrastructure',
  'data-availability': 'Infrastructure',
  'privacy-coins': 'Infrastructure',
  'zero-knowledge-zk': 'Infrastructure',
  'real-world-assets-rwa': 'Infrastructure',
  'depin': 'Infrastructure',
  'internet-of-things-iot': 'Infrastructure',

  // Add mapping for unavailable data
  'unavailable': 'Unavailable'
};

export const getNarrativeFromCategories = (categories: string[]): Narrative[] => {
  const narratives = new Set<Narrative>();
  
  if (!categories || categories.length === 0 || categories.includes('unavailable')) {
    narratives.add('Unavailable');
    return Array.from(narratives);
  }

  categories.forEach(category => {
    const narrative = categoryToNarrative[category.toLowerCase()];
    if (narrative) {
      narratives.add(narrative);
    }
  });

  if (narratives.size === 0) {
    narratives.add('Other');
  }

  return Array.from(narratives);
}; 