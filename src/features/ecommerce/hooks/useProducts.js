import { useState, useEffect } from "react";
import { getAllProducts, getProductsByCategory } from "../api/productApi";
import { MOCK_PRODUCTS } from "../api/mockData";

/**
 * Fetch ALL products from the backend.
 * Falls back to mock data if the API is unreachable.
 * Returns { products, loading, error }
 */
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllProducts();
        if (!cancelled) setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.warn("API unavailable, using mock data:", err.message);
        if (!cancelled) {
          setProducts(MOCK_PRODUCTS);
          setError(null); // Don't show error when we have fallback data
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error };
}

/**
 * Fetch products for a given category.
 * Falls back to filtered mock data if the API is unreachable.
 * Returns { products, loading, error }
 */
export function useProductsByCategory(category) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) return;
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductsByCategory(category);
        if (!cancelled) setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.warn(`API unavailable for ${category}, using mock data:`, err.message);
        if (!cancelled) {
          const filtered = MOCK_PRODUCTS.filter(
            (p) => p.category?.toLowerCase() === category.toLowerCase()
          );
          setProducts(filtered);
          setError(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [category]);

  return { products, loading, error };
}
