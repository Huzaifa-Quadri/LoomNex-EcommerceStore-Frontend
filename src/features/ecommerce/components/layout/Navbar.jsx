import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

export default function Navbar() {
  const { cartCount } = useCart();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/electronics", label: "Electronics" },
    { to: "/clothing", label: "Clothing" },
    { to: "/about", label: "About Us" },
  ];

  return (
    <header className="flex items-center justify-between border-b border-stone-200 px-10 py-4">
      {/* Left — Logo + Nav */}
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="flex items-center gap-3 text-2xl font-bold text-stone-800"
        >
          <svg
            className="h-8 w-8 text-primary"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
              fill="currentColor"
            />
          </svg>
          LoomNex
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-primary"
                  : "text-stone-500 hover:text-primary transition-colors"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Right — Cart */}
      <div className="flex gap-2">
        <Link to="/cart" className="relative">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
