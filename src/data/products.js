const products = [
  // ====== JACKETS ======
  {
    id: 1,
    name: "Essential Jacket",
    subtitle: "Premium layering piece for every season",
    price: 899,
    originalPrice: 1299,
    category: "jackets",
    images: [
      "/assets/jacket.png",
      "/assets/jacket2.png",
      "/assets/jacket3.png",
      "/assets/jacket4.png"
    ],
    tag: "NEW",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["black", "navy", "khaki", "grey"],
    gender: "Unisex",
    material: "100% Cotton Blend",
    fit: "Relaxed",
    rating: 4.8,
    reviews: 156,
    inStock: true,
    description: "Crafted with premium cotton blend fabric, this essential jacket offers timeless style with exceptional comfort. Perfect for layering or wearing solo.",
    details: [
      "Premium cotton blend fabric",
      "Sustainable sourcing",
      "Machine washable",
      "Made in Portugal",
      "Free returns within 30 days",
      "Eco-friendly packaging"
    ],
    specs: {
      material: "65% Cotton, 35% Polyester",
      fit: "Relaxed",
      care: "Cold wash, lay flat to dry",
      weight: "420g",
      sleeve_type: "Long sleeves",
      pockets: "Yes (4)"
    },
    tags: ["new", "bestseller", "sustainable"],
    sku: "ESS-JACK-001"
  },

  {
    id: 2,
    name: "Street Pants",
    subtitle: "Urban comfort meets contemporary style",
    price: 699,
    originalPrice: 999,
    category: "pants",
    images: [
      "/assets/pants.png",
      "/assets/pants2.png",
      "/assets/pants3.png",
      "/assets/pants4.png"
    ],
    tag: "",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["black", "grey", "navy", "olive"],
    gender: "Unisex",
    material: "Polyester Blend",
    fit: "Tapered",
    rating: 4.6,
    reviews: 98,
    inStock: true,
    description: "Designed for the modern urbanite, these street pants combine comfort and style. Features moisture-wicking technology and a tapered fit.",
    details: [
      "Moisture-wicking technology",
      "Tapered fit for modern silhouette",
      "Multiple pocket design",
      "Reinforced seams",
      "Easy care fabric",
      "Versatile styling options"
    ],
    specs: {
      material: "60% Polyester, 40% Cotton",
      fit: "Tapered",
      care: "Machine wash, tumble dry low",
      weight: "350g",
      inseam_options: "28-36 inches",
      rise: "Mid-rise"
    },
    tags: ["bestseller", "versatile"],
    sku: "STR-PANT-001"
  },

  {
    id: 3,
    name: "Minimal Top",
    subtitle: "Timeless elegance in minimalist form",
    price: 499,
    originalPrice: 699,
    category: "tops",
    images: [
      "/assets/top.png",
      "/assets/top2.png",
      "/assets/top3.png"
    ],
    tag: "",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["white", "black", "grey", "cream"],
    gender: "Unisex",
    material: "100% Organic Cotton",
    fit: "Regular",
    rating: 4.9,
    reviews: 312,
    inStock: true,
    description: "Perfect for layering or wearing solo, this minimal top embodies ReinSincere's philosophy of timeless elegance. Crafted with premium organic cotton.",
    details: [
      "100% organic cotton",
      "Sustainable sourcing",
      "GOTS certified",
      "Machine washable",
      "Made in Portugal",
      "Free returns within 30 days"
    ],
    specs: {
      material: "100% Organic Cotton",
      fit: "Regular",
      care: "Cold wash, hang dry",
      weight: "180g",
      neckline: "Crew neck",
      sleeve_length: "Short sleeves"
    },
    tags: ["bestseller", "organic", "sustainable"],
    sku: "MIN-TOP-001"
  },

  {
    id: 4,
    name: "Urban Sneakers",
    subtitle: "Street-ready comfort for everyday adventures",
    price: 1299,
    originalPrice: 1799,
    category: "shoes",
    images: [
      "/assets/shoes.png",
      "/assets/shoes2.png",
      "/assets/shoes3.png",
      "/assets/shoes4.png"
    ],
    tag: "LIMITED",
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    colors: ["white", "black", "grey", "navy"],
    gender: "Unisex",
    material: "Leather + Rubber",
    fit: "True to size",
    rating: 4.7,
    reviews: 234,
    inStock: true,
    description: "Premium leather sneakers designed for urban exploration. Features ergonomic insole and breathable lining for all-day comfort.",
    details: [
      "Premium genuine leather",
      "Recycled rubber sole",
      "Ergonomic insole",
      "Breathable lining",
      "Handcrafted in Portugal",
      "Limited edition design"
    ],
    specs: {
      material: "Premium Leather + Recycled Rubber",
      fit: "True to size",
      care: "Leather cleaner recommended",
      weight: "280g per shoe",
      sole_type: "Rubber",
      lining: "Breathable mesh"
    },
    tags: ["limited", "premium", "handcrafted"],
    sku: "URB-SNEAK-001"
  },

  {
    id: 5,
    name: "Stylish Sweater",
    subtitle: "Cozy luxury for cooler days",
    price: 850,
    originalPrice: 1199,
    category: "sweaters",
    images: [
      "/assets/sweater.png",
      "/assets/sweater2.png",
      "/assets/sweater3.png"
    ],
    tag: "",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["cream", "grey", "navy", "charcoal"],
    gender: "Unisex",
    material: "Wool Blend",
    fit: "Relaxed",
    rating: 4.8,
    reviews: 187,
    inStock: true,
    description: "Luxuriously soft wool blend sweater perfect for layering. Features a relaxed fit and premium construction for lasting comfort.",
    details: [
      "Premium wool blend",
      "Breathable fabric",
      "Anti-pilling treatment",
      "Relaxed silhouette",
      "Sustainable production",
      "Machine washable at low temp"
    ],
    specs: {
      material: "60% Merino Wool, 40% Polyester",
      fit: "Relaxed",
      care: "Hand wash or delicate machine wash",
      weight: "450g",
      neckline: "Crew neck",
      cuff_type: "Ribbed"
    },
    tags: ["bestseller", "premium", "seasonal"],
    sku: "STY-SWEAT-001"
  },

  // ====== ACCESSORIES ======
  {
    id: 6,
    name: "Classic Hat",
    subtitle: "Timeless headwear for any occasion",
    price: 350,
    originalPrice: 450,
    category: "accessories",
    images: [
      "/assets/hat.png",
      "/assets/hat2.png",
      "/assets/hat3.png"
    ],
    tag: "NEW",
    sizes: ["One Size (Adjustable)"],
    colors: ["black", "grey", "navy", "beige"],
    gender: "Unisex",
    material: "100% Wool",
    fit: "One Size",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    description: "Classic wool hat with adjustable fit. Perfect accessory for completing any outfit with understated elegance.",
    details: [
      "100% premium wool",
      "Adjustable back strap",
      "Breathable fabric",
      "Structured design",
      "One size fits most",
      "Sustainable sourcing"
    ],
    specs: {
      material: "100% Wool",
      fit: "One Size (Adjustable)",
      care: "Spot clean or dry clean",
      weight: "120g",
      style: "Baseball cap",
      visor: "Yes"
    },
    tags: ["new", "accessory", "sustainable"],
    sku: "CLS-HAT-001"
  },

  {
    id: 7,
    name: "Warm Scarf",
    subtitle: "Essential warmth wrapped in luxury",
    price: 450,
    originalPrice: 599,
    category: "accessories",
    images: [
      "/assets/scarf.png",
      "/assets/scarf2.png",
      "/assets/scarf3.png"
    ],
    tag: "",
    sizes: ["One Size"],
    colors: ["black", "cream", "grey", "burgundy", "forest_green"],
    gender: "Unisex",
    material: "100% Wool",
    fit: "One Size",
    rating: 4.7,
    reviews: 145,
    inStock: true,
    description: "Premium wool scarf offering warmth without bulk. Versatile piece that elevates any winter wardrobe.",
    details: [
      "100% premium wool",
      "Lightweight yet warm",
      "Fringe detail",
      "Multiple color options",
      "Easy care",
      "Made in Portugal"
    ],
    specs: {
      material: "100% Merino Wool",
      fit: "One Size",
      care: "Gentle hand wash",
      weight: "200g",
      length: "180cm",
      width: "30cm"
    },
    tags: ["seasonal", "accessory", "bestseller"],
    sku: "WRM-SCARF-001"
  },

  {
    id: 8,
    name: "Leather Belt",
    subtitle: "Timeless accessory for refined style",
    price: 500,
    originalPrice: 699,
    category: "accessories",
    images: [
      "/assets/belt.png",
      "/assets/belt2.png",
      "/assets/belt3.png"
    ],
    tag: "",
    sizes: ["30", "32", "34", "36", "38", "40"],
    colors: ["black", "brown", "tan", "navy"],
    gender: "Unisex",
    material: "Genuine Leather",
    fit: "Adjustable",
    rating: 4.8,
    reviews: 112,
    inStock: true,
    description: "Premium genuine leather belt with minimalist buckle design. A timeless essential that pairs with any wardrobe.",
    details: [
      "Genuine full-grain leather",
      "Minimalist buckle design",
      "Durable construction",
      "Adjustable fit",
      "Handcrafted in Portugal",
      "Ages beautifully"
    ],
    specs: {
      material: "Full-grain Genuine Leather",
      fit: "Adjustable",
      care: "Leather conditioner recommended",
      weight: "150g",
      buckle: "Stainless steel",
      width: "3.5cm"
    },
    tags: ["premium", "accessory", "essential"],
    sku: "LTH-BELT-001"
  },

  // ====== NEW ADDITIONS ======
  {
    id: 9,
    name: "Linen Shirt",
    subtitle: "Breathable elegance for warm days",
    price: 749,
    originalPrice: 999,
    category: "tops",
    images: [
      "/assets/shirt.png",
      "/assets/shirt2.png",
      "/assets/shirt3.png"
    ],
    tag: "NEW",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["white", "light_blue", "cream", "sage"],
    gender: "Unisex",
    material: "100% Linen",
    fit: "Relaxed",
    rating: 4.7,
    reviews: 67,
    inStock: true,
    description: "Premium 100% linen shirt perfect for summer styling. Features a relaxed fit and natural breathability.",
    details: [
      "100% pure linen",
      "Breathable fabric",
      "Relaxed fit",
      "Mother-of-pearl buttons",
      "Easy care",
      "Sustainable sourcing"
    ],
    specs: {
      material: "100% Pure Linen",
      fit: "Relaxed",
      care: "Machine wash warm",
      weight: "200g",
      neckline: "Collar",
      sleeve_type: "Short sleeves"
    },
    tags: ["new", "summer", "sustainable"],
    sku: "LIN-SHIRT-001"
  },

  {
    id: 10,
    name: "Cargo Shorts",
    subtitle: "Functional style for active living",
    price: 599,
    originalPrice: 849,
    category: "pants",
    images: [
      "/assets/shorts.png",
      "/assets/shorts2.png",
      "/assets/shorts3.png"
    ],
    tag: "",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["khaki", "olive", "black", "navy"],
    gender: "Unisex",
    material: "Cotton Canvas",
    fit: "Regular",
    rating: 4.5,
    reviews: 92,
    inStock: true,
    description: "Durable cargo shorts with practical pockets and comfortable fit. Perfect for outdoor adventures and casual wear.",
    details: [
      "Premium cotton canvas",
      "Multiple pockets",
      "Reinforced stitching",
      "Adjustable waist",
      "Fade-resistant",
      "Versatile styling"
    ],
    specs: {
      material: "100% Cotton Canvas",
      fit: "Regular",
      care: "Machine wash",
      weight: "280g",
      inseam: "Various",
      pockets: "Yes (6)"
    },
    tags: ["functional", "active", "summer"],
    sku: "CRG-SHORT-001"
  },

  {
    id: 11,
    name: "Wool Blazer",
    subtitle: "Professional polish with premium comfort",
    price: 1199,
    originalPrice: 1599,
    category: "jackets",
    images: [
      "/assets/blazer.png",
      "/assets/blazer2.png",
      "/assets/blazer3.png"
    ],
    tag: "LIMITED",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["black", "navy", "charcoal", "burgundy"],
    gender: "Unisex",
    material: "Premium Wool",
    fit: "Tailored",
    rating: 4.9,
    reviews: 156,
    inStock: true,
    description: "Premium wool blazer crafted for the modern professional. Tailored fit with impeccable construction.",
    details: [
      "Premium Italian wool",
      "Tailored fit",
      "Silk lining",
      "Functional pockets",
      "Sustainable production",
      "Handcrafted details"
    ],
    specs: {
      material: "100% Premium Italian Wool",
      fit: "Tailored",
      care: "Professional dry clean",
      weight: "600g",
      buttons: "Covered buttons",
      lining: "Silk"
    },
    tags: ["limited", "premium", "professional"],
    sku: "WL-BLAZ-001"
  },

  {
    id: 12,
    name: "Canvas Backpack",
    subtitle: "Durable style for every journey",
    price: 799,
    originalPrice: 1099,
    category: "accessories",
    images: [
      "/assets/backpack.png",
      "/assets/backpack2.png",
      "/assets/backpack3.png"
    ],
    tag: "NEW",
    sizes: ["One Size"],
    colors: ["black", "navy", "khaki", "grey"],
    gender: "Unisex",
    material: "Canvas + Leather",
    fit: "One Size",
    rating: 4.8,
    reviews: 178,
    inStock: true,
    description: "Premium canvas backpack with leather accents. Designed for daily use with multiple compartments for organization.",
    details: [
      "Premium cotton canvas",
      "Genuine leather accents",
      "Multiple compartments",
      "Ergonomic straps",
      "Water-resistant",
      "Durable construction"
    ],
    specs: {
      material: "Canvas + Genuine Leather",
      fit: "One Size",
      care: "Wipe clean",
      weight: "850g",
      capacity: "25L",
      pockets: "Multiple"
    },
    tags: ["new", "functional", "durable"],
    sku: "CNV-BACKP-001"
  }
];

// ====== HELPER FUNCTIONS ======
export const getProductById = (id) => {
  return products.find((product) => product.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
  return products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
};

export const getProductsByPrice = (minPrice, maxPrice) => {
  return products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );
};

export const getProductsByRating = (minRating) => {
  return products.filter((product) => product.rating >= minRating);
};

export const getProductsByTag = (tag) => {
  return products.filter((product) =>
    product.tags.includes(tag.toLowerCase())
  );
};

export const getNewProducts = () => {
  return products.filter((product) => product.tag === "NEW");
};

export const getLimitedProducts = () => {
  return products.filter((product) => product.tag === "LIMITED");
};

export const getBestsellerProducts = () => {
  return getProductsByTag("bestseller");
};

export const searchProducts = (query) => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
  );
};

export const getFilteredProducts = (filters) => {
  let filtered = [...products];

  if (filters.category && filters.category.length > 0) {
    filtered = filtered.filter((p) =>
      filters.category.includes(p.category)
    );
  }

  if (filters.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= filters.minPrice);
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= filters.maxPrice);
  }

  if (filters.rating !== undefined) {
    filtered = filtered.filter((p) => p.rating >= filters.rating);
  }

  if (filters.tag && filters.tag.length > 0) {
    filtered = filtered.filter((p) =>
      filters.tag.some((tag) => p.tags.includes(tag.toLowerCase()))
    );
  }

  if (filters.inStock) {
    filtered = filtered.filter((p) => p.inStock);
  }

  if (filters.search) {
    filtered = searchProducts(filters.search);
  }

  return filtered;
};

export const getSortedProducts = (productsArray, sortBy) => {
  const sorted = [...productsArray];

  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "newest":
      return sorted.filter((p) => p.tag === "NEW");
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return sorted;
  }
};

export const getRelatedProducts = (productId, limit = 4) => {
  const product = getProductById(productId);
  if (!product) return [];

  return products
    .filter(
      (p) =>
        p.category === product.category &&
        p.id !== productId
    )
    .slice(0, limit);
};

export const getCategoryStats = () => {
  const stats = {};
  products.forEach((product) => {
    stats[product.category] = (stats[product.category] || 0) + 1;
  });
  return stats;
};

export const getPriceRange = () => {
  const prices = products.map((p) => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};

export default products;