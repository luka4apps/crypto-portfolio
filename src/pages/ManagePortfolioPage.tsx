import React, { useState, Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { fetchTopCryptos } from '../services/api';
import { mockPortfolio } from '../data/mockPortfolio';
import { PortfolioHolding } from '../types/crypto';

export const ManagePortfolioPage: React.FC = () => {
  const [holdings, setHoldings] = useState<PortfolioHolding[]>(mockPortfolio);
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [query, setQuery] = useState('');
  const [amount, setAmount] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');

  const { data: cryptos } = useQuery({
    queryKey: ['cryptos'],
    queryFn: fetchTopCryptos
  });

  const filteredCryptos = query === ''
    ? cryptos
    : cryptos?.filter((crypto) => {
        const searchTerm = query.toLowerCase();
        return (
          crypto.name.toLowerCase().includes(searchTerm) ||
          crypto.symbol.toLowerCase().includes(searchTerm)
        );
      });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCrypto || !amount || !purchasePrice) return;

    const crypto = cryptos?.find(c => c.id === selectedCrypto);
    if (!crypto) return;

    const newHolding: PortfolioHolding = {
      id: selectedCrypto,
      symbol: crypto.symbol,
      amount: parseFloat(amount),
      purchasePrice: parseFloat(purchasePrice)
    };

    setHoldings(prev => [...prev, newHolding]);
    setSelectedCrypto('');
    setAmount('');
    setPurchasePrice('');
    setQuery('');
  };

  const handleRemove = (id: string) => {
    setHoldings(prev => prev.filter(holding => holding.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Manage Portfolio</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Add New Holding</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cryptocurrency
              </label>
              <Combobox value={selectedCrypto} onChange={setSelectedCrypto}>
                <div className="relative mt-1">
                  <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border border-gray-300 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                    <Combobox.Input
                      className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                      displayValue={(cryptoId: string) => 
                        cryptos?.find(c => c.id === cryptoId)?.name || ''
                      }
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search cryptocurrencies..."
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                  >
                    <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredCryptos?.length === 0 && query !== '' ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                          Nothing found.
                        </div>
                      ) : (
                        filteredCryptos?.map((crypto) => (
                          <Combobox.Option
                            key={crypto.id}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                              }`
                            }
                            value={crypto.id}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  <img src={crypto.image} alt={crypto.name} className="w-6 h-6 mr-2" />
                                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                    {crypto.name} ({crypto.symbol.toUpperCase()})
                                  </span>
                                </div>
                                {selected ? (
                                  <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                      active ? 'text-white' : 'text-indigo-600'
                                    }`}
                                  >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="block w-full rounded-lg border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  placeholder="Enter amount"
                  step="any"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purchase Price (USD)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  className="block w-full rounded-lg border-gray-300 bg-white py-2 pl-7 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  placeholder="0.00"
                  step="any"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to Portfolio
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Current Holdings</h2>
          <div className="space-y-4">
            {holdings.map((holding) => {
              const crypto = cryptos?.find(c => c.id === holding.id);
              return (
                <div key={holding.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{crypto?.name}</div>
                    <div className="text-sm text-gray-500">
                      {holding.amount} {holding.symbol.toUpperCase()}
                    </div>
                    <div className="text-sm text-gray-500">
                      Purchase Price: ${holding.purchasePrice}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(holding.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};