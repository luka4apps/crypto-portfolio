import React from 'react';
import { Portfolio } from '../components/Portfolio';

export const PortfolioPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Portfolio Overview</h1>
      <Portfolio />
    </div>
  );
};