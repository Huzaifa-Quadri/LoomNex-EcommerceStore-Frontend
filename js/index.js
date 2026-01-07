const BASE_URL = "http://localhost:8086"; // change if deployed

// Fetch all products
async function fetchProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products/getallproducts`);
    const products = await res.json();

    console.log(products);

    renderTrending(products);
    renderCategories(products);
    renderAllProducts(products);
  } catch (err) {
    console.error("Error fetching products:", err);
  }
}

// Render Trending Section (first 4 products)
function renderTrending(products) {
  const container = document.getElementById("trending-products");
  container.innerHTML = "";
  products.slice(0, 4).forEach((p) => {
    container.insertAdjacentHTML("beforeend", productCard(p));
  });
  attachCartListeners();
}

// Render Categories (unique categories from products)
function renderCategories(products) {
  const container = document.getElementById("categories");
  container.innerHTML = "";
  const categories = [...new Set(products.map((p) => p.category))];

  categories.forEach((cat) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
      <a href="${cat.toLowerCase()}.html" class="group block">
        <div class="overflow-hidden rounded-lg">
          <img src="https://picsum.photos/400/300?random=${cat.length}" 
            alt="${cat}" 
            class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"/>
        </div>
        <h3 class="mt-4 text-lg font-semibold text-stone-800">${cat}</h3>
      </a>
      `
    );
  });
}

// Render All Products
function renderAllProducts(products) {
  const container = document.getElementById("all-products");
  container.innerHTML = "";
  products.forEach((p) => {
    container.insertAdjacentHTML("beforeend", productCard(p));
  });
  attachCartListeners();
}

// Product Card Template
function productCard(p) {
  return `
    <div class="group overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div class="relative">
        <img src="${p.imageUrl || "https://picsum.photos/300/200"}" 
             alt="${p.name}" class="h-64 w-full object-cover"/>
      </div>
      <div class="p-4">
        <h3 class="text-lg font-semibold text-stone-800">${p.name}</h3>
        <div class="mt-2 flex items-center justify-between">
          <p class="text-xl font-bold text-stone-900">₹${p.price}</p>
          <div class="flex items-center gap-1">
            <span class="material-symbols-outlined text-amber-400">star</span>
            <span class="text-sm text-stone-600">${p.rating || "4.5"}</span>
          </div>
        </div>
        <button class="add-to-cart-btn mt-4 w-full rounded-full bg-stone-800 px-4 py-2 text-white hover:bg-stone-900 transition-colors"
                data-id="${p.id}" 
                data-name="${p.name}" 
                data-price="${p.price}" 
                data-image="${p.imageUrl || "https://picsum.photos/300/200"}">
          Add to Cart
        </button>
      </div>
    </div>
  `;
}

// Add event listeners for add to cart buttons
function attachCartListeners() {
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = this.dataset.id;
      const name = this.dataset.name;
      const price = this.dataset.price;
      const image = this.dataset.image;
      console.log('Button clicked with data:', { id, name, price, image });
      // Call the global addToCart function from cart.js
      if (window.addToCart) {
        window.addToCart(id, name, price, image);
      } else {
        console.error('window.addToCart not found!');
      }
    });
  });
}

// Cart integration - Local addToCart function removed
// The global window.addToCart from cart.js will handle all cart operations

// Run
fetchProducts();

// ✅ Hero Carousel Slides
function renderCarousel(products) {
  const carousel = document.getElementById("carousel");
  const dots = document.getElementById("dots");

  const slogans = [
    "🔥 Limited Deal",
    "🎉 Best Offer",
    "✨ New Arrival",
    "⚡ Hot Pick",
    "💎 Premium Choice",
  ];

  let slidesHTML = "";
  let dotsHTML = "";

  products.slice(0, 5).forEach((p, i) => {
    slidesHTML += `
      <div class="relative min-w-full">
        <img src="${p.imageUrl || "https://picsum.photos/1200/500"}"
             alt="${p.name}" class="h-[500px] w-full object-cover"/>
        <div class="absolute inset-0 bg-black/40"></div>
        <div class="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 class="text-5xl font-extrabold tracking-wide font-serif drop-shadow-lg">
            ${slogans[i]}
          </h1>
          <p class="mt-3 text-lg font-light drop-shadow-md">${p.name}</p>
          <button class="mt-6 rounded-full bg-[var(--primary-color)] px-6 py-2 text-lg font-semibold hover:bg-red-700">
            Shop Now
          </button>
        </div>
      </div>`;
    dotsHTML += `<div class="h-3 w-3 rounded-full bg-white/50 ${
      i === 0 ? "bg-white" : ""
    }" data-index="${i}"></div>`;
  });

  carousel.innerHTML = slidesHTML;
  dots.innerHTML = dotsHTML;

  initCarousel(products.slice(0, 5).length);
}

// ✅ Initialize Carousel Logic
function initCarousel(slideCount) {
  const carousel = document.getElementById("carousel");
  const dots = document.querySelectorAll("#dots div");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  let index = 0;

  function showSlide(i) {
    carousel.style.transform = `translateX(-${i * 100}%)`;
    dots.forEach((d, idx) => {
      d.classList.toggle("bg-white", idx === i);
      d.classList.toggle("bg-white/50", idx !== i);
    });
    index = i;
  }

  prev.addEventListener("click", () =>
    showSlide((index - 1 + slideCount) % slideCount)
  );
  next.addEventListener("click", () => showSlide((index + 1) % slideCount));
  dots.forEach((d, i) => d.addEventListener("click", () => showSlide(i)));

  // Auto Slide every 4s
  setInterval(() => {
    showSlide((index + 1) % slideCount);
  }, 4000);
}

// 👉 Add inside fetchProducts after renderTrending:
renderCarousel(products);

// Cart integration comments:
// The cart.js file will override the addToCart function above when it loads
// This ensures consistent cart functionality across all pages
// The cart.js file handles:
// - localStorage persistence
// - Cart counter updates
// - Toast notifications
// - Cart rendering on cart page
