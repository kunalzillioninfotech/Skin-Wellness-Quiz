import { useState } from "react";
import { createProduct } from "../api/productApi";
import { Upload, PlusCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast"; // ✅ NEW

export default function ProductForm({ refresh }) {
  const [form, setForm] = useState({
    name: "",
    skin_type: "",
    concern: "",
    budget: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) formData.append(key, form[key]);
      });

      await createProduct(formData);

      toast.success("Product added successfully ✅"); // ✅ SUCCESS

      refresh();

      setForm({
        name: "",
        skin_type: "",
        concern: "",
        budget: "",
        description: "",
        image: null,
      });

    } catch (err) {
      console.error(err);
      toast.error("Failed to add product ❌"); // ❌ ERROR
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 space-y-4"
    >
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <PlusCircle size={20} /> Add Product
      </h2>

      <input
        placeholder="Product Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
      />

      <select
        value={form.skin_type}
        onChange={(e) =>
          setForm({ ...form, skin_type: e.target.value })
        }
        className="w-full border p-3 rounded-xl"
      >
        <option value="">Skin Type</option>
        <option>Oily</option>
        <option>Dry</option>
        <option>Sensitive</option>
      </select>

      <select
        value={form.concern}
        onChange={(e) =>
          setForm({ ...form, concern: e.target.value })
        }
        className="w-full border p-3 rounded-xl"
      >
        <option value="">Concern</option>
        <option>Acne</option>
        <option>Aging</option>
        <option>Hydration</option>
      </select>

      <select
        value={form.budget}
        onChange={(e) =>
          setForm({ ...form, budget: e.target.value })
        }
        className="w-full border p-3 rounded-xl"
      >
        <option value="">Budget</option>
        <option>$10-$50</option>
        <option>$50+</option>
      </select>

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
        className="w-full border p-3 rounded-xl"
      />

      <label className="flex items-center gap-2 border p-3 rounded-xl cursor-pointer hover:bg-gray-50">
        <Upload size={18} />
        {form.image ? form.image.name : "Upload Image"}
        <input
          type="file"
          hidden
          onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })
          }
        />
      </label>

      <button
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl shadow hover:scale-105 transition disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Adding...
          </>
        ) : (
          "Add Product"
        )}
      </button>
    </form>
  );
}