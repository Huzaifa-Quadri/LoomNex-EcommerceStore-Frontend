import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import HeroCarousel from "../components/ui/HeroCarousel";
import ProductCard from "../components/ui/ProductCard";
import SkeletonCard from "../components/ui/SkeletonCard";

export default function HomePage() {
  const { products, loading, error } = useProducts();

  // Derive unique categories
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  // Category → route map
  const categoryRoutes = {
    electronics: "/electronics",
    clothing: "/clothing",
  };

  return (
    <div className="py-0">
      {/* ✅ Hero Carousel */}
      <HeroCarousel products={products} />

      <div className="container mx-auto mt-12 px-4 sm:px-6 lg:px-8">
        {/* ✅ New Trending */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-stone-800">
            New Trending
          </h2>

          {error && (
            <p className="text-red-500">Failed to load products: {error}</p>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : products
                  .slice(0, 4)
                  .map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* ✅ Shop by Category */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-stone-800">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((cat) => {
              const route =
                categoryRoutes[cat.toLowerCase()] ||
                `/${cat.toLowerCase()}`;
              return (
                <Link key={cat} to={route} className="group block">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={`https://picsum.photos/400/300?random=${cat.length}`}
                      alt={cat}
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-stone-800">
                    {cat}
                  </h3>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ✅ Trending Products (all) */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-stone-800">
            Trending Products
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
