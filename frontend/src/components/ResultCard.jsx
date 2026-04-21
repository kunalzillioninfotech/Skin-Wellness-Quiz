import { Tag, Droplet, DollarSign } from "lucide-react";

export default function ResultCard({ product }) {
  return (
    <div className="flex gap-4 items-center rounded-2xl p-4 bg-white shadow-md hover:shadow-xl transition-all border border-gray-100">
      
      {/* LEFT SIDE - INFO */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{product.name}</h3>

        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Droplet size={14} /> {product.skin_type}
          </span>

          <span className="flex items-center gap-1">
            <Tag size={14} /> {product.concern}
          </span>

          <span className="flex items-center gap-1">
            <DollarSign size={14} /> {product.budget}
          </span>
        </div>
      </div>

      {/* RIGHT SIDE - IMAGE */}
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-32 h-32 object-cover rounded-xl flex-shrink-0"
        />
      )}
    </div>
  );
}