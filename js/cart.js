// js/cart.js - Shared Cart Functionality
// This file handles cart operations across all pages and provides a unified cart experience

(function () {
  const CART_KEY = "loomnex_cart";

  // ---- Local storage helpers ----
  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      updateCartCounter(); // Update cart counter whenever cart is saved
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }

  // ---- Cart counter functionality ----
  function updateCartCounter() {
    const cart = loadCart();
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    
    // Update cart counter badge if it exists
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
      cartCountElement.textContent = totalItems;
      cartCountElement.style.display = totalItems > 0 ? "block" : "none";
    }
    
    // Dispatch cart update event for other components to listen
    window.dispatchEvent(new CustomEvent("cart:updated", { 
      detail: { totalItems, cart } 
    }));
  }

  // ---- Core cart functions ----
  // Global function that can be called from any page to add items to cart
  window.addToCart = function (id, name, price, imageUrl) {
    try {
      // Normalize input parameters
      const productId = typeof id === "string" && id.match(/^\d+$/) ? Number(id) : id;
      const productName = String(name || "Unnamed Product");
      const productPrice = Number(price) || 0;
      const productImage = imageUrl || "https://via.placeholder.com/200x200.png?text=Product";

      let cart = loadCart();
      const index = cart.findIndex((item) => item.id === productId);

      if (index !== -1) {
        // Product already exists, increment quantity
        cart[index].quantity += 1;
        console.log(`Updated quantity for ${productName} to ${cart[index].quantity}`);
      } else {
        // New product, add to cart
        cart.push({
          id: productId,
          name: productName,
          price: productPrice,
          imageUrl: productImage,
          quantity: 1,
        });
        console.log(`Added new product: ${productName} to cart`);
      }

      saveCart(cart);
      
      // Only render cart if we're on the cart page
      if (document.querySelector(".divide-y.divide-gray-200")) {
        renderCart();
      }
      
      // Show success feedback
      showCartFeedback(`${productName} added to cart!`);
      
    } catch (error) {
      console.error("Error adding to cart:", error);
      showCartFeedback("Error adding item to cart", "error");
    }
  };

  // ---- Cart feedback function ----
  function showCartFeedback(message, type = "success") {
    // Create or update a toast notification
    let toast = document.getElementById("cart-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "cart-toast";
      toast.className = "fixed bottom-10 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white font-medium transition-all duration-300";
      document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.className = `fixed bottom-10 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white font-medium transition-all duration-300 ${
      type === "error" ? "bg-red-500" : "bg-green-500"
    }`;
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      if (toast) {
        toast.style.opacity = "0";
        setTimeout(() => {
          if (toast && toast.parentNode) {
            toast.parentNode.removeChild(toast);
          }
        }, 300);
      }
    }, 3000);
  }

  function removeItem(id) {
    let cart = loadCart().filter((item) => item.id !== id);
    saveCart(cart);
    renderCart();
  }

  function changeQuantity(id, delta) {
    let cart = loadCart();
    const index = cart.findIndex((item) => item.id === id);
    if (index !== -1) {
      cart[index].quantity += delta;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
    }
    saveCart(cart);
    renderCart();
  }

  // ---- Totals ----
  function calculateTotals(cart) {
    let subtotal = 0;
    cart.forEach((item) => {
      subtotal += item.price * item.quantity;
    });
    const tax = +(subtotal * 0.06).toFixed(2); // 6% tax example
    const shipping = subtotal > 0 ? 0 : 0;
    const total = subtotal + tax + shipping;

    return { subtotal, tax, shipping, total };
  }

  // ---- Renderer ----
  function renderCart() {
    const container = document.querySelector(".divide-y.divide-gray-200");
    const summaryBox = document.querySelector(".lg\\:col-span-1 .bg-white");

    if (!container || !summaryBox) return;

    let cart = loadCart();
    container.innerHTML = "";

    if (!cart.length) {
      container.innerHTML =
        "<p class='p-6 text-center text-gray-500'>Your cart is empty.</p>";
    }

    cart.forEach((item) => {
      const itemTotal = (item.price * item.quantity).toFixed(2);

      const row = document.createElement("div");
      row.className = "grid grid-cols-2 sm:grid-cols-6 gap-4 items-center p-6";
      row.innerHTML = `
        <div class="flex items-center gap-4 col-span-2 sm:col-span-3">
          <div
            class="bg-center bg-no-repeat aspect-square bg-cover rounded-md size-20 flex-shrink-0"
            style="background-image: url('${item.imageUrl}');"
          ></div>
          <div>
            <p class="font-semibold text-gray-800">${item.name}</p>
            <button
              class="text-xs text-red-500 hover:text-red-700 mt-1 flex items-center gap-1"
              data-remove="${item.id}"
            >
              <span class="material-symbols-outlined text-sm">delete</span>
              Remove
            </button>
          </div>
        </div>
        <div class="text-center text-gray-600 hidden sm:block">
          $${item.price.toFixed(2)}
        </div>
        <div class="flex justify-center items-center gap-2">
          <button
            class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
            data-dec="${item.id}"
          >-</button>
          <input
            class="w-10 text-center bg-transparent border-0 p-0 focus:ring-0"
            readonly type="text"
            value="${item.quantity}"
          />
          <button
            class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
            data-inc="${item.id}"
          >+</button>
        </div>
        <div class="text-right font-semibold text-gray-800">
          $${itemTotal}
        </div>
      `;

      container.appendChild(row);
    });

    // Attach button listeners
    container
      .querySelectorAll("[data-remove]")
      .forEach((btn) =>
        btn.addEventListener("click", () =>
          removeItem(Number(btn.dataset.remove))
        )
      );
    container
      .querySelectorAll("[data-dec]")
      .forEach((btn) =>
        btn.addEventListener("click", () =>
          changeQuantity(Number(btn.dataset.dec), -1)
        )
      );
    container
      .querySelectorAll("[data-inc]")
      .forEach((btn) =>
        btn.addEventListener("click", () =>
          changeQuantity(Number(btn.dataset.inc), +1)
        )
      );

    // Update totals
    const { subtotal, tax, shipping, total } = calculateTotals(cart);
    summaryBox.innerHTML = `
      <h2 class="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
      <div class="space-y-3">
        <div class="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>${shipping === 0 ? "Free" : "$" + shipping.toFixed(2)}</span>
        </div>
        <div class="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>$${tax.toFixed(2)}</span>
        </div>
      </div>
      <div class="border-t border-gray-200 my-4"></div>
      <div class="flex justify-between font-bold text-lg text-gray-900">
        <span>Total</span>
        <span>$${total.toFixed(2)}</span>
      </div>
      <button
        class="w-full mt-6 flex items-center justify-center rounded-full h-12 px-5 bg-[var(--primary-color)] text-white text-base font-bold hover:bg-red-700 transition-colors"
        id="checkoutBtn"
      >
        Proceed to Checkout
      </button>
    `;

    // Checkout action placeholder (can POST to backend /orders/place/{userId})
    const checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        const orderPayload = {
          productQuantities: Object.fromEntries(
            cart.map((i) => [i.id, i.quantity])
          ),
          totalAmount: total,
        };
        console.log("Checkout → send to backend:", orderPayload);
        alert("Order placed! (Simulated, integrate with backend API)");
      });
    }
  }

  // ---- Listen for addToCart events globally ----
  // This allows other pages to dispatch events that cart.js will handle
  window.addEventListener("cart:add", (e) => {
    const { id, name, price, imageUrl } = e.detail;
    window.addToCart(id, name, price, imageUrl);
  });

  // ---- Utility functions for other pages ----
  // Expose cart utilities for other pages to use
  window.cartUtils = {
    getCartCount: () => {
      const cart = loadCart();
      return cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    },
    getCartItems: () => loadCart(),
    clearCart: () => {
      saveCart([]);
      if (document.querySelector(".divide-y.divide-gray-200")) {
        renderCart();
      }
    }
  };

  // ---- Initialize cart counter on page load ----
  // Update cart counter when the page loads
  updateCartCounter();

  // ---- Initial render (only on cart page) ----
  // Only render cart if we're on the cart page
  if (document.querySelector(".divide-y.divide-gray-200")) {
    renderCart();
  }
})();
