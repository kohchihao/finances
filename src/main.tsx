import { MantineProvider } from '@mantine/core';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
// core styles are required for all packages
import '@mantine/core/styles.css';
import { InvestmentCalculator } from './pages/InvestmentCalculator';

const router = createBrowserRouter([
  {
    path: '/',
    element: <InvestmentCalculator />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>
);
