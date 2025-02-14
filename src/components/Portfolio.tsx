import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PortfolioChart } from './PortfolioChart';
import { PortfolioHoldingItem } from './PortfolioHoldingItem';
import { calculateTotalPortfolioValue } from '../utils/portfolio';
import { mockPortfolio } from '../data/mockPortfolio';
import { getTopCryptos } from '../services/coingeckoService';

export const Portfolio: React.FC = () => {
  const { data: cryptos, isError } = useQuery({
    queryKey: ['cryptos'],
    queryFn: () => getTopCryptos()
  });

  if (isError || !cryptos) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h1 className="text-3xl font-bold mb-2">Market Data Currently Unavailable</h1>
        <p className="text-gray-600">Please try again later</p>
      </div>
    );
  }

  const totalValue = calculateTotalPortfolioValue(mockPortfolio, cryptos);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Charts Section - Two charts side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="h-[400px]">
          <h2 className="text-lg font-semibold mb-2">Portfolio Allocation</h2>
          <PortfolioChart
            portfolio={mockPortfolio}
            cryptos={cryptos}
            type="coins"
          />
        </div>
        <div className="h-[400px]">
          <h2 className="text-lg font-semibold mb-2">Narrative Allocation</h2>
          <PortfolioChart
            portfolio={mockPortfolio}
            cryptos={cryptos}
            type="narratives"
          />
        </div>
      </div>

      {/* Portfolio Details Section */}
      <div className="grid grid-cols-1 gap-6">
        <div>
          <div className="mb-4">
            <div className="text-3xl font-bold text-gray-900">
              ${totalValue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Total Value</div>
          </div>
          
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
        </div>
      </div>
    </div>
  );
};