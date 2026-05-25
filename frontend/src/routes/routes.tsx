import { lazy, Suspense } from 'react';
import { type RouteObject } from 'react-router';
import MainLayout from '../layouts/MainLayout.tsx';
import AuthLayout from '../layouts/AuthLayout.tsx';

// Lazy load pages for code splitting and better performance
const App = lazy(() => import('../App.tsx'));
const About = lazy(() => import('../pages/About.tsx'));
const Login = lazy(() => import('../pages/auth/Login.tsx'));
const Register = lazy(() => import('../pages/auth/register.tsx'));
const ProductsList = lazy(() => import('../pages/Products.tsx'));
const ProductPage = lazy(() => import('../pages/Product.tsx'));
const Shipping = lazy(() => import('../pages/Shipping.tsx'));
const ProductListScroll = lazy(() => import('../pages/Products-scroll.tsx'));
const TestPage = lazy(() => import('../pages/challenges/test.tsx'));

/**
 * Loading fallback component while lazy-loaded pages load
 */
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
  </div>
);

/**
 * Wrapper component for lazy-loaded pages with Suspense
 */
const LazyPage = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

/**
 * Auth routes configuration
 */
const authRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: (
          <LazyPage>
            <Login />
          </LazyPage>
        ),
      },
      {
        path: 'register',
        element: (
          <LazyPage>
            <Register />
          </LazyPage>
        ),
      },
    ],
  },
];

/**
 * Product routes configuration
 */
const productRoutes: RouteObject[] = [
  {
    path: 'products',
    children: [
      {
        index: true,
        element: (
          <LazyPage>
            <ProductsList />
          </LazyPage>
        ),
      },
      {
        path: 'pscroll',
        element: (
          <LazyPage>
            <ProductListScroll />
          </LazyPage>
        ),
      },
      {
        path: ':id',
        element: (
          <LazyPage>
            <ProductPage />
          </LazyPage>
        ),
      },
      {
        path: 'shipping',
        element: (
          <LazyPage>
            <Shipping />
          </LazyPage>
        ),
      },
    ],
  },
];

/**
 * Challenges routes configuration
 */
const challengeRoutes: RouteObject[] = [
  {
    path: 'challenges',
    children: [
      {
        path: 'test',
        element: (
          <LazyPage>
            <TestPage />
          </LazyPage>
        ),
      },
    ],
  },
];

/**
 * Main app routes configuration
 */
const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <LazyPage>
        <App />
      </LazyPage>
    ),
  },
  {
    path: 'about',
    element: (
      <LazyPage>
        <About />
      </LazyPage>
    ),
  },
  ...productRoutes,
  ...challengeRoutes,
];

/**
 * Main routes configuration with layouts
 * This is the complete route tree for the application
 */
export const routes: RouteObject[] = [
  // Auth routes with AuthLayout
  ...authRoutes,
  // Main app routes with MainLayout
  {
    element: <MainLayout />,
    children: appRoutes,
  },
];
