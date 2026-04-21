import { useState } from "react";
import axios from "axios";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      form
    );

    localStorage.setItem("token", res.data.token);
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-6 rounded-3xl shadow-xl w-full max-w-sm">

        <h2 className="text-2xl font-bold text-center mb-4">
          Admin Login
        </h2>

        <div className="flex items-center border rounded-xl p-2 mb-3">
          <Mail size={18} className="mr-2 text-gray-400" />
          <input
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full outline-none"
          />
        </div>

        <div className="flex items-center border rounded-xl p-2 mb-3">
          <Lock size={18} className="mr-2 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full outline-none"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-xl"
        >
          Login
        </button>
      </div>
    </div>
  );
}