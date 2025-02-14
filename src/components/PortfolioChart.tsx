import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { CryptoAsset, PortfolioHolding } from '../types/crypto';
import { calculateHoldingPercentage, calculateTotalPortfolioValue } from '../utils/portfolio';
import { Narrative, getNarrativeFromCategories } from '../utils/narrativeMapping';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PortfolioChartProps {
  portfolio: PortfolioHolding[];
  cryptos?: CryptoAsset[];
  type: 'coins' | 'narratives';
}

export const PortfolioChart: React.FC<PortfolioChartProps> = ({ portfolio, cryptos, type }) => {
  const totalValue = calculateTotalPortfolioValue(portfolio, cryptos);

  const getNarrativeData = () => {
    const narrativeValues: { [key in Narrative]: number } = {
      'Layer 0/1': 0,
      'DeFi': 0,
      'Gaming': 0,
      'Meme': 0,
      'AI': 0,
      'Infrastructure': 0,
      'Other': 0
    };
    
    portfolio.forEach(holding => {
      const crypto = cryptos?.find(c => c.id === holding.id);
      const holdingValue = calculateHoldingPercentage(holding, totalValue, crypto);
      
      if (crypto?.categories) {
        const narratives = getNarrativeFromCategories(crypto.categories);
        // Split value equally among all narratives for the coin
        const valuePerNarrative = holdingValue / narratives.length;
        narratives.forEach(narrative => {
          narrativeValues[narrative] += valuePerNarrative;
        });
      } else {
        narrativeValues['Other'] += holdingValue;
      }
    });

    // Filter out narratives with 0 value
    const filteredNarratives = Object.entries(narrativeValues)
      .filter(([_, value]) => value > 0);

    return {
      labels: filteredNarratives.map(([narrative]) => narrative),
      values: filteredNarratives.map(([_, value]) => value)
    };
  };

  const getChartData = () => {
    if (type === 'narratives') {
      const narrativeData = getNarrativeData();
      return {
        labels: narrativeData.labels,
        datasets: [{
          data: narrativeData.values,
          backgroundColor: getBackgroundColors(narrativeData.labels.length),
          borderColor: getBorderColors(narrativeData.labels.length),
          borderWidth: 1,
        }]
      };
    }

    // Default coin allocation chart
    return {
      labels: portfolio.map(holding => {
        const crypto = cryptos?.find(c => c.id === holding.id);
        return crypto?.name || holding.symbol.toUpperCase();
      }),
      datasets: [{
        data: portfolio.map(holding => {
          const crypto = cryptos?.find(c => c.id === holding.id);
          return calculateHoldingPercentage(holding, totalValue, crypto);
        }),
        backgroundColor: getBackgroundColors(portfolio.length),
        borderColor: getBorderColors(portfolio.length),
        borderWidth: 1,
      }]
    };
  };

  const getBackgroundColors = (count: number) => {
    const colors = [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)',
      'rgba(255, 159, 64, 0.8)',
      'rgba(199, 199, 199, 0.8)',
      'rgba(83, 102, 255, 0.8)',
      'rgba(255, 99, 255, 0.8)',
      'rgba(99, 255, 132, 0.8)',
    ];

    // Repeat colors if we need more than we have
    return Array(count).fill(0).map((_, i) => colors[i % colors.length]);
  };

  const getBorderColors = (count: number) => {
    const colors = [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(199, 199, 199, 1)',
      'rgba(83, 102, 255, 1)',
      'rgba(255, 99, 255, 1)',
      'rgba(99, 255, 132, 1)',
    ];

    return Array(count).fill(0).map((_, i) => colors[i % colors.length]);
  };

  const options = {
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return `${context.label}: ${value.toFixed(1)}%`;
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="h-full">
      <Pie data={getChartData()} options={options} />
    </div>
  );
};