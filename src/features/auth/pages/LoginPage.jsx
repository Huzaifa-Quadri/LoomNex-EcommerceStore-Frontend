import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // To hold validation errors from backend
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGlobalError("");
    setIsSubmitting(true);

    const result = await login({ email, password });
    setIsSubmitting(false);

    if (result.success) {
      toast.success("Welcome back!");
      navigate("/"); // Redirect to home on success
    } else {
      // Map standard Spring Boot validation errors to UI state
      if (result.error?.fieldErrors) {
        setErrors(result.error.fieldErrors);
      }
      if (result.error?.message) {
        setGlobalError(result.error.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold tracking-tight text-stone-900">
            Welcome back to LoomNex
          </h2>
          <p className="mt-2 text-center text-sm text-stone-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-primary hover:text-red-700"
            >
              Sign up here
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {globalError && (
            <div className="rounded-md bg-red-50 p-4 border border-red-200">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {globalError}
                  </h3>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label
                className="block text-sm font-medium text-stone-700 mb-1"
                htmlFor="email"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                className={`flex w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email ? "border-red-500" : "border-stone-300"
                }`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium text-stone-700 mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className={`flex w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.password ? "border-red-500" : "border-stone-300"
                }`}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full justify-center rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 transition-colors cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Spinner /> Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
            <div className="text-center mt-4">
              <Link
                to="/"
                className="text-sm text-stone-500 hover:text-stone-700 hover:underline"
              >
                Return to Store
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
