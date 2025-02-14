import React from 'react';
import { CryptoAsset } from '../../types/crypto';
import { calculateTotalPortfolioValue } from '../../utils/portfolio';
import { mockPortfolio } from '../../data/mockPortfolio';

interface PortfolioSummaryProps {
  cryptos?: CryptoAsset[];
}

export const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ cryptos }) => {
  const totalValue = calculateTotalPortfolioValue(mockPortfolio, cryptos);

  return (
    <div className="mb-4">
      <div className="text-3xl font-bold text-gray-900">
        ${totalValue.toLocaleString()}
      </div>
      <div className="text-sm text-gray-500">Total Portfolio Value</div>
    </div>
  );
};