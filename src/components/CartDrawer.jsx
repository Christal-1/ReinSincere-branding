import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { HiX, HiTrash, HiPlus, HiMinus, HiArrowRight, HiCheckCircle } from "react-icons/hi";

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [removingId, setRemovingId] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const totalPrice = useMemo(
    () => cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0),
    [cart]
  );

  const itemCount = useMemo(() => cart.reduce((sum, item) => sum + (item.quantity || 1), 0), [cart]);

  const handleRemove = (id) => {
    setRemovingId(id);
    setTimeout(() => {
      removeFromCart(id);
      setRemovingId(null);
    }, 300);
  };

  const handleQuantityChange = (id, qty) => {
    const newQty = Math.max(1, Math.round(qty));
    updateQuantity(id, newQty);
  };

  return (
    <>
      <style>{`
        .glass-effect {
          background: rgba(14, 47, 40, 0.75);
          backdrop-filter: blur(16px) saturate(140%);
          border: 1px solid rgba(200, 162, 77, 0.15);
        }

        .glass-soft {
          background: rgba(14, 47, 40, 0.55);
          backdrop-filter: blur(12px) saturate(110%);
          border: 1px solid rgba(200, 162, 77, 0.08);
        }

        .drawer-overlay {
          animation: drawer-fade-in 0.3s ease-out;
        }

        @keyframes drawer-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .drawer-panel {
          animation: drawer-slide-in 0.4s cubic-bezier(0.23, 1, 0.320, 1);
        }

        .drawer-panel.closing {
          animation: drawer-slide-out 0.3s cubic-bezier(0.23, 1, 0.320, 1);
        }

        @keyframes drawer-slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        @keyframes drawer-slide-out {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }

        .cart-item {
          animation: item-enter 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .cart-item.removing {
          animation: item-exit 0.3s ease-out forwards;
        }

        @keyframes item-enter {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes item-exit {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(-20px);
          }
        }

        .neon-border {
          border: 2px solid #C8A24D;
          box-shadow: 0 0 20px rgba(200, 162, 77, 0.3);
        }

        .glow-effect {
          box-shadow: 0 0 30px rgba(200, 162, 77, 0.25);
        }

        .gradient-text {
          background: linear-gradient(135deg, #C8A24D 0%, #E6D8A3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .quantity-input {
          width: 3rem;
          text-align: center;
          background: rgba(200, 162, 77, 0.1);
          border: 1px solid rgba(200, 162, 77, 0.2);
          border-radius: 0.375rem;
          color: #F6F4EE;
          font-weight: 500;
          transition: all 0.2s;
        }

        .quantity-input:focus {
          outline: none;
          border-color: #C8A24D;
          background: rgba(200, 162, 77, 0.15);
          box-shadow: 0 0 15px rgba(200, 162, 77, 0.2);
        }

        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .badge-pulse {
          animation: badge-pulse 2s ease-in-out infinite;
        }

        @keyframes badge-pulse {
          0%, 100% { box-shadow: 0 0 10px rgba(200, 162, 77, 0.3); }
          50% { box-shadow: 0 0 20px rgba(200, 162, 77, 0.6); }
        }

        .btn-hover-glow:hover {
          box-shadow: 0 0 25px rgba(200, 162, 77, 0.4);
        }

        .scroll-smooth {
          scroll-behavior: smooth;
        }

        .fade-in-up {
          animation: fade-in-up 0.5s ease-out;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 drawer-overlay backdrop-blur-sm"
          onClick={onClose}
          role="presentation"
          aria-hidden="true"
        />
      )}

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 w-full sm:w-96 h-full glass-effect text-ink-2 z-50 transform transition-all duration-300 flex flex-col drawer-panel ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-line relative">
          <div>
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <p className="text-xs text-ink-6">{itemCount} item{itemCount !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-accent/20 transition text-accent"
            aria-label="Close cart drawer"
          >
            <HiX className="text-2xl" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto scroll-smooth p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-5xl mb-4 opacity-20">🛒</div>
              <p className="text-ink-6 mb-4 font-medium">Your cart is empty</p>
              <p className="text-sm text-ink-6 mb-6">Start exploring and add your favorite pieces</p>
              <Link
                to="/shop"
                onClick={onClose}
                className="btn px-6 py-2 bg-accent text-paper rounded-full inline-flex items-center gap-2 text-sm"
              >
                Continue Shopping <HiArrowRight className="text-xs" />
              </Link>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={item.id}
                className={`cart-item glass-soft p-4 rounded-lg border border-line hover:border-accent transition-all group ${
                  removingId === item.id ? "removing" : ""
                }`}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {/* Product Image & Info */}
                <div className="flex gap-3 mb-3">
                  <Link
                    to={`/product/${item.id}`}
                    onClick={onClose}
                    className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 group/img"
                  >
                    <div
                      className="w-full h-full bg-cover bg-center group-hover/img:scale-110 transition-transform duration-300"
                      style={{ backgroundImage: `url(${item.images?.[0] || ""})` }}
                    />
                    <div className="absolute inset-0 shimmer opacity-0 group-hover/img:opacity-100 transition" />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate group-hover:text-accent transition">
                      {item.name}
                    </h4>
                    <p className="text-xs text-ink-6 line-clamp-1">{item.subtitle || "Premium item"}</p>
                    <p className="text-accent font-bold text-sm mt-1">R{item.price}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 bg-paper-soft rounded-md p-1">
                    <button
                      onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                      disabled={(item.quantity || 1) <= 1}
                      className="p-1 text-accent hover:bg-accent/20 disabled:opacity-40 transition rounded"
                      aria-label={`Decrease quantity for ${item.name}`}
                    >
                      <HiMinus className="text-sm" />
                    </button>

                    <input
                      type="number"
                      value={item.quantity || 1}
                      onChange={(e) => handleQuantityChange(item.id, Number(e.target.value || 1))}
                      className="quantity-input py-1"
                      min="1"
                      aria-label={`Quantity for ${item.name}`}
                    />

                    <button
                      onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                      className="p-1 text-accent hover:bg-accent/20 transition rounded"
                      aria-label={`Increase quantity for ${item.name}`}
                    >
                      <HiPlus className="text-sm" />
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="text-accent font-bold text-sm">
                      R{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-1.5 text-red-400 hover:bg-red-600/20 rounded transition"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <HiTrash className="text-sm" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-line space-y-4 fade-in-up">
            {/* Promo Badge */}
            <div className="p-3 bg-accent/10 border border-accent/30 rounded-lg text-center badge-pulse">
              <p className="text-xs text-accent font-semibold">
                Free shipping on orders over R1500
              </p>
            </div>

            {/* Total */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-ink-6">
                <span>Subtotal</span>
                <span>R{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-line">
                <span>Total</span>
                <span className="gradient-text text-xl">R{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Link
                to="/checkout"
                onClick={onClose}
                className="block w-full text-center px-6 py-3 bg-accent text-paper rounded-lg hover:scale-105 transition font-semibold flex items-center justify-center gap-2 btn-hover-glow neon-border"
              >
                Checkout <HiArrowRight className="text-sm" />
              </Link>

              <Link
                to="/cart"
                onClick={onClose}
                className="block w-full text-center px-6 py-3 glass-soft border border-line rounded-lg hover:border-accent transition font-semibold text-accent"
              >
                View Full Cart
              </Link>

              <button
                onClick={clearCart}
                className="w-full px-6 py-3 border border-line rounded-lg text-ink-6 hover:border-red-500 hover:text-red-400 transition font-semibold"
              >
                Clear Cart
              </button>
            </div>

            {/* Promo Code Info */}
            <div className="text-xs text-ink-6 text-center pt-2">
              Use code <span className="text-accent font-semibold cursor-pointer hover:underline">REIN20</span> for 20% off
            </div>
          </div>
        )}
      </div>
    </>
  );
}