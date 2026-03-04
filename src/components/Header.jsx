import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-wrap">
        <div className="logo">beClothing</div>
        <nav className="nav">
          <Link className="site-nav-link active" to="/">Home</Link>
          <Link className="site-nav-link" to="/shop">Shop</Link>
          <Link className="site-nav-link" to="/about">About</Link>
          <Link className="site-nav-link" to="/contact">Contact</Link>
        </nav>
        <div className="util">
          <div title="Search" className="w-6 h-6 border rounded grid place-items-center">🔍</div>
          <div title="Cart" className="w-6 h-6 border rounded grid place-items-center">🛒</div>
          <div>Account ▾</div>
        </div>
      </div>
    </header>
  );
}
