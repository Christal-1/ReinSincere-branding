import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);

  const cartCount = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <>
      <nav className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-line shadow-header">
        <div className="container flex items-center justify-between py-4">
          <Link to="/" className="text-2xl font-bold">
            Rein<span className="text-accent">Sincere</span>
          </Link>

          <div className="flex items-center gap-8 text-sm">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>

            {/* Cart Button */}
            <button
              onClick={() => setOpen(true)}
              className="relative"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-black text-xs font-bold px-2 py-[2px] rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <CartDrawer isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
