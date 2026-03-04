// ...existing code...
import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { HiArrowRight, HiTrash, HiPlus, HiMinus } from "react-icons/hi";

export default function Cart({ setNotification }) {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  // UI & interaction state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [saved, setSaved] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // keep saved items + coupon persistent
  useEffect(() => {
    const s = window.localStorage.getItem("rs_saved");
    const c = window.localStorage.getItem("rs_coupon");
    if (s) setSaved(JSON.parse(s));
    if (c) setAppliedCoupon(JSON.parse(c));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("rs_saved", JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    if (appliedCoupon) window.localStorage.setItem("rs_coupon", JSON.stringify(appliedCoupon));
    else window.localStorage.removeItem("rs_coupon");
  }, [appliedCoupon]);

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleScroll = () => setScrollY(window.scrollY || 0);
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // computed totals (memoized)
  const subtotal = useMemo(
    () => cart.reduce((s, it) => s + (Number(it.price) || 0) * (it.quantity || 1), 0),
    [cart]
  );

  const shipping = subtotal === 0 || subtotal > 1500 ? 0 : 120;

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    const { type, value } = appliedCoupon;
    if (type === "percent") return Math.round((subtotal * value) / 100);
    if (type === "fixed") return Math.min(value, subtotal);
    return 0;
  }, [appliedCoupon, subtotal]);

  const total = Math.max(0, subtotal - discountAmount + shipping);

  // UX helpers
  const notify = (msg) => {
    if (typeof setNotification === "function") setNotification(msg);
  };

  const changeQty = (id, qty) => {
    const newQty = Math.max(1, Math.round(qty));
    updateQuantity(id, newQty);
    notify("Cart updated");
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    notify("Item removed");
  };

  const handleClear = () => {
    clearCart();
    notify("Cart cleared");
  };

  const handleSaveForLater = (item) => {
    setSaved((s) => {
      const exists = s.some((x) => x.id === item.id);
      if (exists) return s;
      return [...s, item];
    });
    removeFromCart(item.id);
    notify("Saved for later");
  };

  const moveToCartFromSaved = (item) => {
    // Assume updateQuantity adds if not exists in cart context; fallback: updateQuantity(item.id,1)
    updateQuantity(item.id, 1);
    setSaved((s) => s.filter((x) => x.id !== item.id));
    notify("Moved to cart");
  };

  const applyCoupon = () => {
    const code = (couponInput || "").trim().toUpperCase();
    if (!code) {
      notify("Enter a coupon code");
      return;
    }

    // Example coupon rules - extend as needed
    const coupons = {
      REIN20: { code: "REIN20", type: "percent", value: 20, label: "20% off" },
      SAVE100: { code: "SAVE100", type: "fixed", value: 100, label: "R100 off" },
      FREESHIP: { code: "FREESHIP", type: "freeship", value: 0, label: "Free shipping" }
    };

    const found = coupons[code];
    if (!found) {
      setAppliedCoupon(null);
      notify("Invalid coupon");
      return;
    }

    if (found.type === "freeship") {
      setAppliedCoupon({ ...found, type: "freeship" });
      notify(`${found.label} applied`);
      return;
    }

    // don't allow percent discounts beyond subtotal
    if (found.type === "percent" && subtotal === 0) {
      notify("Add items before applying the coupon");
      return;
    }

    setAppliedCoupon(found);
    notify(`${found.label} applied`);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    notify("Coupon removed");
  };

  // Empty UI
  if (cart.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-paper text-ink-2">
        <section className="max-w-xl w-full glass-effect rounded-lgx shadow-card p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-ink-6 mb-6">No items yet — explore our collection and add something you love.</p>
          <div className="flex justify-center gap-4">
            <Link to="/shop" className="btn px-6 py-3 bg-accent text-paper rounded-full">
              Start Shopping
            </Link>
            <button
              onClick={() => {
                // show saved items if any
                if (saved.length) notify("You have saved items — move them back to cart");
                else notify("No saved items");
              }}
              className="px-6 py-3 border border-line rounded-md text-ink-6"
            >
              View Saved
            </button>
          </div>
        </section>
      </main>
    );
  }

  // Main cart UI
  return (
    <main className="min-h-screen px-6 lg:px-24 py-12 bg-paper text-ink-2">
      <style>{`
        .glass-effect{ background: rgba(14,47,40,0.65); backdrop-filter: blur(10px) saturate(120%); border:1px solid rgba(200,162,77,0.08); }
        .tilt{ transform-style: preserve-3d; transition: transform .22s cubic-bezier(.2,.9,.26,1); }
        .tilt:hover{ transform: translateY(-6px) rotateX(3deg) rotateY(-4deg) scale(1.01); }
        .floating{ animation: floating 6s ease-in-out infinite; }
        @keyframes floating{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .sr-only{ position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
      `}</style>

      {/* floating background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-8 top-20 w-60 h-60 rounded-full bg-accent/6 blur-3xl floating" style={{ transform: `translateY(${scrollY * 0.06}px) translateX(${mousePos.x * 0.01}px)` }} />
        <div className="absolute right-8 bottom-24 w-96 h-96 rounded-full bg-accent/5 blur-3xl" style={{ transform: `translateY(${scrollY * -0.03}px)` }} />
      </div>

      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Your Cart</h1>
          <p className="text-sm text-ink-6">{cart.length} item{cart.length>1?'s':''} • Subtotal: R{subtotal}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleClear}
            className="px-3 py-2 rounded-md border border-line text-ink-6 hover:border-accent"
            aria-label="Clear cart"
          >
            Clear
          </button>
          <Link to="/shop" className="btn px-4 py-2 bg-accent text-paper rounded-full inline-flex items-center gap-2">
            Continue Shopping <HiArrowRight />
          </Link>
        </div>
      </header>

      <div className="grid md:grid-cols-12 gap-8">
        <section className="md:col-span-8 space-y-6">
          {cart.map((item, idx) => {
            const dx = (mousePos.x - window.innerWidth / 2) * 0.002;
            const dy = (mousePos.y - window.innerHeight / 2) * 0.002;
            return (
              <article
                key={item.id}
                className="relative p-4 glass-effect rounded-lgx tilt flex gap-4 items-start"
                style={{ transform: `perspective(900px) rotateX(${dy}deg) rotateY(${dx}deg)` }}
                aria-labelledby={`cart-item-${item.id}`}
              >
                <div className="w-28 h-28 rounded-lg bg-cover bg-center flex-shrink-0 shadow-md" style={{ backgroundImage: `url(${item.images?.[0]})` }} role="img" aria-label={item.name} />
                <div className="flex-1">
                  <h3 id={`cart-item-${item.id}`} className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-ink-6 mb-3">{item.subtitle || item.description}</p>

                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center border border-line rounded-md">
                      <button
                        onClick={() => changeQty(item.id, (item.quantity || 1) - 1)}
                        disabled={(item.quantity || 1) <= 1}
                        aria-label={`Decrease quantity for ${item.name}`}
                        className="p-2 text-accent disabled:opacity-40"
                      >
                        <HiMinus />
                      </button>

                      <input
                        type="number"
                        value={item.quantity || 1}
                        onChange={(e) => changeQty(item.id, Number(e.target.value || 1))}
                        className="w-16 text-center bg-transparent px-2 py-2 outline-none"
                        min={1}
                        aria-label={`Quantity for ${item.name}`}
                      />

                      <button
                        onClick={() => changeQty(item.id, (item.quantity || 1) + 1)}
                        aria-label={`Increase quantity for ${item.name}`}
                        className="p-2 text-accent"
                      >
                        <HiPlus />
                      </button>
                    </div>

                    <button onClick={() => handleSaveForLater(item)} className="px-3 py-2 text-sm border border-line rounded-md text-ink-6 hover:border-accent">
                      Save for later
                    </button>

                    <button onClick={() => handleRemove(item.id)} className="ml-auto px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2">
                      <HiTrash /> Remove
                    </button>
                  </div>
                </div>

                <div className="text-right w-36">
                  <div className="text-accent font-bold text-lg">R{item.price}</div>
                  <div className="text-ink-6 text-sm">R{(item.price * (item.quantity || 1)).toFixed(2)}</div>
                </div>
              </article>
            );
          })}

          {/* saved for later */}
          {saved.length > 0 && (
            <div>
              <h4 className="font-semibold mb-4">Saved for later</h4>
              <div className="flex gap-4 flex-wrap">
                {saved.map((s) => (
                  <div key={s.id} className="glass-effect p-3 rounded-mdx w-64">
                    <div className="h-36 bg-cover bg-center rounded-md" style={{ backgroundImage: `url(${s.images?.[0]})` }} />
                    <div className="mt-2">
                      <div className="font-semibold">{s.name}</div>
                      <div className="text-accent">R{s.price}</div>
                      <div className="mt-2 flex gap-2">
                        <button onClick={() => moveToCartFromSaved(s)} className="px-3 py-2 bg-accent text-paper rounded text-sm">Move to cart</button>
                        <button onClick={() => setSaved((arr) => arr.filter((i) => i.id !== s.id))} className="px-3 py-2 border border-line rounded text-sm">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <aside className="md:col-span-4 p-6 glass-effect rounded-lgx shadow-card flex flex-col gap-6 sticky top-6">
          <h2 className="text-2xl font-bold">Order Summary</h2>

          <div className="flex justify-between">
            <span className="text-ink-6">Subtotal</span>
            <span className="font-semibold">R{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-ink-6">Shipping</span>
            <span className="font-semibold">{shipping === 0 ? "Free" : `R${shipping}`}</span>
          </div>

          <div className="w-full flex gap-2">
            <input
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Coupon code"
              className="flex-1 px-3 py-2 bg-paper-soft rounded-md border border-line text-ink-2"
              aria-label="Coupon code"
            />
            <button onClick={applyCoupon} className="px-4 py-2 bg-accent text-paper rounded-md">
              Apply
            </button>
          </div>

          {appliedCoupon && (
            <div className="flex items-center justify-between text-sm text-ink-6">
              <div>
                <div className="font-semibold">{appliedCoupon.code}</div>
                <div className="text-xs text-ink-6">{appliedCoupon.label || "Coupon applied"}</div>
              </div>
              <button onClick={removeCoupon} className="text-accent text-sm">Remove</button>
            </div>
          )}

          <div className="flex justify-between text-lg">
            <span>Discount</span>
            <span className="text-accent">-R{discountAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center text-xl font-bold pt-2 border-t border-line">
            <span>Total</span>
            <span className="text-accent">R{total.toFixed(2)}</span>
          </div>

          <button
            onClick={() => {
              navigate("/checkout");
              notify("Proceeding to checkout");
            }}
            className="w-full px-4 py-3 bg-accent text-paper rounded-full font-semibold flex items-center justify-center gap-2"
            aria-label="Proceed to checkout"
          >
            Proceed to Checkout <HiArrowRight />
          </button>

          <button onClick={handleClear} className="w-full px-4 py-3 border border-line rounded-md text-ink-6">Clear Cart</button>

          <small className="text-xs text-ink-6">Free shipping for orders over R1500. Taxes calculated at checkout.</small>
        </aside>
      </div>
    </main>
  );
}
// ...existing code...