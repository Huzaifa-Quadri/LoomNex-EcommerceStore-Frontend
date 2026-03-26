import axiosClient from "./axiosClient";

/**
 * Places an order securely.
 * The backend calculates totalAmount securely via server-side queries.
 *
 * Expected payload structure at backend:
 * {
 *   "productQuantities": {
 *     "1": 2, // "productId": quantity
 *     "5": 1
 *   }
 * }
 *
 * @param {string} userId
 * @param {Array} cartItems - items array containing { id, quantity }
 */
export const placeOrder = async (userId, cartItems) => {
  // Format the array into the required map
  const productQuantities = {};
  cartItems.forEach((item) => {
    productQuantities[item.id] = item.quantity;
  });

  const payload = {
    productQuantities,
  };

  const response = await axiosClient.post(`/orders/place/${userId}`, payload);
  return response.data;
};
