import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./features/ecommerce/context/CartContext";
import AppRoutes from "./app.routes";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
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
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
