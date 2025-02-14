import React from 'react';
import { CryptoAsset } from '../../types/crypto';
import { PortfolioHoldingItem } from './PortfolioHoldingItem';
import { mockPortfolio } from '../../data/mockPortfolio';
import { calculateTotalPortfolioValue } from '../../utils/portfolio';

interface PortfolioHoldingsListProps {
  cryptos?: CryptoAsset[];
}

export const PortfolioHoldingsList: React.FC<PortfolioHoldingsListProps> = ({ cryptos }) => {
  const totalValue = calculateTotalPortfolioValue(mockPortfolio, cryptos);

  return (
    <div className="space-y-4">
      {mockPortfolio.map(holding => (
        <PortfolioHoldingItem
          key={holding.id}
          holding={holding}
          crypto={cryptos?.find(c => c.id === holding.id)}
          totalValue={totalValue}
        />
      ))}
    </div>
  );
};