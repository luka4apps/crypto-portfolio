import React from 'react';
import { CryptoAsset, PortfolioHolding } from '../types/crypto';
import { calculateHoldingPercentage, calculateProfitLoss, calculateTotalPortfolioValue } from '../utils/portfolio';

interface PortfolioHoldingItemProps {
  holding: PortfolioHolding;
  crypto?: CryptoAsset;
  totalValue: number;
}

export const PortfolioHoldingItem: React.FC<PortfolioHoldingItemProps> = ({
  holding,
  crypto,
  totalValue,
}) => {
  const profitLoss = calculateProfitLoss(holding, crypto);
  const percentage = calculateHoldingPercentage(holding, totalValue, crypto);

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-medium">{crypto?.name}</div>
          <div className="text-sm text-gray-500">
            {holding.amount} {holding.symbol.toUpperCase()}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {percentage.toFixed(2)}% of portfolio
          </div>
        </div>
        <div className="text-right">
          <div className="font-medium">
            ${(crypto?.current_price * holding.amount).toLocaleString()}
          </div>
          <div className={`text-sm ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {profitLoss >= 0 ? '+' : ''}{profitLoss.toLocaleString()} USD
          </div>
        </div>
      </div>
    </div>
  );
};