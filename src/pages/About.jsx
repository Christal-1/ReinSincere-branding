import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight, HiCheckCircle } from "react-icons/hi";

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [activeValue, setActiveValue] = useState(0);

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
          transform: rotateX(8deg) rotateY(-8deg) translateZ(20px) scale(1.02);
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

        .mesh-gradient {
          background: linear-gradient(135deg, 
            rgba(200, 162, 77, 0.15) 0%, 
            rgba(18, 62, 52, 0.5) 50%, 
            rgba(200, 162, 77, 0.1) 100%);
        }

        .timeline-connector {
          position: relative;
          padding-left: 2rem;
        }

        .timeline-connector::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #C8A24D, transparent);
        }

        .timeline-dot {
          position: absolute;
          left: -8px;
          top: 0;
          width: 16px;
          height: 16px;
          background: #C8A24D;
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(200, 162, 77, 0.6);
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
          animation: bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
        }

        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(200, 162, 77, 0.3); }
          50% { box-shadow: 0 0 40px rgba(200, 162, 77, 0.6); }
        }

        .counter {
          font-variant-numeric: tabular-nums;
        }

        .line-draw {
          animation: line-draw 2s ease-out forwards;
        }

        @keyframes line-draw {
          from {
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        .parallax {
          transform-style: preserve-3d;
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
        <div 
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-accent/3 blur-3xl floating-slower opacity-50"
          style={{ transform: `translate(calc(-50% + ${mousePos.x * 0.02}px), calc(-50% + ${mousePos.y * 0.02}px))` }}
        />
      </div>

      <div className="relative z-10">
        {/* ===================== */}
        {/* HERO SECTION */}
        {/* ===================== */}
        <section className="px-6 lg:px-24 pt-20 pb-12 text-center">
          <div className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="eyebrow justify-center mb-6">Our Philosophy</p>
            <h1 className="text-6xl lg:text-8xl font-display font-black leading-tight mb-8">
              About <span className="gradient-text">ReinSincere</span>
            </h1>
            <p className="text-xl text-ink-6 max-w-4xl mx-auto leading-relaxed">
              ReinSincere is a modern fashion brand built on intention, confidence, and timeless design. We create pieces that speak without shouting—elevating your wardrobe with thoughtful craftsmanship and authentic style.
            </p>
          </div>
        </section>

        {/* ===================== */}
        {/* BRAND STORY SECTION */}
        {/* ===================== */}
        <section className="px-6 lg:px-24 py-20 border-t border-line">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Story Text */}
            <div className={`space-y-8 blur-in`}>
              <div>
                <p className="eyebrow mb-6">Our Journey</p>
                <h2 className="text-5xl font-display font-bold mb-8">
                  Designed with <span className="gradient-text">Purpose</span>
                </h2>
              </div>

              <div className="space-y-6 text-ink-6 leading-relaxed text-lg">
                <p>
                  ReinSincere was founded with one fundamental belief — <span className="text-accent font-semibold">fashion should feel personal, effortless, and honest</span>. No fast trends. No shortcuts. Just pieces that move with you and grow with your journey.
                </p>
                <p>
                  Inspired by street culture and elevated minimalism, every collection is designed to empower individuality while maintaining clean, timeless silhouettes that transcend seasons and trends.
                </p>
                <p>
                  We believe that true style isn't about following—it's about knowing yourself and expressing that through the pieces you choose to wear every single day.
                </p>
              </div>

              <Link to="/shop" className="btn px-8 py-4 inline-flex items-center gap-2 neon-border group mt-4">
                Explore Collection
                <HiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            {/* Visual Card */}
            <div 
              className="glass-effect rounded-lgx p-12 border border-line neon-border tilt-card glow-effect bounce-in h-full flex flex-col justify-center"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="space-y-8">
                <div>
                  <p className="text-5xl font-black gradient-text mb-2">100%</p>
                  <p className="text-sm text-ink-6">Authentic & Intentional</p>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-accent to-transparent rounded-full" />
                <div>
                  <p className="text-ink-6 mb-4">Every stitch tells a story of dedication to quality and design excellence.</p>
                  <ul className="space-y-3">
                    {["Premium Fabrics", "Ethical Sourcing", "Timeless Design"].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm">
                        <HiCheckCircle className="text-accent text-lg flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== */}
        {/* VALUES SECTION */}
        {/* ===================== */}
        <section className="px-6 lg:px-24 py-20 border-t border-line">
          <div className="text-center mb-16">
            <p className="eyebrow justify-center mb-4">Foundation</p>
            <h2 className="text-5xl font-display font-bold mb-6 reveal">What We Stand For</h2>
            <p className="text-ink-6 max-w-2xl mx-auto">
              Three core values that guide every decision we make
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "✨",
                title: "Intentional Design",
                desc: "Every cut, fabric, and stitch is carefully considered. No detail is overlooked.",
                features: ["Precision Crafting", "Thoughtful Details", "Design Excellence"]
              },
              {
                icon: "💎",
                title: "Premium Quality",
                desc: "We focus on comfort, durability, and elevated finishes that last.",
                features: ["Premium Materials", "Long-lasting", "Enhanced Comfort"]
              },
              {
                icon: "🔥",
                title: "Authentic Identity",
                desc: "Built for individuals who value confidence and originality in everything.",
                features: ["Unique Style", "Self-Expression", "Bold Confidence"]
              }
            ].map((value, idx) => (
              <div
                key={idx}
                onClick={() => setActiveValue(idx)}
                className={`stagger-item p-8 rounded-lgx border transition-all cursor-pointer group ${
                  activeValue === idx
                    ? "glass-effect neon-border glow-effect scale-105"
                    : "glass-effect border-line hover:border-accent"
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-4xl mb-4 transform group-hover:scale-125 transition-transform">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-ink-6 mb-6 leading-relaxed">{value.desc}</p>
                <div className="space-y-2 pt-6 border-t border-line">
                  {value.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-ink-6">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== */}
        {/* TIMELINE SECTION */}
        {/* ===================== */}
        <section className="px-6 lg:px-24 py-20 border-t border-line">
          <div className="text-center mb-16">
            <p className="eyebrow justify-center mb-4">Evolution</p>
            <h2 className="text-5xl font-display font-bold reveal">Our Journey</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                year: "2024",
                title: "Concept & Vision",
                desc: "ReinSincere was conceptualized as a response to the demand for authentic, intentional fashion."
              },
              {
                year: "2025",
                title: "Launch & Growth",
                desc: "First collection released to incredible reception. Our community grew stronger every day."
              },
              {
                year: "2026",
                title: "Global Expansion",
                desc: "Brand expansion with new collections and international presence becoming reality."
              }
            ].map((milestone, idx) => (
              <div 
                key={idx} 
                className="timeline-connector mb-12 stagger-item"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="timeline-dot" />
                <div className="glass-effect p-8 rounded-lgx border border-line hover:border-accent transition-all group">
                  <p className="text-sm text-accent font-semibold mb-2">0{idx + 1}</p>
                  <h3 className="text-2xl font-bold mb-3">{milestone.year}</h3>
                  <p className="text-lg font-semibold mb-3">{milestone.title}</p>
                  <p className="text-ink-6 leading-relaxed">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== */}
        {/* CRAFTSMANSHIP SECTION */}
        {/* ===================== */}
        <section className="px-6 lg:px-24 py-20 border-t border-line">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 blur-in">
              <div>
                <p className="eyebrow mb-4">Excellence</p>
                <h2 className="text-5xl font-display font-bold mb-6">
                  Quality & <span className="gradient-text">Craftsmanship</span>
                </h2>
              </div>
              <p className="text-lg text-ink-6 leading-relaxed">
                We prioritize premium fabrics, responsible sourcing, and long-lasting construction. ReinSincere pieces are made to be worn, lived in, and trusted — season after season.
              </p>
              <div className="space-y-4">
                {["Premium Fabric Selection", "Expert Tailoring", "Quality Control", "Durability Testing"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bounce-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <HiCheckCircle className="text-accent" />
                    </div>
                    <span className="text-ink-6">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div 
              className="glass-effect rounded-lgx p-12 border border-line neon-border glow-effect tilt-card bounce-in h-96 flex flex-col justify-center"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="text-center space-y-6">
                <div>
                  <p className="text-6xl font-black gradient-text mb-2">10+</p>
                  <p className="text-sm text-ink-6">Years of Combined Expertise</p>
                </div>
                <div className="w-12 h-1 bg-gradient-to-r from-accent to-transparent mx-auto rounded-full" />
                <p className="text-ink-6 leading-relaxed">
                  Our team brings decades of fashion industry experience to every collection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== */}
        {/* SUSTAINABILITY SECTION */}
        {/* ===================== */}
        <section className="px-6 lg:px-24 py-20 border-t border-line">
          <div className="glass-effect rounded-lgx p-12 lg:p-20 border border-line neon-border relative overflow-hidden">
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl floating" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="text-center space-y-8">
                <div>
                  <p className="eyebrow justify-center mb-4">Responsibility</p>
                  <h2 className="text-5xl font-display font-bold mb-6">
                    <span className="gradient-text">Sustainability</span> at Our Core
                  </h2>
                </div>

                <p className="text-lg text-ink-6 leading-relaxed">
                  Our approach focuses on small-batch production, reduced waste, and timeless design to avoid fast-fashion cycles. Sustainability is a journey — and we're committed to improving every step.
                </p>

                <div className="grid md:grid-cols-3 gap-6 pt-8">
                  {[
                    { icon: "🌱", label: "Eco-Friendly" },
                    { icon: "♻️", label: "Small-Batch" },
                    { icon: "🤝", label: "Ethical" }
                  ].map((item, idx) => (
                    <div key={idx} className="text-center stagger-item" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <p className="text-4xl mb-2">{item.icon}</p>
                      <p className="text-sm font-semibold text-accent">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== */}
        {/* STATS SECTION */}
        {/* ===================== */}
        <section className="px-6 lg:px-24 py-20 border-t border-line">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: "50K+", label: "Happy Customers" },
              { number: "500+", label: "Products" },
              { number: "100%", label: "Authentic" },
              { number: "4.9★", label: "Average Rating" }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="glass-effect p-8 rounded-mdx border border-line hover:border-accent hover:glow-effect transition-all text-center stagger-item"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <p className="text-4xl font-black gradient-text mb-2">{stat.number}</p>
                <p className="text-sm text-ink-6">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== */}
        {/* CLOSING VISION */}
        {/* ===================== */}
        <section className="px-6 lg:px-24 py-20 text-center border-t border-line">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-5xl lg:text-6xl font-display font-black leading-tight">
              ReinSincere is more than <span className="gradient-text">clothing</span>
            </h2>
            <p className="text-2xl text-ink-6 font-semibold">
              It's a mindset. A standard. A statement.
            </p>
            <p className="text-lg text-ink-6 leading-relaxed">
              Every piece you wear carries our commitment to excellence, authenticity, and timeless style. Join us in redefining what it means to dress with intention.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link to="/shop" className="btn px-10 py-4 neon-border group inline-flex items-center justify-center gap-2">
                Shop Now
                <HiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <button className="px-10 py-4 border-2 border-accent text-accent rounded-md font-semibold hover:bg-accent hover:text-paper transition-all">
                Get In Touch
              </button>
            </div>
          </div>
        </section>

        {/* ===================== */}
        {/* NEWSLETTER CTA */}
        {/* ===================== */}
        <section className="px-6 lg:px-24 py-20">
          <div className="glass-effect rounded-lgx p-12 border border-line neon-border relative overflow-hidden">
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl floating-slow" />
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-4">Stay in the Loop</h2>
              <p className="text-ink-6 mb-8">Subscribe to our newsletter for exclusive drops, behind-the-scenes content, and insider access.</p>
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
    </div>
  );
}