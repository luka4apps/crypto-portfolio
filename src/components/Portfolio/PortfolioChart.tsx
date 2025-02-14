import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { CryptoAsset, PortfolioHolding } from '../../types/crypto';
import { calculateHoldingPercentage, calculateTotalPortfolioValue } from '../../utils/portfolio';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PortfolioChartProps {
  portfolio: PortfolioHolding[];
  cryptos?: CryptoAsset[];
}

export const PortfolioChart: React.FC<PortfolioChartProps> = ({ portfolio, cryptos }) => {
  const totalValue = calculateTotalPortfolioValue(portfolio, cryptos);

  const chartData = {
    labels: portfolio.map(holding => {
      const crypto = cryptos?.find(c => c.id === holding.id);
      return crypto?.name || holding.symbol.toUpperCase();
    }),
    datasets: [
      {
        data: portfolio.map(holding => {
          const crypto = cryptos?.find(c => c.id === holding.id);
          return calculateHoldingPercentage(holding, totalValue, crypto);
        }),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(199, 199, 199, 0.8)',
          'rgba(83, 102, 255, 0.8)',
          'rgba(255, 99, 255, 0.8)',
          'rgba(54, 162, 99, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
          'rgba(83, 102, 255, 1)',
          'rgba(255, 99, 255, 1)',
          'rgba(54, 162, 99, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right' as const,
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return `${value.toFixed(2)}%`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Pie data={chartData} options={options} />;
};