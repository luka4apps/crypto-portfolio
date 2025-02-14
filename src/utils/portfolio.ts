import { CryptoAsset, PortfolioHolding, NarrativeAllocation, CATEGORY_TO_NARRATIVE } from '../types/crypto';

export const calculateHoldingValue = (
  holding: PortfolioHolding,
  crypto?: CryptoAsset
): number => {
  if (!crypto) return 0;
  return crypto.current_price * holding.amount;
};

export const calculateTotalPortfolioValue = (
  portfolio: PortfolioHolding[],
  cryptos?: CryptoAsset[]
): number => {
  if (!cryptos) return 0;
  return portfolio.reduce((total, holding) => {
    const crypto = cryptos.find(c => c.id === holding.id);
    return total + calculateHoldingValue(holding, crypto);
  }, 0);
};

export const calculateHoldingPercentage = (
  holding: PortfolioHolding,
  totalValue: number,
  crypto?: CryptoAsset
): number => {
  if (!crypto || totalValue === 0) return 0;
  const holdingValue = calculateHoldingValue(holding, crypto);
  return (holdingValue / totalValue) * 100;
};

export const calculateProfitLoss = (
  holding: PortfolioHolding,
  crypto?: CryptoAsset
): number => {
  if (!crypto) return 0;
  return (crypto.current_price - holding.purchasePrice) * holding.amount;
};

export const getNarrativeFromCategories = (categories: string[] = []): string => {
  for (const category of categories) {
    const narrative = CATEGORY_TO_NARRATIVE[category.toLowerCase()];
    if (narrative) return narrative;
  }
  return 'Other';
};

export const calculateNarrativeAllocations = (
  portfolio: PortfolioHolding[],
  cryptos?: CryptoAsset[]
): NarrativeAllocation[] => {
  if (!cryptos) return [];

  const narrativeValues: { [key: string]: number } = {};
  const totalValue = calculateTotalPortfolioValue(portfolio, cryptos);

  // Calculate total value for each narrative
  portfolio.forEach(holding => {
    const crypto = cryptos.find(c => c.id === holding.id);
    if (crypto) {
      const holdingValue = calculateHoldingValue(holding, crypto);
      const narrative = getNarrativeFromCategories(crypto.categories);
      narrativeValues[narrative] = (narrativeValues[narrative] || 0) + holdingValue;
    }
  });

  // Convert to percentages
  return Object.entries(narrativeValues).map(([narrative, value]) => ({
    narrative,
    value,
    percentage: (value / totalValue) * 100
  })).sort((a, b) => b.percentage - a.percentage);
};