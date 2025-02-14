import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { PortfolioPage } from './pages/PortfolioPage';
import { MarketPage } from './pages/MarketPage';
import { ManagePortfolioPage } from './pages/ManagePortfolioPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<PortfolioPage />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/manage" element={<ManagePortfolioPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;