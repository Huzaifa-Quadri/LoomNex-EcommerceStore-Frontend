import axiosClient from "./axiosClient";

/**
 * Place an order for a specific user.
 * POST /orders/place/{userId}
 *
 * @param {string|number} userId
 * @param {{ productQuantities: Record<number, number>, totalAmount: number }} payload
 */
export const placeOrder = async (userId, payload) => {
  const { data } = await axiosClient.post(`/orders/place/${userId}`, payload);
  return data;
};
