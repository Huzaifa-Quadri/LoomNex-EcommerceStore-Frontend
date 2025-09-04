// const productGrid = document.getElementById("productGrid");
// const priceRange = document.getElementById("priceRange");
// const priceValue = document.getElementById("priceValue");

// priceRange.addEventListener("input", () => {
//   priceValue.textContent = `$${priceRange.value}`;
//   loadProducts();
// });

// async function loadProducts() {
//   try {
//     const res = await fetch("http://localhost:8086/products/category/Clothing");
//     const products = await res.json();
//     renderProducts(products);
//     console.log(products);  //Data is coming fine
//   } catch (err) {
//     console.error("Error loading products:", err);
//     productGrid.innerHTML =
//       "<p class='text-gray-500'>Failed to load products.</p>";
//   }
// }

// function renderProducts(products) {
//   const maxPrice = parseFloat(priceRange.value);
//   productGrid.innerHTML = "";

//   let filtered = products.filter((p) => p.price <= maxPrice);

//   if (filtered.length === 0) {
//     productGrid.innerHTML =
//       "<p class='col-span-full text-center text-gray-500'>No products found.</p>";
//     return;
//   }

//   filtered.forEach((p) => {
//     productGrid.innerHTML += `
//             <div class="group relative flex flex-col rounded-lg overflow-hidden shadow hover:shadow-lg bg-white transition-transform hover:scale-105">
//               <div class="aspect-[3/4] overflow-hidden">
//                 <img src="${p.image_url}" alt="${
//       p.name
//     }" class="h-full w-full object-cover group-hover:opacity-80 transition"/>
//               </div>
//               <div class="p-4 flex flex-col flex-grow">
//                 <h3 class="text-sm font-medium text-gray-800">${p.name}</h3>
//                 <p class="text-sm text-gray-500">${p.description || ""}</p>
//                 <p class="mt-2 font-semibold text-gray-900">$${p.price}</p>
//               </div>
//               <button class="absolute bottom-3 left-1/2 transform -translate-x-1/2 rounded-full bg-[var(--primary-color)] px-5 py-2 text-sm text-white opacity-0 group-hover:opacity-100 transition">Add to Cart</button>
//             </div>`;
//   });
// }

// loadProducts();

//* New Working clothing.js

// const apiUrl = "http://localhost:8086/products/category/Clothing";
// const productGrid = document.getElementById("productGrid");
// const priceRange = document.getElementById("priceRange");
// const priceValue = document.getElementById("priceValue");
// const searchInput = document.getElementById("searchInput");

// let allProducts = [];

// // 🔹 Fetch products from backend
// async function fetchClothingProducts() {
//   try {
//     const response = await fetch(apiUrl);
//     console.log(response);
//     if (!response.ok) throw new Error("Failed to fetch products");
//     allProducts = await response.json();
//     renderProducts(allProducts);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     productGrid.innerHTML =
//       "<p class='col-span-full text-center text-gray-500'>Failed to load products.</p>";
//   }
// }

// // 🔹 Render products with filters applied
// function renderProducts(products) {
//   const maxPrice = parseFloat(priceRange.value);
//   const searchQuery = searchInput.value.toLowerCase();

//   productGrid.innerHTML = "";

//   let filtered = products.filter(
//     (p) =>
//       parseFloat(p.price) <= maxPrice &&
//       p.name.toLowerCase().includes(searchQuery)
//   );

//   if (filtered.length === 0) {
//     productGrid.innerHTML =
//       "<p class='col-span-full text-center text-gray-500'>No products found.</p>";
//     return;
//   }

//   filtered.forEach((p) => {
//     const image =
//       p.imageUrl ||
//       p.image_url ||
//       "https://via.placeholder.com/400x400?text=Product";
//     const qty = p.quantityLeft || p.quantity_left || 0;

//     productGrid.innerHTML += `
//       <div class="group relative flex flex-col rounded-lg overflow-hidden shadow hover:shadow-lg bg-white transition-transform hover:scale-105">
//       <div class="aspect-[3/4] overflow-hidden">
//         <img src="${image}" alt="${p.name}"
//           class="h-full w-full object-cover group-hover:opacity-80 transition"/>
//       </div>
//       <div class="p-4 flex flex-col flex-grow">
//         <h3 class="text-sm font-medium text-gray-800">${p.name}</h3>
//         <p class="text-sm text-gray-500 line-clamp-2">${p.description || ""}</p>
//         <p class="mt-2 font-semibold text-gray-900">$${Number(p.price).toFixed(
//           2
//         )}</p>
//         <p class="text-xs text-gray-500">Stock: ${qty}</p>
//       </div>
//       <div class="h-12"></div> <!-- 🔹 Reserved space for Add to Cart button -->
//       <button onclick="addToCart(${p.id})"
//         class="absolute bottom-3 left-1/2 transform -translate-x-1/2 rounded-full bg-[var(--primary-color)] px-5 py-2 text-sm text-white opacity-0 group-hover:opacity-100 transition">
//         Add to Cart
//       </button>
//     </div>`;
//   });
// }

// // 🔹 Update price value on slider change
// priceRange.addEventListener("input", () => {
//   priceValue.textContent = `$${priceRange.value}`;
//   renderProducts(allProducts);
// });

// // 🔹 Search filter
// searchInput.addEventListener("input", () => {
//   renderProducts(allProducts);
// });

// // 🔹 Sorting handlers (stub)
// function sortProducts(criteria) {
//   let sorted = [...allProducts];
//   if (criteria === "price") {
//     sorted.sort((a, b) => a.price - b.price);
//   } else if (criteria === "rating") {
//     sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//   } else if (criteria === "newest") {
//     sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//   }
//   renderProducts(sorted);
// }

// // 🔹 Add to cart (stub - connect with cart.js later)
// function addToCart(productId) {
//   console.log(`Product ${productId} added to cart (to be handled in cart.js).`);
// }

// // 🔹 Initial fetch
// fetchClothingProducts();

// js/clothing.js

(function () {
  const API_URL = "http://localhost:8086/products/category/Clothing";

  // DOM refs
  const productGrid = document.getElementById("productGrid");
  const priceRange = document.getElementById("priceRange");
  const priceValue = document.getElementById("priceValue");
  const searchInput = document.getElementById("searchInput");

  // Sort buttons container in the "Clothing" header row
  const sortContainer = document.querySelector(
    "main .flex.border-b.border-gray-200"
  );
  const sortButtons = sortContainer
    ? Array.from(sortContainer.querySelectorAll("button"))
    : [];

  // State
  let originalProducts = [];
  let allProducts = [];
  let currentSort = "relevance"; // 'relevance' | 'price' | 'rating' | 'newest'

  // ---------- Helpers to read fields safely (defensive to avoid JS errors) ----------
  const pick = (obj, keys, fallback = undefined) => {
    for (const k of keys) {
      if (obj && obj[k] !== undefined && obj[k] !== null) return obj[k];
    }
    return fallback;
  };

  const getId = (p) => pick(p, ["id", "productId", "product_id"]);
  const getName = (p) => String(pick(p, ["name", "title"], "Unnamed"));
  const getDesc = (p) => String(pick(p, ["description", "desc"], ""));
  const getPrice = (p) => Number(pick(p, ["price", "amount"], 0));
  const getImg = (p) =>
    pick(
      p,
      ["imageUrl", "image_url", "image", "thumbnailUrl", "thumbnail_url"],
      "https://via.placeholder.com/600x600?text=Product"
    );
  const getRating = (p) =>
    Number(pick(p, ["rating", "ratings", "avgRating", "averageRating"], 0));
  const getCreatedAt = (p) =>
    new Date(
      pick(
        p,
        [
          "createdAt",
          "created_at",
          "createdOn",
          "created_on",
          "dateAdded",
          "addedAt",
        ],
        0
      )
    ).getTime();

  // ---------- Fetch ----------
  async function fetchProducts() {
    try {
      // Optional: small skeleton while loading
      showSkeletons(6);

      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      originalProducts = Array.isArray(data) ? data : [];
      allProducts = [...originalProducts];

      render();
    } catch (err) {
      console.error("Failed to fetch clothing products:", err);
      productGrid.innerHTML =
        "<p class='col-span-full text-center text-gray-500'>Failed to load products.</p>";
    }
  }

  // ---------- Render pipeline ----------
  function render() {
    const maxPrice = parseFloat(priceRange?.value ?? "9999999");
    const q = (searchInput?.value || "").trim().toLowerCase();

    // 1) Filter
    let filtered = allProducts.filter((p) => {
      const price = getPrice(p);
      const name = getName(p).toLowerCase();
      const desc = getDesc(p).toLowerCase();
      const matchesSearch = !q || name.includes(q) || desc.includes(q);
      return price <= maxPrice && matchesSearch;
    });

    // 2) Sort
    filtered = getSorted(filtered);

    // 3) Paint
    renderProducts(filtered);
  }

  function getSorted(list) {
    if (currentSort === "price") {
      // Low to High (common default)
      return [...list].sort((a, b) => getPrice(a) - getPrice(b));
    }
    if (currentSort === "rating") {
      // High to Low
      return [...list].sort((a, b) => getRating(b) - getRating(a));
    }
    if (currentSort === "newest") {
      // Newest first
      return [...list].sort((a, b) => getCreatedAt(b) - getCreatedAt(a));
    }
    // relevance: preserve original order from backend
    const order = new Map(originalProducts.map((p, i) => [getId(p), i]));
    return [...list].sort(
      (a, b) => (order.get(getId(a)) ?? 0) - (order.get(getId(b)) ?? 0)
    );
  }

  // ---------- Card renderer (EXACT electronics card style) ----------
  function renderProducts(items) {
    productGrid.innerHTML = "";

    if (!items.length) {
      productGrid.innerHTML =
        "<p class='col-span-full text-center text-gray-500'>No products found.</p>";
      return;
    }

    items.forEach((p) => {
      const card = document.createElement("div");
      card.className =
        "group relative flex flex-col gap-3 border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow bg-white";

      // Use inline style for 2-line clamp (no Tailwind line-clamp plugin required)
      const desc = getDesc(p)
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      card.innerHTML = `
        <div class="w-full aspect-square overflow-hidden rounded-lg bg-gray-200">
          <img
            src="${getImg(p)}"
            alt="${getName(p)}"
            class="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
          />
        </div>
        <div class="flex flex-col flex-1">
          <h3 class="text-base font-medium text-gray-900">${getName(p)}</h3>
          <p class="text-sm text-gray-500" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
            ${desc}
          </p>
          <p class="mt-1 text-base font-semibold text-gray-900">$${getPrice(
            p
          ).toFixed(2)}</p>
        </div>
        <button
          class="mt-3 w-full rounded-lg bg-[var(--primary-color)] text-white py-2 px-3 text-sm font-medium hover:bg-red-600 transition"
          onclick="addToCart(${JSON.stringify(getId(p))}, ${JSON.stringify(
        getName(p)
      )}, ${JSON.stringify(getPrice(p))})"
        >
          Add to Cart
        </button>
      `;

      productGrid.appendChild(card);
    });
  }

  // ---------- Price slider + search ----------
  if (priceRange && priceValue) {
    priceValue.textContent = `$${priceRange.value}`;
    priceRange.addEventListener("input", () => {
      priceValue.textContent = `$${priceRange.value}`;
      render();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      render();
    });
  }

  // ---------- Sorting buttons wiring ----------
  if (sortButtons.length === 4) {
    const labels = ["relevance", "price", "rating", "newest"];
    sortButtons.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        currentSort = labels[i];
        updateSortButtonStyles(i);
        render();
      });
    });
    // Ensure initial visual state matches our default 'relevance'
    updateSortButtonStyles(0);
  }

  function updateSortButtonStyles(activeIndex) {
    sortButtons.forEach((btn, i) => {
      if (i === activeIndex) {
        btn.classList.add("border-b-2", "border-[var(--primary-color)]");
        btn.classList.remove("text-gray-500");
        btn.classList.add("font-semibold");
      } else {
        btn.classList.remove("border-b-2", "border-[var(--primary-color)]");
        if (!btn.classList.contains("text-gray-500")) {
          btn.classList.add("text-gray-500");
        }
        btn.classList.remove("font-semibold");
      }
    });
  }

  // ---------- Skeleton (simple) ----------
  function showSkeletons(count) {
    if (!productGrid) return;
    productGrid.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const sk = document.createElement("div");
      sk.className =
        "flex flex-col gap-3 border rounded-lg p-3 shadow-sm bg-white animate-pulse";
      sk.innerHTML = `
        <div class="w-full aspect-square rounded-lg bg-gray-200"></div>
        <div class="space-y-2">
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="h-3 bg-gray-200 rounded w-full"></div>
          <div class="h-5 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div class="h-9 bg-gray-200 rounded"></div>
      `;
      productGrid.appendChild(sk);
    }
  }

  // ---------- Cart hook (leave scope for cart.js) ----------
  // Expose a global function so cart.js can intercept/override later.
  // Also dispatch a DOM CustomEvent for decoupled communication.
  window.addToCart = function (id, name, price) {
    try {
      // Fire an event that cart.js can listen to
      const evt = new CustomEvent("cart:add", {
        detail: { id, name, price, source: "clothing" },
      });
      window.dispatchEvent(evt);

      // Optionally keep a lightweight queue in localStorage for later processing
      const key = "loomnex_pending_cart_adds";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      existing.push({ id, name, price, ts: Date.now(), source: "clothing" });
      localStorage.setItem(key, JSON.stringify(existing));

      console.info(`[cart] addToCart ->`, { id, name, price });
    } catch (e) {
      console.error("addToCart error:", e);
    }
  };

  // ---------- Boot ----------
  fetchProducts();
})();
