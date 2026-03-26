import axiosClient from "./axiosClient";

/**
 * Fetch every product from the backend.
 * GET /products/getallproducts
 */
export const getAllProducts = async () => {
  const { data } = await axiosClient.get("/products/getallproducts");
  return data;
};

/**
 * Fetch products for a specific category.
 * GET /products/category/{category}
 */
export const getProductsByCategory = async (category) => {
  const { data } = await axiosClient.get(
    `/products/category/${encodeURIComponent(category)}`
  );
  return data;
};
