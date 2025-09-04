// const BASE_URL = "http://localhost:8086/products";
// const container = document.getElementById("electronics-container");
// const sortSelect = document.getElementById("sort-by");
// const emptyState = document.getElementById("empty-state");

// // Show skeleton loaders
// function showSkeleton(count = 6) {
//   container.innerHTML = "";
//   for (let i = 0; i < count; i++) {
//     const skeleton = document.createElement("div");
//     skeleton.className = "flex flex-col gap-3 animate-pulse";
//     skeleton.innerHTML = `
//       <div class="w-full aspect-square rounded-lg skeleton"></div>
//       <div class="h-4 w-3/4 rounded skeleton"></div>
//       <div class="h-3 w-1/2 rounded skeleton"></div>
//       <div class="h-5 w-1/4 rounded skeleton"></div>
//     `;
//     container.appendChild(skeleton);
//   }
// }

// // Fetch electronics
// async function fetchElectronics() {
//   showSkeleton();
//   try {
//     const response = await fetch(`${BASE_URL}/getallproducts`);
//     const products = await response.json();

//     const electronics = products.filter(
//       (p) => p.category && p.category.toLowerCase() === "electronics"
//     );

//     if (electronics.length === 0) {
//       container.innerHTML = "";
//       emptyState.classList.remove("hidden");
//       return;
//     }

//     emptyState.classList.add("hidden");
//     renderProducts(electronics);
//   } catch (error) {
//     console.error("Error fetching electronics:", error);
//     container.innerHTML =
//       '<p class="text-red-500">Failed to load products. Please try again later.</p>';
//   }
// }

// // Render product cards
// function renderProducts(products) {
//   container.innerHTML = "";

//   products.forEach((product) => {
//     const card = document.createElement("div");
//     card.className = "group relative flex flex-col gap-3";

//     card.innerHTML = `
//       <div class="w-full aspect-square overflow-hidden rounded-lg bg-gray-200">
//         <img
//           src="${product.imageUrl || "https://via.placeholder.com/300"}"
//           alt="${product.name}"
//           class="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
//         />
//       </div>
//       <div>
//         <h3 class="text-base font-medium text-gray-900">${product.name}</h3>
//         <p class="text-sm text-gray-500">${
//           product.description || "No details"
//         }</p>
//         <p class="mt-1 text-base font-semibold text-gray-900">$${
//           product.price
//         }</p>
//       </div>
//     `;
//     container.appendChild(card);
//   });
// }

// // Sorting
// sortSelect.addEventListener("change", async (e) => {
//   const response = await fetch(`${BASE_URL}/getallproducts`);
//   let products = await response.json();

//   let electronics = products.filter(
//     (p) => p.category && p.category.toLowerCase() === "electronics"
//   );

//   if (e.target.value === "low-high") {
//     electronics.sort((a, b) => a.price - b.price);
//   } else if (e.target.value === "high-low") {
//     electronics.sort((a, b) => b.price - a.price);
//   } else if (e.target.value === "newest") {
//     electronics.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//   }

//   renderProducts(electronics);
// });

// // Initial load
// fetchElectronics();

//! Second Mdification according to updated backend for Simplicity

// const BASE_URL = "http://localhost:8086/products";

// const els = {
//   electronics: {
//     container: document.getElementById("electronics-container"),
//     empty: document.getElementById("electronics-empty"),
//   },
//   gadgets: {
//     container: document.getElementById("gadgets-container"),
//     empty: document.getElementById("gadgets-empty"),
//   },
//   sortSelect: document.getElementById("sort-by"),
// };

// function showSkeleton(container, count = 6) {
//   container.innerHTML = "";
//   for (let i = 0; i < count; i++) {
//     const s = document.createElement("div");
//     s.className = "flex flex-col gap-3 animate-pulse";
//     s.innerHTML = `
//       <div class="w-full aspect-square rounded-lg skeleton"></div>
//       <div class="h-4 w-3/4 rounded skeleton"></div>
//       <div class="h-3 w-1/2 rounded skeleton"></div>
//       <div class="h-5 w-1/4 rounded skeleton"></div>
//     `;
//     container.appendChild(s);
//   }
// }

// async function fetchCategory(category) {
//   const url = `${BASE_URL}/category/${encodeURIComponent(category)}`;
//   const res = await fetch(url);
//   if (!res.ok) {
//     // Common gotcha: wrong path -> 404 from Spring (static resource)
//     throw new Error(`Fetch failed (${res.status}) for ${url}`);
//   }
//   return res.json();
// }

// function renderCards(container, items) {
//   container.innerHTML = "";
//   items.forEach((p) => {
//     const card = document.createElement("div");
//     card.className = "group relative flex flex-col gap-3";
//     card.innerHTML = `
//       <div class="w-full aspect-square overflow-hidden rounded-lg bg-gray-200">
//         <img
//           src="${
//             p.imageUrl || "https://via.placeholder.com/600x600?text=Product"
//           }"
//           alt="${p.name}"
//           class="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
//         />
//       </div>
//       <div>
//         <h3 class="text-base font-medium text-gray-900">${p.name}</h3>
//         <p class="text-sm text-gray-500 line-clamp-2">${p.description || ""}</p>
//         <p class="mt-1 text-base font-semibold text-gray-900">$${Number(
//           p.price
//         ).toFixed(2)}</p>
//       </div>
//     `;
//     container.appendChild(card);
//   });
// }

// function sortProducts(list, mode) {
//   const items = [...list];
//   if (mode === "low-high") items.sort((a, b) => a.price - b.price);
//   if (mode === "high-low") items.sort((a, b) => b.price - a.price);
//   if (mode === "newest") {
//     // falls back gracefully if no createdAt
//     items.sort(
//       (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
//     );
//   }
//   // "popular" => leave as-is (backend can later add popularity score)
//   return items;
// }

// // Cache to avoid refetch on each sort
// const cache = {
//   electronics: [],
//   gadgets: [],
// };

// async function loadSection(key, category) {
//   const { container, empty } = els[key];
//   showSkeleton(container);
//   try {
//     const data = await fetchCategory(category);
//     cache[key] = Array.isArray(data) ? data : [];
//     if (cache[key].length === 0) {
//       container.innerHTML = "";
//       empty.classList.remove("hidden");
//     } else {
//       empty.classList.add("hidden");
//       const sorted = sortProducts(cache[key], els.sortSelect.value);
//       renderCards(container, sorted);
//     }
//   } catch (err) {
//     console.error(`Error loading ${category}:`, err);
//     container.innerHTML = `<div class="text-red-600">Failed to load ${category}. Check API path & CORS.</div>`;
//   }
// }

// function applySortToAll() {
//   const mode = els.sortSelect.value;
//   // Electronics
//   if (cache.electronics.length) {
//     const sorted = sortProducts(cache.electronics, mode);
//     renderCards(els.electronics.container, sorted);
//   }
//   // Gadgets
//   if (cache.gadgets.length) {
//     const sorted = sortProducts(cache.gadgets, mode);
//     renderCards(els.gadgets.container, sorted);
//   }
// }

// els.sortSelect.addEventListener("change", applySortToAll);

// // Initial load
// loadSection("electronics", "Electronics");
// loadSection("gadgets", "Gadgets");

const BASE_URL = "http://localhost:8086/products";

const els = {
  electronics: {
    container: document.getElementById("electronics-container"),
    empty: document.getElementById("electronics-empty"),
  },
  gadgets: {
    container: document.getElementById("gadgets-container"),
    empty: document.getElementById("gadgets-empty"),
  },
  sortSelect: document.getElementById("sort-by"),
};

function showSkeleton(container, count = 6) {
  container.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const s = document.createElement("div");
    s.className = "flex flex-col gap-3 animate-pulse";
    s.innerHTML = `
      <div class="w-full aspect-square rounded-lg skeleton"></div>
      <div class="h-4 w-3/4 rounded skeleton"></div>
      <div class="h-3 w-1/2 rounded skeleton"></div>
      <div class="h-5 w-1/4 rounded skeleton"></div>
    `;
    container.appendChild(s);
  }
}

async function fetchCategory(category) {
  const url = `${BASE_URL}/category/${encodeURIComponent(category)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed (${res.status}) for ${url}`);
  return res.json();
}

function renderCards(container, items) {
  container.innerHTML = "";
  items.forEach((p) => {
    const card = document.createElement("div");
    card.className =
      "group relative flex flex-col gap-3 border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow";

    card.innerHTML = `
      <div class="w-full aspect-square overflow-hidden rounded-lg bg-gray-200">
        <img
          src="${
            p.imageUrl || "https://via.placeholder.com/600x600?text=Product"
          }"
          alt="${p.name}"
          class="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
        />
      </div>
      <div class="flex flex-col flex-1">
        <h3 class="text-base font-medium text-gray-900">${p.name}</h3>
        <p class="text-sm text-gray-500 line-clamp-2">${p.description || ""}</p>
        <p class="mt-1 text-base font-semibold text-gray-900">$${Number(
          p.price
        ).toFixed(2)}</p>
      </div>
      <button 
        class="mt-3 w-full rounded-lg bg-[var(--primary-color)] text-white py-2 px-3 text-sm font-medium hover:bg-red-600 transition"
        onclick="addToCart(${p.id}, '${p.name}', ${p.price})">
        Add to Cart
      </button>
    `;
    container.appendChild(card);
  });
}

// Placeholder cart function
function addToCart(id, name, price) {
  console.log(`Added to cart: ${name} ($${price}) [ID: ${id}]`);
  // Later: Save to localStorage/sessionStorage or call backend
  alert(`${name} added to cart!`);
}

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

const cache = {
  electronics: [],
  gadgets: [],
};

async function loadSection(key, category) {
  const { container, empty } = els[key];
  showSkeleton(container);
  try {
    const data = await fetchCategory(category);
    cache[key] = Array.isArray(data) ? data : [];
    if (cache[key].length === 0) {
      container.innerHTML = "";
      empty.classList.remove("hidden");
    } else {
      empty.classList.add("hidden");
      const sorted = sortProducts(cache[key], els.sortSelect.value);
      renderCards(container, sorted);
    }
  } catch (err) {
    console.error(`Error loading ${category}:`, err);
    container.innerHTML = `<div class="text-red-600">Failed to load ${category}. Check API path & CORS.</div>`;
  }
}

function applySortToAll() {
  const mode = els.sortSelect.value;
  if (cache.electronics.length) {
    renderCards(
      els.electronics.container,
      sortProducts(cache.electronics, mode)
    );
  }
  if (cache.gadgets.length) {
    renderCards(els.gadgets.container, sortProducts(cache.gadgets, mode));
  }
}

//* Function to add product to cart on click

// Initial load
loadSection("electronics", "Electronics");
loadSection("gadgets", "Gadgets");
