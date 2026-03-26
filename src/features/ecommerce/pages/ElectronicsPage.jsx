import { useState, useMemo } from "react";
import { useProductsByCategory } from "../hooks/useProducts";
import ProductCard from "../components/ui/ProductCard";
import SkeletonCard from "../components/ui/SkeletonCard";

// ---- sorting ----
function sortProducts(list, mode) {
  const items = [...list];
  if (mode === "low-high") items.sort((a, b) => a.price - b.price);
  if (mode === "high-low") items.sort((a, b) => b.price - a.price);
  if (mode === "newest") {
    items.sort(
      (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );
  }
  return items;
}

export default function ElectronicsPage() {
  const { products: electronics, loading: loadingE, error: errorE } = useProductsByCategory("Electronics");
  const { products: gadgets, loading: loadingG, error: errorG } = useProductsByCategory("Gadgets");

  const [sortBy, setSortBy] = useState("popular");

  const sortedElectronics = useMemo(() => sortProducts(electronics, sortBy), [electronics, sortBy]);
  const sortedGadgets = useMemo(() => sortProducts(gadgets, sortBy), [gadgets, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <h1 className="text-4xl font-bold text-gray-900">Electronics</h1>
      <p className="mt-2 text-lg text-gray-600">
        Explore the latest in tech, from personal audio to smart displays.
      </p>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6 mb-4">
        <h2 className="text-xl font-bold text-gray-900">All Electronics</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700" htmlFor="sort-by">
            Sort by:
          </label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-full border-gray-300 text-sm focus:border-primary focus:ring-primary px-3 py-1.5 border cursor-pointer"
          >
            <option value="popular">Most Popular</option>
            <option value="newest">Newest</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Electronics Grid */}
      {errorE && <p className="text-red-500 mb-4">Failed to load Electronics.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loadingE
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : sortedElectronics.length > 0
          ? sortedElectronics.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))
          : !errorE && (
              <p className="col-span-full text-center py-10 text-gray-500 text-lg">
                No electronics found.
              </p>
            )}
      </div>

      {/* Gadgets Section */}
      <div className="flex items-center justify-between mt-10 mb-4">
        <h2 className="text-xl font-bold text-gray-900">Gadgets</h2>
      </div>

      {errorG && <p className="text-red-500 mb-4">Failed to load Gadgets.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {loadingG
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : sortedGadgets.length > 0
          ? sortedGadgets.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))
          : !errorG && (
              <p className="col-span-full text-center py-10 text-gray-500 text-lg">
                No gadgets found.
              </p>
            )}
      </div>
    </div>
  );
}
