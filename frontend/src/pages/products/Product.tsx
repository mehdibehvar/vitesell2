import React from 'react';
import Product from '../../components/product/product';

const sample = {
  title: 'فرش نمونه',
  imgUrl: '',
  price: '۱,۰۰۰,۰۰۰',
  currency: 'تومان',
  discount: '۱۰٪',
  finalPrice: '۹۰۰,۰۰۰',
  rating: 4,
};

const ProductPage: React.FC = () => {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">صفحه محصول</h1>
      <div className="mt-4">
        <Product data={sample as any} />
      </div>
    </main>
  );
};

export default ProductPage;
