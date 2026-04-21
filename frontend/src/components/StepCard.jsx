import { Sparkles } from "lucide-react";

export default function StepCard({ title, children }) {
  return (
    <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-blue-500" size={20} />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
}