import { useEffect, useRef, useState } from 'react';
import { FixedSizeGrid, GridChildComponentProps } from 'react-window';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
}

const COLUMN_COUNT = 4;
const CARD_HEIGHT = 400;

const Cell =
  (products: Product[], columnWidth: number) =>
  ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
    const product = products[rowIndex * COLUMN_COUNT + columnIndex];
    if (!product) return <div style={style} />;
    return (
      <div style={{ ...style, padding: '8px' }}>
        <div className="bg-white rounded-lg shadow-md p-4 h-full">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="w-full h-48 object-cover rounded-md"
          />
          <h2 className="mt-2 text-lg font-medium">{product.title}</h2>
          <p className="mt-1 text-gray-600 text-sm line-clamp-2">{product.description}</p>
          <p className="mt-2 text-green-600 font-bold">${product.price}</p>
          <span className="mt-2 text-sm text-gray-500">Rating: {product.rating}</span>
        </div>
      </div>
    );
  };

function ProductListScroll() {
  const [products, setProducts]   = useState<Product[]>([]);
  const [loading, setLoading]     = useState<boolean>(true);
  const [error, setError]         = useState<string | null>(null);
  const [width, setWidth]         = useState<number>(window.innerWidth); // ✅ real initial width
  const containerRef              = useRef<HTMLDivElement>(null);

  // ✅ ResizeObserver on a div that is ALWAYS mounted — not behind the loading guard
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []); // ✅ runs once, after the div mounts

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=500&skip=5')
      .then((res) => {
        if (!res.ok) throw new Error('Failed');
        return res.json();
      })
      .then((data) => setProducts(data.products))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const columnWidth = Math.floor(width / COLUMN_COUNT); // ✅ cards fill full width evenly
  const rowCount    = Math.ceil(products.length / COLUMN_COUNT);

  // ✅ containerRef div is ALWAYS rendered — loading/error shown inside it
  return (
    <div ref={containerRef} className="w-full">
      {loading && <p>Loading…</p>}
      {error   && <p>Error: {error}</p>}
      {!loading && !error && (
        <FixedSizeGrid
          columnCount={COLUMN_COUNT}
          columnWidth={columnWidth}        // ✅ dynamic column width
          rowCount={rowCount}
          rowHeight={CARD_HEIGHT}
          height={900}
          width={width}                    // ✅ dynamic container width
         >
          {Cell(products, columnWidth)}
        </FixedSizeGrid>
      )}
    </div>  
  );
}

export default ProductListScroll;