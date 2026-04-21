import { Check } from "lucide-react";

export default function OptionButton({ label, onClick, selected }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all duration-200 shadow-sm
      ${
        selected
          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-transparent shadow-md scale-102"
          : "bg-white hover:bg-gray-50 border-gray-200 hover:shadow"
      }`}
    >
      {selected && <Check size={16} />}
      {label}
    </button>
  );
}