import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import products from "../data/products"; 
import ProductCard from "../components/ProductCard";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";

export default function Shop() {
  const { addToCart } = useCart();
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category.charAt(0).toUpperCase() + p.category.slice(1))))];

  let displayedProducts = products.filter(
    (p) => filter === "All" || p.category.toLowerCase() === filter.toLowerCase()
  );

  if (sort === "Price: Low to High") displayedProducts.sort((a, b) => a.price - b.price);
  else if (sort === "Price: High to Low") displayedProducts.sort((a, b) => b.price - a.price);
  else if (sort === "Newest") displayedProducts = [...displayedProducts].reverse();

  const handleLoadMore = () => setVisibleCount(prev => prev + 3);

  return (
    <div className="bg-paper text-ink-2 min-h-screen relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;600;700;900&display=swap');

        .glass-effect {
          background: rgba(14, 47, 40, 0.7);
          backdrop-filter: blur(20px) saturate(150%);
          border: 1px solid rgba(200, 162, 77, 0.2);
        }

        .glow-effect {
          box-shadow: 0 0 40px rgba(200, 162, 77, 0.3), inset 0 0 40px rgba(200, 162, 77, 0.1);
        }

        .neon-border {
          border: 2px solid #C8A24D;
          box-shadow: 0 0 20px rgba(200, 162, 77, 0.4), inset 0 0 20px rgba(200, 162, 77, 0.1);
        }

        .floating {
          animation: floating 6s ease-in-out infinite;
        }

        .floating-slow {
          animation: floating 8s ease-in-out infinite;
        }

        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .tilt-card {
          transition: transform 0.3s cubic-bezier(0.23, 1, 0.320, 1);
          transform-style: preserve-3d;
        }

        .tilt-card:hover {
          transform: rotateX(8deg) rotateY(-8deg) translateZ(30px) scale(1.02);
        }

        .gradient-text {
          background: linear-gradient(135deg, #C8A24D 0%, #E6D8A3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .blur-in {
          animation: blur-in 0.8s ease-out forwards;
        }

        @keyframes blur-in {
          from {
            filter: blur(10px);
            opacity: 0;
          }
          to {
            filter: blur(0);
            opacity: 1;
          }
        }

        .reveal {
          animation: reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards;
        }

        @keyframes reveal {
          0% {
            clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
          }
          100% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
        }

        .bounce-in {
          animation: bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(40px);
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(1) translateY(0);
          }
        }

        .product-card {
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
          transform-style: preserve-3d;
        }

        .product-card:hover {
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.45);
          transform: translateY(-12px) scale(1.03);
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.23, 1, 0.320, 1);
        }

        .product-card:hover .product-image {
          transform: scale(1.15) rotate(2deg);
        }

        .product-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .product-card:hover .product-overlay {
          opacity: 1;
        }

        .product-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.3s ease;
        }

        .product-card:hover .product-info {
          transform: translateY(0);
          opacity: 1;
        }

        .category-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .category-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: #C8A24D;
          transition: left 0.3s ease;
          z-index: -1;
        }

        .category-button:hover::before {
          left: 0;
        }

        .mesh-gradient {
          background: linear-gradient(135deg, 
            rgba(200, 162, 77, 0.15) 0%, 
            rgba(18, 62, 52, 0.5) 50%, 
            rgba(200, 162, 77, 0.1) 100%);
        }

        .stagger-item {
          animation: bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
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

        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(200, 162, 77, 0.3); }
          50% { box-shadow: 0 0 40px rgba(200, 162, 77, 0.6); }
        }
      `}</style>

      {/* ===================== */}
      {/* ANIMATED BACKGROUND */}
      {/* ===================== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-accent/5 blur-3xl floating"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div 
          className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-accent/5 blur-3xl floating-slow delay-700"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
      </div>

      {/* ===================== */}
      {/* SHOP HEADER */}
      {/* ===================== */}
      <section className="relative px-6 lg:px-24 pt-12 pb-8 z-10">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-3 rounded-md border-2 border-line hover:border-accent hover:bg-accent/10 text-ink-6 hover:text-accent transition-all duration-300 group"
          >
            <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <div className="text-right">
            <p className="eyebrow text-accent">Shop Collection</p>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className={`text-5xl lg:text-7xl font-display font-bold mb-6 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Discover Our <span className="gradient-text">Collection</span>
          </h1>
          <p className={`text-lg text-ink-6 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
            Elevated essentials crafted for confidence, comfort, and style. Explore our handpicked selection of premium pieces.
          </p>
          <div className="mt-6 flex justify-center gap-4 text-sm text-ink-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>{displayedProducts.length} Products</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>Premium Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* FILTER & SORT BAR */}
      {/* ===================== */}
      <section className="relative px-6 lg:px-24 py-8 z-10 border-t border-b border-line">
        <div className="grid gap-6 lg:grid-cols-2 items-center">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setVisibleCount(3); }}
                className={`category-button px-5 py-2 rounded-full border text-sm font-medium transition-all stagger-item ${
                  filter === cat 
                    ? "bg-accent text-paper border-accent neon-border" 
                    : "border-line text-ink-6 hover:text-accent hover:border-accent glass-effect"
                }`}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex justify-end">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-6 py-3 rounded-md glass-effect text-sm font-medium text-ink-2 border border-line hover:border-accent focus:border-accent focus:outline-none transition-all cursor-pointer"
            >
              <option value="">Sort by: Default</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
              <option value="Newest">Newest First</option>
            </select>
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* PRODUCT GRID */}
      {/* ===================== */}
      <section className="relative px-6 lg:px-24 py-16 z-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {displayedProducts.slice(0, visibleCount).map((p, idx) => (
            <div
              key={p.id}
              className="stagger-item"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="product-card h-80 md:h-96 group relative overflow-hidden rounded-lgx">
                {/* Product Image */}
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${p.images[0]})` }}
                >
                  <img 
                    src={p.images[0]} 
                    alt={p.name}
                    className="product-image"
                  />
                </div>

                {/* Overlay */}
                <div className="product-overlay" />

                {/* Tag Badge */}
                {p.tag && (
                  <div className="absolute top-4 left-4 z-20 px-4 py-2 glass-effect rounded-full text-xs font-bold text-accent border border-accent animate-pulse">
                    {p.tag}
                  </div>
                )}

                {/* Product Info */}
                <div className="product-info z-10">
                  <h3 className="text-white text-xl font-bold mb-2">{p.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-accent font-bold text-lg">R{p.price}</p>
                    <div className="flex items-center gap-1 text-yellow-400 text-sm">
                      ★★★★★
                    </div>
                  </div>
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all">
                    <Link
                      to={`/product/${p.id}`}
                      className="flex-1 px-4 py-2 rounded-md border-2 border-white/50 hover:border-accent text-white hover:text-accent text-sm font-semibold flex items-center justify-center gap-2 transition-all group/link"
                    >
                      View Details
                      <HiArrowRight className="group-hover/link:translate-x-1 transition-transform text-xs" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {displayedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl font-bold text-ink-6 mb-4">No products found</p>
            <button
              onClick={() => setFilter("All")}
              className="btn px-8 py-3 neon-border"
            >
              View All Products
            </button>
          </div>
        )}
      </section>

      {/* ===================== */}
      {/* LOAD MORE BUTTON */}
      {/* ===================== */}
      {visibleCount < displayedProducts.length && (
        <section className="relative px-6 lg:px-24 py-8 z-10 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="group relative px-12 py-4 bg-accent text-paper font-bold rounded-full hover:bg-accent-muted transition-all neon-border text-lg flex items-center gap-2 bounce-in"
          >
            Load More Products
            <HiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </section>
      )}

      {/* ===================== */}
      {/* STATS SECTION */}
      {/* ===================== */}
      <section className="relative px-6 lg:px-24 py-16 z-10 border-t border-line">
        <div className="grid grid-cols-3 gap-6">
          {[
            { number: "500+", label: "Products" },
            { number: "50K+", label: "Happy Customers" },
            { number: "4.9★", label: "Average Rating" }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="text-center glass-effect p-6 rounded-mdx border border-line hover:border-accent transition-all group bounce-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <p className="text-3xl font-bold gradient-text mb-2">{stat.number}</p>
              <p className="text-sm text-ink-6 group-hover:text-accent transition">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== */}
      {/* NEWSLETTER CTA */}
      {/* ===================== */}
      <section className="relative px-6 lg:px-24 py-16 z-10">
        <div className="glass-effect rounded-lgx p-12 border border-line neon-border relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl floating" />
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">New Arrivals Weekly</h2>
            <p className="text-ink-6 mb-8">Subscribe to get exclusive access to our latest drops and special offers</p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-md glass-effect border border-line text-ink-2 placeholder-ink-6 focus:outline-none focus:border-accent transition-all"
              />
              <button className="btn px-8 py-3 neon-border font-bold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}