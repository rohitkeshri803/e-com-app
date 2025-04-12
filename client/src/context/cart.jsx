import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  // Initialize cart from localStorage, with default quantity = 1
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        return JSON.parse(stored).map(item => ({
          ...item,
          quantity: item.quantity || 1,
        }));
      } catch (e) {
        console.error("Invalid cart data in localStorage", e);
        return [];
      }
    }
    return [];
  });

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
