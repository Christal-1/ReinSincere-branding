import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { HiArrowRight, HiHeart, HiShare2, HiCheck, HiStar, HiX, HiPlus, HiMinus } from "react-icons/hi";

export default function Product({ setNotification }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // State
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("black");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [showImageModal, setShowImageModal] = useState(false);

  // Mock product data - replace with API call
  const product = useMemo(() => ({
    id,
    name: "Premium Minimal Top",
    price: 499,
    originalPrice: 699,
    rating: 4.8,
    reviews: 124,
    category: "Tops",
    colors: ["black", "white", "navy"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1600185364915-9b67b4380e2c?w=800",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800"
    ],
    description: "Crafted with premium materials and attention to detail, this minimal top embodies ReinSincere's philosophy of timeless elegance. Perfect for layering or wearing solo.",
    details: [
      "100% premium cotton",
      "Sustainable sourcing",
      "Machine washable",
      "Made in Portugal",
      "Free returns within 30 days"
    ],
    specs: {
      material: "100% Organic Cotton",
      fit: "Relaxed",
      care: "Cold wash, hang dry",
      weight: "180g"
    },
    reviews: [
      { author: "Sarah M.", rating: 5, text: "Absolutely love this! Perfect quality and fit.", date: "2 weeks ago" },
      { author: "James K.", rating: 5, text: "Best minimal top I own. Highly recommend.", date: "1 month ago" },
      { author: "Emma L.", rating: 4, text: "Great quality, slightly loose fit.", date: "6 weeks ago" }
    ]
  }), [id]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      images: product.images,
      size: selectedSize,
      color: selectedColor
    });
    setNotification?.(`${product.name} added to cart`);
    setQuantity(1);
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-paper text-ink-2 relative overflow-hidden">
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

        .image-gallery {
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
          border-radius: 1rem;
          cursor: zoom-in;
        }

        .image-gallery img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .image-gallery:hover img {
          transform: scale(1.05);
        }

        .image-thumbnail {
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .image-thumbnail.active {
          border-color: #C8A24D;
          box-shadow: 0 0 15px rgba(200, 162, 77, 0.4);
        }

        .image-thumbnail:hover {
          transform: scale(1.05);
        }

        .size-selector, .color-selector {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .size-option, .color-option {
          padding: 0.5rem 1rem;
          border: 2px solid rgba(200, 162, 77, 0.2);
          background: rgba(14, 47, 40, 0.5);
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .size-option:hover, .color-option:hover {
          border-color: #C8A24D;
        }

        .size-option.active, .color-option.active {
          background: #C8A24D;
          color: #0E2F28;
          border-color: #C8A24D;
          box-shadow: 0 0 15px rgba(200, 162, 77, 0.4);
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

        .review-card {
          transition: all 0.3s ease;
        }

        .review-card:hover {
          transform: translateX(4px);
        }

        .quantity-control {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: 2px solid rgba(200, 162, 77, 0.2);
          border-radius: 0.5rem;
          padding: 0.5rem;
          width: fit-content;
        }

        .quantity-btn {
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(200, 162, 77, 0.1);
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          color: #C8A24D;
          font-weight: bold;
          transition: all 0.2s ease;
        }

        .quantity-btn:hover {
          background: #C8A24D;
          color: #0E2F28;
        }

        .quantity-input {
          width: 3rem;
          text-align: center;
          background: transparent;
          border: none;
          color: #F6F4EE;
          font-weight: 600;
          font-size: 1rem;
        }

        .quantity-input:focus {
          outline: none;
        }

        .badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: #C8A24D;
          color: #0E2F28;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: bold;
        }

        .tab-button {
          padding: 1rem 1.5rem;
          border: none;
          background: transparent;
          cursor: pointer;
          font-weight: 600;
          color: rgba(159, 180, 173, 0.8);
          transition: all 0.3s ease;
          position: relative;
        }

        .tab-button.active {
          color: #C8A24D;
        }

        .tab-button.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #C8A24D;
        }

        .btn-hover-glow:hover {
          box-shadow: 0 0 30px rgba(200, 162, 77, 0.4);
        }

        .modal-backdrop {
          animation: fade-in 0.3s ease-out;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          animation: scale-in 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute left-10 top-20 w-60 h-60 rounded-full bg-accent/6 blur-3xl floating" style={{ transform: `translateY(${scrollY * 0.05}px)` }} />
        <div className="absolute right-10 bottom-40 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 modal-backdrop">
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-6 right-6 p-2 bg-accent text-paper rounded-full hover:scale-110 transition"
          >
            <HiX className="text-2xl" />
          </button>
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="max-w-4xl max-h-96 object-contain modal-content"
          />
        </div>
      )}

      <div className="relative z-10">
        {/* Breadcrumb */}
        <div className="px-6 lg:px-24 py-6 border-b border-line">
          <div className="flex items-center gap-2 text-sm text-ink-6">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-accent">Shop</Link>
            <span>/</span>
            <span className="text-accent">{product.name}</span>
          </div>
        </div>

        <div className="px-6 lg:px-24 py-12">
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* Gallery */}
            <div className={`transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
              <div
                className="image-gallery glass-effect border border-line mb-4"
                onClick={() => setShowImageModal(true)}
              >
                <img src={product.images[selectedImage]} alt={product.name} />
              </div>

              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`image-thumbnail ${selectedImage === idx ? "active" : ""}`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Trust Badge */}
              <div className="mt-6 p-4 glass-soft rounded-lg border border-line flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <div className="text-xs text-ink-6">
                  <p className="font-semibold text-accent mb-0.5">30-Day Money Back</p>
                  <p>Free returns on all items</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className={`transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
              <div className="mb-6 stagger-item">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="eyebrow mb-2">{product.category}</p>
                    <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                  </div>
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-3 rounded-full transition ${isWishlisted ? "bg-red-600/20" : "glass-soft"}`}
                  >
                    <HiHeart className={`text-2xl ${isWishlisted ? "text-red-500" : "text-ink-6"}`} />
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <HiStar key={i} className={`text-lg ${i < Math.floor(product.rating) ? "text-accent" : "text-ink-6"}`} />
                    ))}
                  </div>
                  <span className="text-sm text-ink-6">{product.rating} ({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-4xl font-bold gradient-text">R{product.price}</span>
                  <span className="text-xl line-through text-ink-6">R{product.originalPrice}</span>
                  <span className="badge">{discount}% OFF</span>
                </div>

                <p className="text-ink-6 leading-relaxed mb-6">{product.description}</p>
              </div>

              {/* Options */}
              <div className="space-y-6 mb-8 stagger-item" style={{ animationDelay: "0.1s" }}>
                {/* Colors */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-accent">Color</label>
                  <div className="color-selector">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`color-option capitalize ${selectedColor === color ? "active" : ""}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-accent">Size</label>
                  <div className="size-selector">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`size-option ${selectedSize === size ? "active" : ""}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-ink-6 mt-3">
                    <Link to="#" className="text-accent hover:underline">Size guide</Link>
                  </p>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-accent">Quantity</label>
                  <div className="quantity-control">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="quantity-btn"
                    >
                      <HiMinus />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="quantity-input"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="quantity-btn"
                    >
                      <HiPlus />
                    </button>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 stagger-item" style={{ animationDelay: "0.2s" }}>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full py-4 px-6 bg-accent text-paper rounded-lg font-bold text-lg flex items-center justify-center gap-2 neon-border btn-hover-glow hover:scale-105 transition disabled:opacity-50"
                >
                  {product.inStock ? (
                    <>
                      Add to Cart <HiArrowRight />
                    </>
                  ) : (
                    "Out of Stock"
                  )}
                </button>

                <button className="w-full py-4 px-6 glass-effect border border-line rounded-lg font-bold text-accent hover:border-accent transition flex items-center justify-center gap-2">
                  <HiShare2 /> Share
                </button>
              </div>

              {/* Stock Status */}
              {product.inStock && (
                <div className="mt-4 p-3 glass-soft rounded-lg border border-line flex items-center gap-2 text-sm text-accent">
                  <HiCheck />
                  In stock — Ships within 24 hours
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-line mb-12">
            <div className="flex gap-8">
              {["description", "details", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-button capitalize ${activeTab === tab ? "active" : ""}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-3xl stagger-item">
            {activeTab === "description" && (
              <div className="space-y-4">
                <p className="text-ink-6 leading-relaxed">{product.description}</p>
                <ul className="space-y-3">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <HiCheck className="text-accent flex-shrink-0" />
                      <span className="text-ink-6">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "details" && (
              <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key}>
                    <p className="font-semibold mb-2 capitalize">{key}</p>
                    <p className="text-ink-6">{value}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {product.reviews.map((review, idx) => (
                  <div key={idx} className="review-card glass-soft p-6 rounded-lg border border-line">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold">{review.author}</p>
                        <p className="text-xs text-ink-6">{review.date}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <HiStar key={i} className={`text-sm ${i < review.rating ? "text-accent" : "text-ink-6"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-ink-6">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Related Products */}
          <div className="mt-20 pt-12 border-t border-line">
            <h2 className="text-3xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((idx) => (
                <Link
                  key={idx}
                  to={`/product/${idx}`}
                  className="group glass-soft rounded-lg overflow-hidden border border-line hover:border-accent transition"
                >
                  <div
                    className="w-full aspect-square bg-cover bg-center group-hover:scale-110 transition-transform"
                    style={{ backgroundImage: `url(https://images.unsplash.com/photo-1600185364915-9b67b4380e2c?w=400&h=400)` }}
                  />
                  <div className="p-4">
                    <p className="font-semibold text-sm mb-1">Related Item {idx}</p>
                    <p className="text-accent font-bold">R499</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}