import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cartItems, removeFromCart, changeQuantity, clearCart, totals } =
    useCart();

  const { subtotal, tax, shipping, total } = totals;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const orderPayload = {
      productQuantities: Object.fromEntries(
        cartItems.map((item) => [item.id, item.quantity]),
      ),
      totalAmount: total,
    };

    console.log("Checkout → send to backend:", orderPayload);
    toast.success("Order placed! (Simulated — integrate with backend API)");
    clearCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        <Link
          to="/"
          className="text-sm font-medium text-primary hover:underline"
        >
          Continue Shopping
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-6xl text-gray-300">
            shopping_cart
          </span>
          <p className="mt-4 text-lg text-gray-500">Your cart is empty.</p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-full bg-primary px-8 py-3 text-white font-bold hover:bg-red-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="divide-y divide-gray-200 bg-white rounded-lg shadow-sm">
              {cartItems.map((item) => {
                const itemTotal = (item.price * item.quantity).toFixed(2);

                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-2 sm:grid-cols-6 gap-4 items-center p-6"
                  >
                    {/* Product info */}
                    <div className="flex items-center gap-4 col-span-2 sm:col-span-3">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-md size-20 shrink-0"
                        style={{ backgroundImage: `url('${item.imageUrl}')` }}
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.name}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-red-500 hover:text-red-700 mt-1 flex items-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">
                            delete
                          </span>
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Unit price */}
                    <div className="text-center text-gray-600 hidden sm:block">
                      ${item.price.toFixed(2)}
                    </div>

                    {/* Quantity */}
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => changeQuantity(item.id, -1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-10 text-center">{item.quantity}</span>
                      <button
                        onClick={() => changeQuantity(item.id, 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Item total */}
                    <div className="text-right font-semibold text-gray-800">
                      ${itemTotal}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 my-4" />

              <div className="flex justify-between font-bold text-lg text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-6 flex items-center justify-center rounded-full h-12 px-5 bg-primary text-white text-base font-bold hover:bg-red-700 transition-colors cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
