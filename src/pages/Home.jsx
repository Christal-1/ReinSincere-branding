import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaYoutube, FaTiktok } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

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

  const categories = [
    { name: "Women", query: "women", image: "/assets/jacket.png" },
    { name: "Men", query: "men", image: "/assets/shoes.png" },
    { name: "Sweater", query: "sweater", image: "/assets/sweater.png" },
    { name: "Accessories", query: "accessories", image: "/assets/accessories.png" },
  ];

  const newArrivals = [
    { id: 1, image: "/assets/jacket.png", name: "Premium Jacket", price: "R149", badge: "New" },
    { id: 2, image: "/assets/shoes.png", name: "Classic Sneakers", price: "R99", badge: "Trending" },
    { id: 3, image: "/assets/sweater.png", name: "Wool Sweater", price: "R79", badge: "Hot" },
  ];

  const parallaxOffset = scrollY * 0.5;
  const rotateX = (mousePos.y - window.innerHeight / 2) * 0.01;
  const rotateY = (mousePos.x - window.innerWidth / 2) * 0.01;

  return (
    <div className="bg-paper text-ink-2 min-h-screen relative overflow-hidden perspective">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;600;700;900&display=swap');
        
        body {
          perspective: 1000px;
        }

        .perspective {
          perspective: 1000px;
        }

        .glass-effect {
          background: rgba(14, 47, 40, 0.7);
          backdrop-filter: blur(20px) saturate(150%);
          border: 1px solid rgba(200, 162, 77, 0.2);
        }

        .glow-effect {
          box-shadow: 0 0 40px rgba(200, 162, 77, 0.3), inset 0 0 40px rgba(200, 162, 77, 0.1);
        }

        .floating {
          animation: floating 6s ease-in-out infinite;
        }

        .floating-slow {
          animation: floating 8s ease-in-out infinite;
        }

        .floating-slower {
          animation: floating 10s ease-in-out infinite;
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
          transform: rotateX(10deg) rotateY(-10deg) translateZ(20px);
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

        .3d-flip {
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }

        .3d-flip:hover {
          transform: rotateY(180deg);
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

        .mesh-gradient {
          background: linear-gradient(135deg, 
            rgba(200, 162, 77, 0.15) 0%, 
            rgba(18, 62, 52, 0.5) 50%, 
            rgba(200, 162, 77, 0.1) 100%);
        }

        .neon-border {
          border: 2px solid #C8A24D;
          box-shadow: 0 0 20px rgba(200, 162, 77, 0.4), inset 0 0 20px rgba(200, 162, 77, 0.1);
        }
      `}</style>

      {/* ===================== */}
      {/* ANIMATED 3D BACKGROUND */}
      {/* ===================== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-accent/5 blur-3xl animate-pulse floating"
          style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
        />
        <div 
          className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-pulse floating-slow delay-700"
          style={{ transform: `translateY(${parallaxOffset * 0.2}px)` }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-accent/3 blur-3xl floating-slower opacity-50"
          style={{ transform: `translate(calc(-50% + ${mousePos.x * 0.02}px), calc(-50% + ${mousePos.y * 0.02}px))` }}
        />
      </div>

      {/* ===================== */}
      {/* HERO SECTION WITH 3D */}
      {/* ===================== */}
      <section className="relative px-6 lg:px-24 py-20 lg:py-32 overflow-hidden perspective">
        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left Content */}
          <div className={`flex flex-col gap-8 transform transition-all duration-1000 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-1 bg-accent rounded-full group-hover:w-20 transition-all duration-500" />
              <span className="eyebrow">Spring Collection 2026</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-display font-bold leading-tight">
              Elevate Your <span className="gradient-text">Style</span>
            </h1>

            <p className="text-lg text-ink-6 leading-relaxed max-w-md">
              Discover curated collections designed for the modern aesthetic. Premium quality, timeless elegance, and contemporary design.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/shop"
                className="btn group relative overflow-hidden px-8 py-4 font-semibold text-lg neon-border"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Shop Collection
                  <HiArrowRight className="transform group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Link>
              <button className="px-8 py-4 border-2 border-accent text-accent rounded-md font-semibold hover:bg-accent hover:text-paper transition-all glow-effect">
                View Lookbook
              </button>
            </div>

            {/* 3D Stats */}
            <div className="flex gap-8 pt-8 border-t border-line group">
              {[
                { value: "500+", label: "Products" },
                { value: "50K+", label: "Happy Customers" },
                { value: "100%", label: "Authentic" }
              ].map((stat, idx) => (
                <div 
                  key={idx}
                  className="tilt-card glass-effect p-4 rounded-mdx cursor-pointer bounce-in"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <p className="text-2xl font-bold text-accent">{stat.value}</p>
                  <p className="text-sm text-ink-6">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Hero Visual - 3D Hero */}
          <div 
            className={`relative transform transition-all duration-1000 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"}`}
            style={{
              transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY * 0.5}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* Main Hero Image - 3D Card */}
            <div className="relative">
              <div
                className="w-full h-96 lg:h-[580px] rounded-lgx bg-cover bg-center shadow-card hover:shadow-cardHover transition-all duration-300 tilt-card glow-effect"
                style={{ 
                  backgroundImage: "url('/assets/home.jpeg')",
                  transform: 'translateZ(30px)'
                }}
              />
              <div className="absolute inset-0 rounded-lgx bg-gradient-to-t from-paper/40 via-transparent to-transparent shimmer" />
            </div>

            {/* Floating 3D Cards */}
            <Link
              to="/shop?category=women"
              className="absolute -bottom-8 -left-12 w-48 h-60 rounded-lgx bg-cover bg-center card group overflow-hidden tilt-card glow-effect bounce-in"
              style={{ 
                backgroundImage: "url('/assets/collage.png')",
                animationDelay: '0.1s'
              }}
              onMouseEnter={() => setActiveCategory("women")}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-paper/90 via-transparent to-transparent flex items-end p-4">
                <div className="transform group-hover:translate-y-0 translate-y-2 transition-transform">
                  <p className="text-white font-semibold">Women's Collection</p>
                  <p className="text-accent-soft text-sm">Explore Now</p>
                </div>
              </div>
            </Link>

            <Link
              to="/shop?category=men"
              className="absolute -bottom-16 -right-8 w-48 h-60 rounded-lgx bg-cover bg-center card group overflow-hidden tilt-card glow-effect bounce-in"
              style={{ 
                backgroundImage: "url('/assets/collage2.png')",
                animationDelay: '0.2s'
              }}
              onMouseEnter={() => setActiveCategory("men")}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-paper/90 via-transparent to-transparent flex items-end p-4">
                <div className="transform group-hover:translate-y-0 translate-y-2 transition-transform">
                  <p className="text-white font-semibold">Men's Collection</p>
                  <p className="text-accent-soft text-sm">Explore Now</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* 3D Decorative Badge */}
        <div 
          className="absolute top-1/3 right-0 w-32 h-32 rounded-full border-2 border-accent/30 animate-spinSlow mix-blend-overlay glow-effect"
          style={{ transform: `translateY(${parallaxOffset * 0.1}px)` }}
        />
      </section>

      {/* ===================== */}
      {/* 3D FEATURED CATEGORIES */}
      {/* ===================== */}
      <section className="relative px-6 lg:px-24 py-20">
        <div className="text-center mb-16">
          <p className="eyebrow justify-center mb-4">Collections</p>
          <h2 className="text-5xl font-display font-bold mb-4 reveal">Shop by Category</h2>
          <p className="text-ink-6 max-w-2xl mx-auto blur-in">
            Curated collections handpicked for style and comfort
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, idx) => (
            <Link
              key={idx}
              to={`/shop?category=${category.query}`}
              className="group relative h-64 rounded-lgx overflow-hidden card tilt-card glow-effect bounce-in"
              style={{ 
                backgroundImage: `url('${category.image}')`,
                animationDelay: `${idx * 0.1}s`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-paper/90 via-paper/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 mesh-gradient" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-white">
                <h3 className="text-2xl font-bold group-hover:scale-110 transition-transform">{category.name}</h3>
                <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-y-0 translate-y-2">
                  <span className="text-sm">Shop</span>
                  <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===================== */}
      {/* PROMOTIONAL FEATURE - GLASS EFFECT */}
      {/* ===================== */}
      <section className="relative px-6 lg:px-24 py-20 my-12">
        <div 
          className="relative overflow-hidden rounded-lgx glass-effect p-12 lg:p-20 neon-border"
          style={{ transform: `translateY(${parallaxOffset * 0.05}px)` }}
        >
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl floating-slow" />
          
          <div className="relative z-10 max-w-3xl">
            <p className="eyebrow mb-4">Limited Time Offer</p>
            <h2 className="text-5xl lg:text-6xl font-display font-bold mb-6">
              Spring Sale <span className="gradient-text">Up to 50% Off</span>
            </h2>
            <p className="text-lg text-ink-6 mb-8">
              Discover the season's most wanted pieces at unbeatable prices. Premium quality meets exceptional value—available for a limited time only.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="btn px-8 py-4 font-semibold neon-border">
                Shop Sale
              </Link>
              <button className="px-8 py-4 border-2 border-accent text-accent rounded-md font-semibold hover:bg-accent hover:text-paper transition-all glow-effect">
                View Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* NEW ARRIVALS - WITH 3D */}
      {/* ===================== */}
      <section className="relative px-6 lg:px-24 py-20">
        <div className="text-center mb-16">
          <p className="eyebrow justify-center mb-4">Latest Drops</p>
          <h2 className="text-5xl font-display font-bold reveal">New Arrivals</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newArrivals.map((item, idx) => (
            <div 
              key={item.id} 
              className="group cursor-pointer bounce-in"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="relative mb-4 overflow-hidden">
                <div
                  className="h-72 rounded-lgx bg-cover bg-center card tilt-card glow-effect"
                  style={{ backgroundImage: `url('${item.image}')` }}
                >
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <button className="btn px-6 py-3 scale-75 group-hover:scale-100 transition-transform">Quick View</button>
                  </div>
                  <div className="absolute top-4 right-4 glass-effect px-3 py-1 rounded-mdx text-xs font-semibold text-accent">
                    {item.badge}
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold group-hover:gradient-text transition">{item.name}</h3>
              <p className="text-accent font-bold text-xl mt-2">{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== */}
      {/* ABOUT SECTION */}
      {/* ===================== */}
      <section className="relative px-6 lg:px-24 py-20 my-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div 
            className="h-96 rounded-lgx glass-effect neon-border floating-slow"
            style={{ transform: `translateY(${parallaxOffset * 0.15}px)` }}
          />
          <div>
            <p className="eyebrow mb-4 blur-in">Our Story</p>
            <h2 className="text-5xl font-display font-bold mb-6 reveal">About ReinSincere</h2>
            <p className="text-lg text-ink-6 leading-relaxed mb-6 blur-in">
              ReinSincere is a modern fashion brand dedicated to quality, style, and sophistication. We believe that fashion is more than just clothing—it's a form of self-expression.
            </p>
            <p className="text-lg text-ink-6 leading-relaxed mb-8 blur-in">
              Every piece in our collection is thoughtfully designed and meticulously crafted to elevate your wardrobe with timeless pieces and bold new trends.
            </p>
            <Link to="/about" className="btn px-8 py-4 inline-flex items-center gap-2 neon-border">
              Learn More <HiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* SOCIAL MEDIA - 3D BUTTONS */}
      {/* ===================== */}
      <section className="relative px-6 lg:px-24 py-20">
        <div className="text-center mb-12">
          <p className="eyebrow justify-center mb-4 blur-in">Connect With Us</p>
          <h2 className="text-5xl font-display font-bold reveal">Follow Our Journey</h2>
        </div>

        <div className="flex justify-center gap-8 mb-12 flex-wrap">
          {[
            { icon: FaInstagram, label: "Instagram", url: "https://instagram.com" },
            { icon: FaTwitter, label: "Twitter", url: "https://twitter.com" },
            { icon: FaYoutube, label: "YouTube", url: "https://youtube.com" },
            { icon: FaTiktok, label: "TikTok", url: "https://tiktok.com" },
          ].map((social, idx) => {
            const Icon = social.icon;
            return (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border-2 border-line hover:border-accent hover:bg-accent/10 flex items-center justify-center text-2xl text-ink-6 hover:text-accent transition-all group tilt-card glow-effect bounce-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
                aria-label={social.label}
              >
                <Icon className="group-hover:scale-125 transition-transform duration-300" />
              </a>
            );
          })}
        </div>

        <div className="text-center blur-in">
          <p className="text-ink-6">Join 50K+ followers for exclusive drops and behind-the-scenes content</p>
        </div>
      </section>

      {/* ===================== */}
      {/* CTA FOOTER */}
      {/* ===================== */}
      <section className="relative px-6 lg:px-24 py-20 border-t border-line">
        <div className="text-center">
          <h2 className="text-4xl font-display font-bold mb-6 reveal">Ready to elevate your wardrobe?</h2>
          <Link to="/shop" className="btn px-10 py-4 text-lg inline-flex items-center gap-2 neon-border bounce-in">
            Start Shopping <HiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}