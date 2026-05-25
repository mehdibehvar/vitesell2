import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router';
import { useRoutes } from 'react-router';
import { routes } from './routes/index.ts';

/**
 * Root app component that sets up routing
 * Separated from main.tsx for better organization
 */
function AppRouter() {
  const element = useRoutes(routes);
  return element;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </StrictMode>,
);
