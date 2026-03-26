import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth/context/AuthContext";
import { useCart } from "../../hooks/useCart";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    id,
    name = "Unnamed",
    price = 0,
    imageUrl,
    image_url,
    rating,
    description,
    category,
  } = product;

  const image =
    imageUrl ||
    image_url ||
    "https://via.placeholder.com/600x600?text=Product";

  const handleAddToCart = (e) => {
    if (e) e.preventDefault();
    
    if (!user) {
      toast.error("Please log in to add items to your cart");
      navigate("/login");
      return;
    }
    
    addToCart({ id, name, price: Number(price), imageUrl: image }, 1);
    toast.success("Added to cart");
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
      {/* Category badge */}
      {category && (
        <span className="absolute top-3 left-3 z-10 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-stone-700 shadow-sm">
          {category}
        </span>
      )}

      {/* Image */}
      <div className="relative overflow-hidden aspect-4/3">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick-add floating button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg text-stone-700 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white cursor-pointer"
          aria-label="Add to cart"
        >
          <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold text-stone-800 line-clamp-1 group-hover:text-primary transition-colors">
          {name}
        </h3>

        {description && (
          <p className="mt-1 text-sm text-gray-400 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        <div className="mt-auto pt-3 flex items-center justify-between">
          <p className="text-lg font-bold text-stone-900">
            ₹{Number(price).toFixed(2)}
          </p>
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full">
            <span className="material-symbols-outlined text-amber-500 text-[16px]">
              star
            </span>
            <span className="text-xs font-semibold text-amber-700">{rating || "4.5"}</span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-3 w-full rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
