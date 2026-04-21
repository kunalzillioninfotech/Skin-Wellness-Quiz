import toast from "react-hot-toast";
import { removeProduct } from "../api/productApi";
import { Trash2 } from "lucide-react";

export default function ProductTable({ products, refresh }) {
    const handleDelete = async (id) => {
        try {
          await removeProduct(id);
          toast.success("Product deleted");
          refresh();
        } catch (err) {
          toast.error("Delete failed");
        }
    };

  return (
    <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <h2 className="text-lg font-semibold p-4 border-b">
        Products
      </h2>

      <table className="w-full text-sm table-fixed">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="p-3 text-left w-[35%]">Product</th>
            <th className="p-3 text-left w-[15%]">Skin</th>
            <th className="p-3 text-left w-[20%]">Concern</th>
            <th className="p-3 text-left w-[15%]">Budget</th>
            <th className="p-3 text-center w-[15%]">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t hover:bg-gray-50">
              
              {/* PRODUCT */}
              <td className="p-3 flex items-center gap-3">
                {p.image && (
                  <img
                    src={p.image}
                    alt=""
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                )}
                <span className="truncate">{p.name}</span>
              </td>

              {/* OTHER COLUMNS */}
              <td className="p-3">{p.skin_type}</td>
              <td className="p-3">{p.concern}</td>
              <td className="p-3">{p.budget}</td>

              {/* ACTION */}
              <td className="p-3 text-center">
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}