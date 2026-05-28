/**
 * Centralized route paths to avoid magic strings and ensure consistency
 * Use these constants throughout the app for navigation
 */

export const ROUTE_PATHS = {
  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',

  // Main routes
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  PROFILE: '/profile',
  // Product routes
  PRODUCTS: '/products',
  PRODUCTS_LIST: '/products',
  PRODUCTS_SCROLL: '/products/pscroll',
  PRODUCT_DETAIL: '/products/:id',

  // Other routes
  SHIPPING: '/products/shipping',
  CHALLENGES: '/challenges',
  CHALLENGES_TEST: '/challenges/test',

} as const;

/**
 * Helper function to generate dynamic routes with parameters
 */
export const generateRoute = (
  path: string,
  params?: Record<string, string | number>,
) => {
  if (!params) return path;
  return Object.entries(params).reduce((route, [key, value]) => {
    return route.replace(`:${key}`, String(value));
  }, path);
};

// generateRoute(
//   "/products/:id/:slug",
//   {
//     id: 5,
//     slug: "iphone"
//   }
// ); // "/products/5/iphone"