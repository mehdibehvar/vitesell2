import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import About from './pages/About.tsx';
import AuthLayout from './layouts/AuthLayout.tsx';
import Login from './pages/auth/Login.tsx';
import Register from './pages/auth/register.tsx';
import  ProductsList from './pages/Products.tsx';
import ProductPage from './pages/Product.tsx';
import Shipping from './pages/Shipping.tsx';
import MainLayout from './layouts/MainLayout.tsx';
import ProductListScroll from './pages/Products-scroll.tsx';
import TestPage from './pages/challenges/test.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route  path="/" element={<App />} />
          <Route path="about" element={<About />} />
          <Route path="products">
            <Route index element={<ProductsList />} />
            <Route path="pscroll" element={<ProductListScroll />} />
            <Route path=":id" element={<ProductPage />} />
            <Route path="shipping" element={<Shipping />} />
          </Route>
          <Route path="challenges">
            <Route path="test" element={<TestPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
