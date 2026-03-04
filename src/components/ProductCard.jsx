// src/components/ProductCard.jsx
import { Link } from "react-router-dom";

export default function ProductCard({ id, name, price, images = [] }) {
  const image = images[0] || "/assets/placeholder.png";

  return (
    <Link
      to={`/product/${id}`}
      className="group bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-neon transition transform hover:scale-[1.03] hover:shadow-neonPink"
    >
      {/* IMAGE */}
      <div className="relative h-72 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />

        {/* subtle overlay */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition" />
      </div>

      {/* INFO */}
      <div className="p-5">
        <h3 className="text-lg font-semibold tracking-wide mb-1">
          {name}
        </h3>
        <p className="text-[#FFB400] font-medium">
          R{price}
        </p>
      </div>
    </Link>
  );
}
