import { useEffect, useMemo, useState } from 'react';
import type { Product } from '../../types/common';
import { ProductCard } from '../../components/product-cell/product-card';

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const PAGE_SIZE = 20;
  const fetchProducts = async () => {
    const res = await fetch('https://dummyjson.com/products?limit=500&skip=5');
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return data.products as Product[];
  };
  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);
  const start = (currentPage - 1) * PAGE_SIZE;

  const visible = useMemo(() => {
    return products?.slice(start, start + PAGE_SIZE);
  }, [products, currentPage]);
  if (loading)
    return (
      <div className="min-h-screen flex justify-center">
        <p className="text-red-700 font-bold ">Loading...</p>
      </div>
    );
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">محصولات</h1>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visible?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-6 flex justify-center space-x-2">
        {/* ///The ! is the non-null assertion operator in TypeScript. */}
        <button
          className="bg-blue-500 p-2"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={start + PAGE_SIZE >= products!.length}
        >
          next
        </button>
        <span className="p-4 bg-amber-200">{currentPage}</span>

        <button
          className="bg-blue-500 p-2"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          prev
        </button>
      </div>
    </main>
  );
};

export default ProductsList;

// ////Bugs & Issues Found
// Bug 1: fetch runs on every render — it's called directly in the component body, not inside useEffect, causing an infinite loop.
// Bug 2: Wrong data access — the API returns { products: [...], total: 487 }, but the code maps over products.products instead of products.
// Bug 3: {p} rendered as object — <h3>{p}</h3> tries to render the whole product object. Should be p.name.
// Bug 4: Wrong price access — {p.price} is an object { amount, currency }, not a string. Should be p.price.amount.
// Bug 5: No loading or error state — UX issue, nothing shown while fetching or if it fails.
// Performance Issue: All 500 products rendered at once — should use pagination or virtual scrolling. Also images are full-res (~800KB each) with no lazy loading.
//2 performance improvements:
///Pagination (20 items per page) keeps the DOM small and render times fast regardless
// of how large the list grows.
///loading="lazy" on images defers off-screen loads,
// and a ?w=400 CDN query parameter requests a thumbnail instead
// of the full 800KB original — you'd tune this to match whatever
//  your CDN supports (Cloudinary, imgix, etc. all support
// similar query params).

// به‌صورت پیش‌فرض، مرورگر همهٔ تصاویر صفحه را بلافاصله بعد از باز شدن سایت دانلود می‌کند؛ حتی تصاویری که پایین صفحه هستند و هنوز دیده نمی‌شوند. این کار باعث می‌شود:

// * حجم دانلود اولیه زیاد شود
// * سرعت لود اولیه صفحه کاهش پیدا کند
// * مصرف اینترنت بیشتر شود
// * امتیاز Performance در ابزارهایی مثل Lighthouse پایین بیاید

// اما با `loading="lazy"`:

// * تصاویر خارج از viewport (بخش قابل مشاهدهٔ صفحه) فعلاً دانلود نمی‌شوند
// * هنگام اسکرول کاربر، تصاویر به‌تدریج لود می‌شوند
// * First Contentful Paint (FCP) و Largest Contentful Paint (LCP) معمولاً بهتر می‌شوند
// * مصرف منابع کاهش پیدا می‌کند

// تفاوت:

// بدون lazy loading:

// ```text
// Page Load → همه تصاویر دانلود می‌شوند
// ```

// با lazy loading:

// ```text
// Page Load → فقط تصاویر قابل مشاهده دانلود می‌شوند
// Scroll ↓ → تصاویر بعدی دانلود می‌شوند
// ```

// نکتهٔ مهم:
// برای تصاویر مهم بالای صفحه (hero image یا banner اصلی) معمولاً نباید از `loading="lazy"` استفاده کنید، چون ممکن است نمایش اولیه را کندتر کند. برای آن تصاویر بهتر است از:

// ```html
// loading="eager"
// ```

// یا اصلاً این attribute را نگذارید.
