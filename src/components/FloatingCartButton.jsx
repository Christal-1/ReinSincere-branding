// src/components/FloatingCartButton.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import { FaShoppingCart } from "react-icons/fa";

export default function FloatingCartButton() {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (cartCount === 0) return null; // hide if cart is empty

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-accent text-black w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-accent/90 transition"
        aria-label="Open cart"
      >
        <FaShoppingCart />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-black text-accent text-xs font-bold px-2 py-[2px] rounded-full">
            {cartCount}
          </span>
        )}
      </button>

      {/* Cart Drawer */}
      <CartDrawer isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
