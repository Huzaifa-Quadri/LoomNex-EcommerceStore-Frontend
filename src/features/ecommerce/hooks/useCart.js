import { useContext } from "react";
import { CartContext } from "../context/CartContext";

/**
 * Convenience wrapper around CartContext.
 * Returns { cartItems, addToCart, removeFromCart, changeQuantity, clearCart, cartCount, totals }
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a <CartProvider>");
  }
  return context;
}
