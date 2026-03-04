import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { HiArrowRight, HiCheckCircle, HiLockClosed, HiShieldCheck } from "react-icons/hi";

export default function Checkout({ setNotification }) {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [agreedTerms, setAgreedTerms] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });

  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0),
    [cart]
  );

  const deliveryFee = subtotal > 2000 ? 0 : 150;
  const total = subtotal + deliveryFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Valid email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.province.trim()) newErrors.province = "Province is required";
    if (!form.postalCode.trim()) newErrors.postalCode = "Postal code is required";

    if (selectedPayment === "card") {
      if (!form.cardName.trim()) newErrors.cardName = "Cardholder name is required";
      if (!form.cardNumber.replace(/\s/g, "").match(/^\d{16}$/))
        newErrors.cardNumber = "Valid 16-digit card number required";
      if (!form.cardExpiry.match(/^\d{2}\/\d{2}$/))
        newErrors.cardExpiry = "Format: MM/YY";
      if (!form.cardCVC.match(/^\d{3,4}$/))
        newErrors.cardCVC = "Valid CVC required";
    }

    if (!agreedTerms) newErrors.terms = "Please agree to terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setNotification?.("Please fill all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      navigate("/order-success", { 
        state: { 
          order: cart, 
          total, 
          deliveryFee,
          orderNumber: `RS-${Date.now()}`,
          customerEmail: form.email
        } 
      });
      setIsSubmitting(false);
    }, 2000);
  };

  if (!cart.length) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-paper text-ink-2">
        <section className="max-w-md w-full glass-effect rounded-lgx shadow-card p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-ink-6 mb-6">Add items before proceeding to checkout.</p>
          <Link to="/shop" className="btn px-8 py-3 bg-accent text-paper rounded-full inline-flex items-center gap-2">
            Continue Shopping <HiArrowRight />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 lg:px-24 py-12 bg-paper text-ink-2 relative overflow-hidden">
      <style>{`
        .glass-effect {
          background: rgba(14, 47, 40, 0.65);
          backdrop-filter: blur(16px) saturate(120%);
          border: 1px solid rgba(200, 162, 77, 0.12);
        }

        .glass-soft {
          background: rgba(14, 47, 40, 0.5);
          backdrop-filter: blur(10px) saturate(100%);
          border: 1px solid rgba(200, 162, 77, 0.08);
        }

        .neon-border {
          border: 2px solid #C8A24D;
          box-shadow: 0 0 20px rgba(200, 162, 77, 0.3);
        }

        .gradient-text {
          background: linear-gradient(135deg, #C8A24D 0%, #E6D8A3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .form-input {
          position: relative;
          overflow: hidden;
        }

        .form-input input,
        .form-input select {
          width: 100%;
          padding: 0.875rem;
          background: rgba(14, 47, 40, 0.5);
          border: 2px solid rgba(200, 162, 77, 0.15);
          border-radius: 0.5rem;
          color: #F6F4EE;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .form-input input::placeholder {
          color: rgba(159, 180, 173, 0.6);
        }

        .form-input input:focus,
        .form-input select:focus {
          outline: none;
          border-color: #C8A24D;
          background: rgba(14, 47, 40, 0.8);
          box-shadow: 0 0 20px rgba(200, 162, 77, 0.3), inset 0 0 20px rgba(200, 162, 77, 0.1);
        }

        .error-text {
          animation: shake 0.3s ease-in-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .payment-option {
          transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
          cursor: pointer;
        }

        .payment-option:hover {
          transform: translateY(-2px);
        }

        .payment-option.active {
          box-shadow: 0 0 30px rgba(200, 162, 77, 0.4);
        }

        .floating {
          animation: floating 6s ease-in-out infinite;
        }

        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stagger-item {
          animation: fade-in-up 0.6s ease-out both;
        }
      `}</style>

      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute left-10 top-20 w-60 h-60 rounded-full bg-accent/5 blur-3xl floating" />
        <div className="absolute right-10 bottom-40 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <header className={`mb-12 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-bold mb-2">Complete Your Order</h1>
              <p className="text-ink-6">Secure checkout with ReinSincere</p>
            </div>
            <div className="flex items-center gap-3 glass-effect px-6 py-3 rounded-full">
              <HiLockClosed className="text-accent" />
              <span className="text-sm font-semibold">SSL Secured</span>
            </div>
          </div>
        </header>

        {/* Progress Steps */}
        <div className="mb-12 flex items-center justify-between max-w-2xl">
          {[
            { step: 1, label: "Cart", done: true },
            { step: 2, label: "Shipping", done: false },
            { step: 3, label: "Payment", done: false }
          ].map((item, idx) => (
            <React.Fragment key={item.step}>
              <div className="flex flex-col items-center stagger-item" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
                  item.done ? "bg-accent text-paper" : "bg-accent/20 text-accent"
                }`}>
                  {item.done ? <HiCheckCircle /> : item.step}
                </div>
                <span className="text-xs text-ink-6">{item.label}</span>
              </div>
              {idx < 2 && <div className={`flex-1 h-1 mx-4 rounded-full ${item.done ? "bg-accent" : "bg-line"}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FORM */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
            {/* Shipping Section */}
            <section className="glass-effect rounded-lgx p-8 border border-line stagger-item" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-accent text-paper flex items-center justify-center text-xs font-bold">1</div>
                Shipping Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { label: "Full Name", name: "name" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Phone Number", name: "phone" },
                  { label: "Address", name: "address", span: "md:col-span-2" },
                  { label: "City", name: "city" },
                  { label: "Province", name: "province" },
                  { label: "Postal Code", name: "postalCode" },
                ].map((field) => (
                  <div key={field.name} className={`form-input ${field.span || ""}`}>
                    <label className="block mb-2 text-sm text-accent font-semibold">{field.label}</label>
                    <input
                      type={field.type || "text"}
                      name={field.name}
                      required
                      value={form[field.name]}
                      onChange={handleChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                      className={errors[field.name] ? "error-text" : ""}
                    />
                    {errors[field.name] && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        ⚠ {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Payment Section */}
            <section className="glass-effect rounded-lgx p-8 border border-line stagger-item" style={{ animationDelay: "0.3s" }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-accent text-paper flex items-center justify-center text-xs font-bold">2</div>
                Payment Method
              </h2>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { id: "card", label: "Credit Card", icon: "💳" },
                  { id: "paypal", label: "PayPal", icon: "🅿️" },
                  { id: "transfer", label: "Bank Transfer", icon: "🏦" }
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedPayment(method.id)}
                    className={`payment-option p-4 rounded-lg border-2 transition-all ${
                      selectedPayment === method.id
                        ? "glass-effect neon-border active"
                        : "glass-soft border-line hover:border-accent"
                    }`}
                  >
                    <div className="text-2xl mb-2">{method.icon}</div>
                    <p className="font-semibold text-sm">{method.label}</p>
                  </button>
                ))}
              </div>

              {/* Card Details */}
              {selectedPayment === "card" && (
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { label: "Cardholder Name", name: "cardName", span: "md:col-span-2" },
                    { label: "Card Number", name: "cardNumber", placeholder: "1234 5678 9012 3456", span: "md:col-span-2" },
                    { label: "Expiry (MM/YY)", name: "cardExpiry", placeholder: "12/25" },
                    { label: "CVC", name: "cardCVC", placeholder: "123" }
                  ].map((field) => (
                    <div key={field.name} className={`form-input ${field.span || ""}`}>
                      <label className="block mb-2 text-sm text-accent font-semibold">{field.label}</label>
                      <input
                        type="text"
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={errors[field.name] ? "error-text" : ""}
                      />
                      {errors[field.name] && (
                        <p className="text-red-400 text-xs mt-1">⚠ {errors[field.name]}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {selectedPayment === "paypal" && (
                <div className="p-6 glass-soft rounded-lg border border-line">
                  <p className="text-ink-6">You will be redirected to PayPal to complete your payment securely.</p>
                </div>
              )}

              {selectedPayment === "transfer" && (
                <div className="p-6 glass-soft rounded-lg border border-line space-y-3">
                  <p className="font-semibold">Bank Transfer Details</p>
                  <div className="text-sm text-ink-6 space-y-1">
                    <p>Bank: ReinSincere Bank</p>
                    <p>Account: 1234567890</p>
                    <p>Reference: Your order number (sent via email)</p>
                  </div>
                </div>
              )}
            </section>

            {/* Terms */}
            <div className="flex items-start gap-3 p-4 glass-soft rounded-lg border border-line stagger-item" style={{ animationDelay: "0.4s" }}>
              <input
                type="checkbox"
                id="terms"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="w-5 h-5 rounded border-accent bg-paper accent-accent mt-1 cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-ink-6 cursor-pointer">
                I agree to the <span className="text-accent font-semibold">terms and conditions</span> and <span className="text-accent font-semibold">privacy policy</span>
              </label>
              {errors.terms && <p className="text-red-400 text-xs">⚠ {errors.terms}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !agreedTerms}
              className={`w-full py-4 px-6 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all neon-border stagger-item ${
                isSubmitting
                  ? "bg-accent/50 text-paper/50 cursor-not-allowed"
                  : "btn bg-accent text-paper hover:scale-105"
              }`}
              style={{ animationDelay: "0.5s" }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-transparent border-t-paper rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Complete Purchase <HiArrowRight />
                </>
              )}
            </button>
          </form>

          {/* ORDER SUMMARY STICKY */}
          <aside className="lg:col-span-1 stagger-item" style={{ animationDelay: "0.3s" }}>
            <div className="glass-effect rounded-lgx p-8 border border-line sticky top-6 shadow-card">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex gap-3 pb-4 border-b border-line/50 last:border-b-0">
                    <div
                      className="w-16 h-16 rounded-md bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url(${item.images?.[0]})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{item.name}</p>
                      <p className="text-xs text-ink-6">Qty: {item.quantity}</p>
                      <p className="text-accent font-bold text-sm">R{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 text-sm pt-6 border-t border-line">
                <div className="flex justify-between">
                  <span className="text-ink-6">Subtotal</span>
                  <span className="font-semibold">R{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-6">Delivery</span>
                  <span className="font-semibold">{deliveryFee === 0 ? "Free" : `R${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold pt-4 border-t border-line">
                  <span>Total</span>
                  <span className="gradient-text text-2xl">R{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-4 glass-soft rounded-lg border border-line flex items-center gap-3">
                <HiShieldCheck className="text-accent text-xl flex-shrink-0" />
                <div className="text-xs text-ink-6">
                  <p className="font-semibold text-accent mb-1">Secure Checkout</p>
                  <p>Your payment info is encrypted and safe</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}