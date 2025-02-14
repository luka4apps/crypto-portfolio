import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTopCryptos } from '../services/api';
import { CryptoAsset } from '../types/crypto';

export const CryptoList: React.FC = () => {
  const { data: cryptos, isLoading, error } = useQuery({
    queryKey: ['cryptos'],
    queryFn: fetchTopCryptos
  });

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-4">Error loading crypto data</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">24h Change</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {cryptos?.map((crypto: CryptoAsset) => (
            <tr key={crypto.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img src={crypto.image} alt={crypto.name} className="w-6 h-6 mr-2" />
                  <div>
                    <div className="font-medium">{crypto.name}</div>
                    <div className="text-sm text-gray-500">{crypto.symbol.toUpperCase()}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-right whitespace-nowrap">
                ${crypto.current_price.toLocaleString()}
              </td>
              <td className={`px-6 py-4 text-right whitespace-nowrap ${
                crypto.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};