import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/auth.jsx";
import { SearchProvider } from "./context/search.jsx";
import { CartProvider } from "./context/cart.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider> {/* ✅ wrap App with CartProvider */}
        <StrictMode>
          <App />
        </StrictMode>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);
