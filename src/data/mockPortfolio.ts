import { PortfolioHolding } from '../types/crypto';

export const mockPortfolio: PortfolioHolding[] = [
  { 
    id: 'bitcoin', 
    symbol: 'btc', 
    amount: 0.5, 
    purchasePrice: 35000,
    categories: ['layer-1', 'proof-of-work-pow']
  },
  { 
    id: 'ethereum', 
    symbol: 'eth', 
    amount: 2.5, 
    purchasePrice: 2000,
    categories: ['smart-contract-platform', 'layer-1']
  },
  { 
    id: 'cardano', 
    symbol: 'ada', 
    amount: 5000, 
    purchasePrice: 1.2,
    categories: ['smart-contract-platform', 'layer-1']
  },
  { 
    id: 'solana', 
    symbol: 'sol', 
    amount: 50, 
    purchasePrice: 80,
    categories: ['smart-contract-platform', 'layer-1']
  },
  { 
    id: 'polkadot', 
    symbol: 'dot', 
    amount: 200, 
    purchasePrice: 15,
    categories: ['layer-0-l0', 'infrastructure']
  },
  { 
    id: 'chainlink', 
    symbol: 'link', 
    amount: 150, 
    purchasePrice: 12,
    categories: ['oracle', 'infrastructure']
  },
  { 
    id: 'uniswap', 
    symbol: 'uni', 
    amount: 100, 
    purchasePrice: 20,
    categories: ['decentralized-exchange', 'defi']
  },
  { 
    id: 'avalanche-2', 
    symbol: 'avax', 
    amount: 75, 
    purchasePrice: 40,
    categories: ['smart-contract-platform', 'layer-1']
  },
  { 
    id: 'near', 
    symbol: 'near', 
    amount: 200, 
    purchasePrice: 8,
    categories: ['smart-contract-platform', 'layer-1', 'artificial-intelligence']
  },
  { id: 'cosmos', symbol: 'atom', amount: 100, purchasePrice: 25 },
  { id: 'aave', symbol: 'aave', amount: 10, purchasePrice: 200 },
  { id: 'algorand', symbol: 'algo', amount: 1000, purchasePrice: 1.5 },
  { id: 'tezos', symbol: 'xtz', amount: 500, purchasePrice: 3 },
  { id: 'stellar', symbol: 'xlm', amount: 5000, purchasePrice: 0.3 },
  { id: 'vechain', symbol: 'vet', amount: 10000, purchasePrice: 0.1 },
  { id: 'theta-token', symbol: 'theta', amount: 300, purchasePrice: 5 },
  { id: 'filecoin', symbol: 'fil', amount: 50, purchasePrice: 40 },
];