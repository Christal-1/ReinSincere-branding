import React from "react";
import { Link } from "react-router-dom";

export default function NavButton({ to, children, variant = "primary", className = "", ...props }) {
  let baseStyle = "inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold transition";

  const variants = {
    primary: "bg-accent text-black hover:bg-accent-muted",
    secondary: "bg-paper-soft text-ink-2 border border-line hover:bg-paper",
    dark: "bg-black text-accent-300 hover:bg-gray-800",
  };

  return (
    <Link
      to={to}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
