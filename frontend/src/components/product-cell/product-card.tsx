import { memo } from 'react';
import type { Product } from '../../types/common';

// ✅ memo() prevents re-rendering cards whose props haven't changed
export const ProductCard = memo(({ product }: { product: Product }) => (
  <div className="bg-white rounded-lg shadow-md p-4">
    <img
      src={product.thumbnail}
      alt={product.title}
      loading="lazy"
      className="w-full h-48 object-cover rounded-md"
    />
    <h2 className="mt-2 text-lg font-medium">{product.title}</h2>
    <p className="mt-1 text-gray-600">{product.description}</p>
    <p className="mt-2 text-green-600 font-bold">${product.price}</p>
    <span className="mt-2 text-sm text-gray-500">Rating: {product.rating}</span>
  </div>
));