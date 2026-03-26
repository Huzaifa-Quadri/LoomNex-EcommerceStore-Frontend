import { createContext, useState, useEffect, useCallback, useMemo } from "react";
import toast from "react-hot-toast";

const CART_KEY = "loomnex_cart";

// ---- helpers ----
const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCart);

  // Sync to localStorage whenever cartItems changes
  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  // ---- actions ----
  const addToCart = useCallback(
    (product) => {
      setCartItems((prev) => {
        const idx = prev.findIndex((item) => item.id === product.id);
        if (idx !== -1) {
          const updated = [...prev];
          updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
          return updated;
        }
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: Number(product.price),
            imageUrl: product.imageUrl || "https://via.placeholder.com/200x200.png?text=Product",
            quantity: 1,
          },
        ];
      });
      toast.success(`${product.name} added to cart!`);
    },
    []
  );

  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const changeQuantity = useCallback((id, delta) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((item) => item.id === id);
      if (idx === -1) return prev;

      const newQty = prev[idx].quantity + delta;
      if (newQty <= 0) return prev.filter((item) => item.id !== id);

      const updated = [...prev];
      updated[idx] = { ...updated[idx], quantity: newQty };
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // ---- derived values ----
  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = +(subtotal * 0.06).toFixed(2);
    const shipping = 0; // free shipping
    const total = subtotal + tax + shipping;
    return { subtotal, tax, shipping, total };
  }, [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      changeQuantity,
      clearCart,
      cartCount,
      totals,
    }),
    [cartItems, addToCart, removeFromCart, changeQuantity, clearCart, cartCount, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
