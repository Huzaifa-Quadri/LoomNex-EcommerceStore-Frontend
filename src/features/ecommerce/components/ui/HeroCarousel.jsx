import { useState, useEffect, useCallback } from "react";

const SLOGANS = [
  "🔥 Limited Deal",
  "🎉 Best Offer",
  "✨ New Arrival",
  "⚡ Hot Pick",
  "💎 Premium Choice",
];

export default function HeroCarousel({ products = [] }) {
  const slides = products.slice(0, 5);
  const [index, setIndex] = useState(0);

  const slideCount = slides.length || 1;

  const showSlide = useCallback(
    (i) => setIndex(((i % slideCount) + slideCount) % slideCount),
    [slideCount]
  );

  // Auto-slide every 4s
  useEffect(() => {
    if (slideCount <= 1) return;
    const timer = setInterval(() => showSlide(index + 1), 4000);
    return () => clearInterval(timer);
  }, [index, slideCount, showSlide]);

  if (!slides.length) {
    // Fallback static hero
    return (
      <div className="relative w-full overflow-hidden">
        <div className="relative min-w-full">
          <img
            alt="Summer Collection"
            className="h-[500px] w-full object-cover"
            src="https://picsum.photos/1200/500?random=1"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-5xl font-bold">Summer Collection</h1>
            <p className="mt-4 text-lg">
              Explore the latest trends and styles for this season.
            </p>
            <button className="mt-8 rounded-full bg-primary px-8 py-3 text-lg font-bold hover:bg-red-700 transition-colors cursor-pointer">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((p, i) => (
          <div key={p.id || i} className="relative min-w-full">
            <img
              src={p.imageUrl || `https://picsum.photos/1200/500?random=${i}`}
              alt={p.name}
              className="h-[500px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
              <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-lg font-serif">
                {SLOGANS[i] || "🛒 Shop Now"}
              </h1>
              <p className="mt-3 text-lg font-light drop-shadow-md">
                {p.name}
              </p>
              <button className="mt-6 rounded-full bg-primary px-6 py-2 text-lg font-semibold hover:bg-red-700 transition-colors cursor-pointer">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={() => showSlide(index - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/70 hover:bg-white transition cursor-pointer"
        aria-label="Previous slide"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button
        onClick={() => showSlide(index + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/70 hover:bg-white transition cursor-pointer"
        aria-label="Next slide"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => showSlide(i)}
            className={`h-3 w-3 rounded-full transition cursor-pointer ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
