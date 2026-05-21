import React from 'react';
import { Outlet } from 'react-router';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-primary">ویتسل</div>
          <ul className="flex gap-6 text-sm">
            <li>
              <a href="/" className="hover:text-primary">
                خانه
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-primary">
                محصولات
              </a>
            </li>
                        <li>
              <a href="/products/pscroll" className="hover:text-primary">
                محصولات (اسکرول)
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-primary">
                درباره ما
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-primary">
                تماس
              </a>
            </li>
            <li>
              <a href="/shipping" className="hover:text-primary">
                ارسال
              </a>
            </li>
            <li>
              <a href="/profile" className="hover:text-primary">
                پروفایل
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-sm text-gray-600">
          <p>&copy; 2024 ویتسل. تمام حقوق محفوظ است.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
