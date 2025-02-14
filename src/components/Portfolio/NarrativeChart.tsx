import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { NarrativeAllocation } from '../../types/crypto';

ChartJS.register(ArcElement, Tooltip, Legend);

interface NarrativeChartProps {
  allocations: NarrativeAllocation[];
}

const NARRATIVE_COLORS: { [key: string]: { background: string; border: string } } = {
  'Layer 0/1': { background: 'rgba(255, 99, 132, 0.8)', border: 'rgba(255, 99, 132, 1)' },
  'DeFi': { background: 'rgba(54, 162, 235, 0.8)', border: 'rgba(54, 162, 235, 1)' },
  'Gaming': { background: 'rgba(255, 206, 86, 0.8)', border: 'rgba(255, 206, 86, 1)' },
  'Meme': { background: 'rgba(75, 192, 192, 0.8)', border: 'rgba(75, 192, 192, 1)' },
  'AI': { background: 'rgba(153, 102, 255, 0.8)', border: 'rgba(153, 102, 255, 1)' },
  'Infrastructure': { background: 'rgba(255, 159, 64, 0.8)', border: 'rgba(255, 159, 64, 1)' },
  'Other': { background: 'rgba(199, 199, 199, 0.8)', border: 'rgba(199, 199, 199, 1)' }
};

export const NarrativeChart: React.FC<NarrativeChartProps> = ({ allocations }) => {
  const chartData = {
    labels: allocations.map(a => a.narrative),
    datasets: [
      {
        data: allocations.map(a => a.percentage),
        backgroundColor: allocations.map(a => 
          NARRATIVE_COLORS[a.narrative]?.background || NARRATIVE_COLORS['Other'].background
        ),
        borderColor: allocations.map(a => 
          NARRATIVE_COLORS[a.narrative]?.border || NARRATIVE_COLORS['Other'].border
        ),
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
            const allocation = allocations[context.dataIndex];
            return [
              `${value.toFixed(2)}%`,
              `$${allocation.value.toLocaleString()}`
            ];
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-full">
      <h3 className="text-lg font-medium mb-4 text-center">Narrative Distribution</h3>
      <Pie data={chartData} options={options} />
    </div>
  );
};