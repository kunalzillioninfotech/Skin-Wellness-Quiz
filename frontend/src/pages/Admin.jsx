import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";
import { fetchProducts } from "../api/productApi";
import { LogOut } from "lucide-react";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const loadProducts = async (pageNumber = 1) => {
    const res = await fetchProducts(pageNumber, 10);
    setProducts(res.data.data);
    setTotalPages(res.data.totalPages);
    setPage(res.data.page);
  };

  useEffect(() => {
    loadProducts(page);
  }, [page]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <ProductForm refresh={() => loadProducts(page)} />

        <ProductTable
          products={products}
          refresh={() => loadProducts(page)}
        />

        {/* Pagination */}
        <div className="flex gap-3 items-center justify-center">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded-xl disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded-xl disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}