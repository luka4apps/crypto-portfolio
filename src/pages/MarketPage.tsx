import React from 'react';
import { CryptoList } from '../components/CryptoList';

export const MarketPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Market Overview</h1>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <CryptoList />
        </div>
      </div>
    </div>
  );
};