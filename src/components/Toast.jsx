// src/components/Toast.jsx
import { useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function Toast() {
  const { notification, handleCloseNotification } = useCart();

  // Auto-hide after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(handleCloseNotification, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, handleCloseNotification]);

  if (!notification) return null;

  return (
    <div className="fixed top-5 right-5 z-[9999] bg-accent text-black px-6 py-3 rounded-lg shadow-lg animate-slide-in">
      {notification}
    </div>
  );
}
