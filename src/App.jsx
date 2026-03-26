import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./features/ecommerce/context/CartContext";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { useKeepAlive } from "./hooks/useKeepAlive";
import AppRoutes from "./app.routes";
import "./index.css";

function AppShell() {
  useKeepAlive();
  return (
    <>
      <AppRoutes />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "9999px",
            padding: "8px 16px",
            fontSize: "14px",
            fontWeight: 500,
          },
        }}
      />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppShell />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
