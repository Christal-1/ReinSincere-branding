import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { 
  HiArrowLeft, 
  HiArrowRight, 
  HiHeart, 
  HiCheck, 
  HiStar, 
  HiOutlineShare, 
  HiX, 
  HiPlus, 
  HiMinus, 
  HiShieldCheck, 
  HiTruck,
  HiExclamation
} from "react-icons/hi";

export default function ProductDetail({ setNotification }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useMemo(() => products.find((p) => p.id === Number(id)), [id]);
  const { addToCart } = useCart();

  // State
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [showImageModal, setShowImageModal] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, [id]);

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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-paper text-ink-2">
        <div className="text-center">
          <HiExclamation className="text-6xl text-accent mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-ink-6 mb-6">The product you're looking for doesn't exist.</p>
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-paper rounded-lg font-bold hover:scale-105 transition"
          >
            Back to Shop <HiArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  const category = product.category.toLowerCase();
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      setError("Please select a size");
      return;
    }
    addToCart({
      ...product,
      selectedSize: selectedSize || "One Size",
      selectedColor,
      quantity,
      images: product.images
    });
    setNotification?.(`${product.name} added to cart`);
    setError("");
    setQuantity(1);
  };

  const handleShare = async () => {
    const url = window.location.href;
    const text = `Check out ${product.name} on ReinSincere!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text,
          url
        });
      } catch (err) {
        console.log("Share cancelled or failed");
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(url);
      setCopied(true);
      setNotification?.("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-paper text-ink-2 relative overflow-hidden">
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
          aspect-ratio: 1;
          overflow: hidden;
          border-radius: 1rem;
          cursor: zoom-in;
          transition: all 0.3s ease;
        }

        .image-gallery img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .image-gallery:hover img {
          transform: scale(1.08);
        }

        .image-thumbnail {
          aspect-ratio: 1;
          border-radius: 0.5rem;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .image-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .image-thumbnail:hover img {
          transform: scale(1.1);
        }

        .image-thumbnail.active {
          border-color: #C8A24D;
          box-shadow: 0 0 15px rgba(200, 162, 77, 0.4);
        }

        .option-selector {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .option-button {
          padding: 0.75rem 1.25rem;
          border: 2px solid rgba(200, 162, 77, 0.2);
          background: rgba(14, 47, 40, 0.5);
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          color: #F6F4EE;
        }

        .option-button:hover {
          border-color: #C8A24D;
        }

        .option-button.active {
          background: #C8A24D;
          color: #0E2F28;
          border-color: #C8A24D;
          box-shadow: 0 0 15px rgba(200, 162, 77, 0.4);
        }

        .quantity-control {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: 2px solid rgba(200, 162, 77, 0.2);
          border-radius: 0.5rem;
          padding: 0.5rem;
          background: rgba(14, 47, 40, 0.5);
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

        .quantity-btn:hover:not(:disabled) {
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
          padding: 0.375rem 0.875rem;
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
          border-b: 2px solid transparent;
        }

        .tab-button.active {
          color: #C8A24D;
          border-b-color: #C8A24D;
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

        .btn-hover-glow:hover {
          box-shadow: 0 0 30px rgba(200, 162, 77, 0.4);
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Floating background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute left-10 top-20 w-60 h-60 rounded-full bg-accent/6 blur-3xl floating" />
        <div className="absolute right-10 bottom-40 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-6 right-6 p-2 bg-accent text-paper rounded-full hover:scale-110 transition"
            aria-label="Close modal"
          >
            <HiX className="text-2xl" />
          </button>
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="max-w-4xl max-h-96 object-contain"
          />
        </div>
      )}

      <div className="relative z-10">
        {/* Breadcrumb */}
        <div className="px-6 lg:px-24 py-6 border-b border-line">
          <div className="flex items-center gap-2 text-sm text-ink-6 overflow-x-auto">
            <Link to="/" className="hover:text-accent transition whitespace-nowrap">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-accent transition whitespace-nowrap">Shop</Link>
            <span>/</span>
            <Link to={`/shop?category=${category}`} className="hover:text-accent transition capitalize whitespace-nowrap">{category}</Link>
            <span>/</span>
            <span className="text-accent truncate">{product.name}</span>
          </div>
        </div>

        <div className="px-6 lg:px-24 py-12">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 text-accent border border-line rounded-md hover:border-accent transition"
            aria-label="Go back"
          >
            <HiArrowLeft /> Back
          </button>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Gallery */}
            <div className={`transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
              <div
                className="image-gallery glass-effect border border-line mb-6"
                onClick={() => setShowImageModal(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setShowImageModal(true)}
                aria-label="Click to view full screen"
              >
                <img src={product.images[selectedImage]} alt={product.name} />
              </div>

              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`image-thumbnail glass-soft border border-line ${selectedImage === idx ? "active" : ""}`}
                    aria-label={`View image ${idx + 1}`}
                    aria-pressed={selectedImage === idx}
                  >
                    <img src={img} alt={`View ${idx + 1}`} />
                  </button>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 glass-soft rounded-lg border border-line flex items-center gap-3">
                  <HiTruck className="text-accent text-2xl flex-shrink-0" aria-hidden />
                  <div className="text-xs text-ink-6">
                    <p className="font-semibold text-accent mb-0.5">Free Shipping</p>
                    <p>Orders over R1500</p>
                  </div>
                </div>
                <div className="p-4 glass-soft rounded-lg border border-line flex items-center gap-3">
                  <HiShieldCheck className="text-accent text-2xl flex-shrink-0" aria-hidden />
                  <div className="text-xs text-ink-6">
                    <p className="font-semibold text-accent mb-0.5">30-Day Return</p>
                    <p>Money back guarantee</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className={`transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
              <div className="mb-6 stagger-item">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">{product.category}</p>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-2">{product.name}</h1>
                    <p className="text-ink-6">{product.subtitle}</p>
                  </div>
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-3 rounded-full transition ${isWishlisted ? "bg-red-600/20" : "glass-soft"}`}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    aria-pressed={isWishlisted}
                  >
                    <HiHeart className={`text-2xl ${isWishlisted ? "text-red-500" : "text-ink-6"}`} />
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-0.5" aria-label={`${product.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <HiStar key={i} className={`${i < Math.floor(product.rating) ? "text-accent" : "text-ink-6"}`} aria-hidden />
                    ))}
                  </div>
                  <span className="text-sm text-ink-6">{product.rating} ({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-4 mb-8">
                  <span className="text-4xl font-bold gradient-text">R{product.price.toLocaleString()}</span>
                  <span className="text-xl line-through text-ink-6">R{product.originalPrice.toLocaleString()}</span>
                  {discount > 0 && <span className="badge">{discount}% OFF</span>}
                </div>

                <p className="text-ink-6 leading-relaxed mb-8">{product.description}</p>
              </div>

              {/* Options */}
              <div className="space-y-6 mb-8 stagger-item" style={{ animationDelay: "0.1s" }}>
                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                  <fieldset>
                    <legend className="block text-sm font-semibold mb-3 text-accent">Color</legend>
                    <div className="option-selector">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`option-button capitalize ${selectedColor === color ? "active" : ""}`}
                          aria-pressed={selectedColor === color}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                )}

                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <fieldset>
                    <legend className="block text-sm font-semibold mb-3 text-accent">Size</legend>
                    <div className="option-selector">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`option-button ${selectedSize === size ? "active" : ""}`}
                          aria-pressed={selectedSize === size}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-ink-6 mt-3">
                      <Link to="#" className="text-accent hover:underline">Size guide →</Link>
                    </p>
                  </fieldset>
                )}

                {/* Quantity */}
                <div>
                  <label htmlFor="quantity" className="block text-sm font-semibold mb-3 text-accent">Quantity</label>
                  <div className="quantity-control w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="quantity-btn disabled:opacity-40"
                      aria-label="Decrease quantity"
                    >
                      <HiMinus />
                    </button>
                    <input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="quantity-input"
                      aria-label="Product quantity"
                    />
                    <button 
                      onClick={() => setQuantity(quantity + 1)} 
                      className="quantity-btn"
                      aria-label="Increase quantity"
                    >
                      <HiPlus />
                    </button>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-4 bg-red-600/20 border border-red-500 rounded-lg text-red-400 text-sm flex items-center gap-2" role="alert">
                  <HiX /> {error}
                </div>
              )}

              {/* CTA Buttons */}
              <div className="space-y-3 stagger-item" style={{ animationDelay: "0.2s" }}>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full py-4 px-6 bg-accent text-paper rounded-lg font-bold text-lg flex items-center justify-center gap-2 neon-border btn-hover-glow hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={product.inStock ? "Add to cart" : "Out of stock"}
                >
                  {product.inStock ? (
                    <>
                      Add to Cart <HiArrowRight />
                    </>
                  ) : (
                    "Out of Stock"
                  )}
                </button>

                <button 
                  onClick={handleShare}
                  className="w-full py-4 px-6 glass-effect border border-line rounded-lg font-bold text-accent hover:border-accent transition flex items-center justify-center gap-2"
                  aria-label="Share product"
                >
                  <HiOutlineShare /> {copied ? "Copied!" : "Share"}
                </button>
              </div>

              {/* Stock Status */}
              {product.inStock && (
                <div className="mt-4 p-3 glass-soft rounded-lg border border-line flex items-center gap-2 text-sm text-accent">
                  <HiCheck /> In stock — Ships within 24 hours
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-line mb-12 stagger-item" style={{ animationDelay: "0.25s" }}>
            <div className="flex gap-8 overflow-x-auto" role="tablist">
              {["description", "details", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-button capitalize ${activeTab === tab ? "active" : ""}`}
                  role="tab"
                  aria-selected={activeTab === tab}
                  aria-controls={`${tab}-panel`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mb-16 stagger-item" style={{ animationDelay: "0.3s" }}>
            {activeTab === "description" && (
              <div id="description-panel" role="tabpanel" className="space-y-6">
                <p className="text-ink-6 leading-relaxed text-lg">{product.description}</p>
                <div>
                  <h3 className="font-bold mb-4">Key Features:</h3>
                  <ul className="space-y-3">
                    {product.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <HiCheck className="text-accent flex-shrink-0 mt-0.5" aria-hidden />
                        <span className="text-ink-6">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div id="details-panel" role="tabpanel" className="grid md:grid-cols-2 gap-8">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="glass-soft p-6 rounded-lg border border-line">
                    <p className="font-semibold capitalize mb-2 text-accent">{key.replace(/_/g, " ")}</p>
                    <p className="text-ink-6">{value}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div id="reviews-panel" role="tabpanel" className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div>
                    <p className="text-4xl font-bold gradient-text">{product.rating}</p>
                    <p className="text-sm text-ink-6">out of 5</p>
                  </div>
                  <div className="flex gap-1" aria-label={`${product.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <HiStar key={i} className={`text-2xl ${i < Math.floor(product.rating) ? "text-accent" : "text-ink-6"}`} aria-hidden />
                    ))}
                  </div>
                </div>

                {product.reviews && product.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {product.reviews.map((review, idx) => (
                      <div key={idx} className="glass-soft p-6 rounded-lg border border-line">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold">{review.author}</p>
                            <p className="text-xs text-ink-6">{review.date}</p>
                          </div>
                          <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                            {[...Array(5)].map((_, i) => (
                              <HiStar key={i} className={`text-sm ${i < review.rating ? "text-accent" : "text-ink-6"}`} aria-hidden />
                            ))}
                          </div>
                        </div>
                        <p className="text-ink-6">{review.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-ink-6">No reviews yet. Be the first to review!</p>
                )}
              </div>
            )}
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-line pt-16 stagger-item" style={{ animationDelay: "0.35s" }}>
              <h2 className="text-3xl font-bold mb-8">You Might Also Like</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} {...p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}