import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { CartProvider } from "./context/CartContext";
import FloatingCartButton from "./components/FloatingCartButton";

export default function App() {
  const [notification, setNotification] = useState("");

  // Show notification for 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-white text-gray-900 relative">

          <Navbar />

          {/* Toast Notification */}
          {notification && (
            <div className="fixed top-5 right-5 z-[9999]">
              <div className="bg-accent text-black px-6 py-3 rounded-lg shadow-lg animate-toast">
                {notification}
              </div>
            </div>
          )}

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home setNotification={setNotification} />} />
              <Route path="/shop" element={<Shop setNotification={setNotification} />} />
              <Route path="/product/:id" element={<ProductDetail setNotification={setNotification} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact setNotification={setNotification} />} />
              <Route path="/cart" element={<Cart setNotification={setNotification} />} />
              <Route path="/checkout" element={<Checkout setNotification={setNotification} />} />
            </Routes>
          </main>

          <Footer />
          <FloatingCartButton />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
