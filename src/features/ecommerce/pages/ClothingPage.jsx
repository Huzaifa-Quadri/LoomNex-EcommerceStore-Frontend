import { useState, useMemo } from "react";
import { useProductsByCategory } from "../hooks/useProducts";
import ProductCard from "../components/ui/ProductCard";
import SkeletonCard from "../components/ui/SkeletonCard";

const getRating = (p) => Number(p.rating || p.avgRating || 0);
const getCreatedAt = (p) => new Date(p.createdAt || p.created_at || 0).getTime();

const SORT_TABS = ["Relevance", "Price", "Rating", "Newest"];

export default function ClothingPage() {
  const { products: rawProducts, loading, error } = useProductsByCategory("Clothing");

  const [maxPrice, setMaxPrice] = useState(200);
  const [activeSort, setActiveSort] = useState(0);

  const originalOrder = useMemo(
    () => new Map(rawProducts.map((p, i) => [p.id, i])),
    [rawProducts]
  );

  const filtered = useMemo(() => {
    let items = rawProducts.filter((p) => Number(p.price) <= maxPrice);

    const sortKey = SORT_TABS[activeSort].toLowerCase();
    if (sortKey === "price") {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortKey === "rating") {
      items = [...items].sort((a, b) => getRating(b) - getRating(a));
    } else if (sortKey === "newest") {
      items = [...items].sort((a, b) => getCreatedAt(b) - getCreatedAt(a));
    } else {
      items = [...items].sort(
        (a, b) => (originalOrder.get(a.id) ?? 0) - (originalOrder.get(b.id) ?? 0)
      );
    }

    return items;
  }, [rawProducts, maxPrice, activeSort, originalOrder]);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
        {/* Sidebar Filters */}
        <aside className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Price</h3>
            <input
              type="range"
              min={0}
              max={200}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-primary mt-2"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>$0</span>
              <span>${maxPrice}</span>
            </div>
          </div>
        </aside>

        {/* Product Listing */}
        <div className="flex flex-col">
          <div className="flex flex-wrap justify-between items-baseline gap-4 pb-6">
            <h1 className="text-4xl font-extrabold text-gray-900">Clothing</h1>

            <div className="flex border-b border-gray-200">
              {SORT_TABS.map((label, i) => (
                <button
                  key={label}
                  onClick={() => setActiveSort(i)}
                  className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                    i === activeSort
                      ? "font-semibold border-b-2 border-primary text-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-red-500 mb-4">Failed to load products.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : filtered.length > 0
              ? filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))
              : !error && (
                  <p className="col-span-full text-center text-gray-500">
                    No products found.
                  </p>
                )}
          </div>
        </div>
      </div>
    </div>
  );
}
