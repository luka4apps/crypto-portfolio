import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTopCryptos } from '../../services/api';
import { PortfolioChart } from './PortfolioChart';
import { NarrativeChart } from './NarrativeChart';
import { PortfolioSummary } from './PortfolioSummary';
import { PortfolioHoldingsList } from './PortfolioHoldingsList';
import { mockPortfolio } from '../../data/mockPortfolio';
import { calculateNarrativeAllocations } from '../../utils/portfolio';

export const Portfolio: React.FC = () => {
  const { data: cryptos } = useQuery({
    queryKey: ['cryptos'],
    queryFn: fetchTopCryptos
  });

  const narrativeAllocations = calculateNarrativeAllocations(mockPortfolio, cryptos);

  return (
    <div className="space-y-6">
      {/* Charts Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col items-center">
          <PortfolioSummary cryptos={cryptos} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="h-96">
              <h3 className="text-lg font-medium mb-4 text-center">Asset Distribution</h3>
              <PortfolioChart
                portfolio={mockPortfolio}
                cryptos={cryptos}
              />
            </div>
            <div className="h-96">
              <NarrativeChart allocations={narrativeAllocations} />
            </div>
          </div>
        </div>
      </div>

      {/* Holdings List Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Holdings</h2>
        <PortfolioHoldingsList cryptos={cryptos} />
      </div>
    </div>
  );
};