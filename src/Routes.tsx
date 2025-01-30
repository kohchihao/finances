import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { InvestmentCalculator } from './pages/InvestmentCalculator';

const MyFinanceRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InvestmentCalculator />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyFinanceRoutes;
