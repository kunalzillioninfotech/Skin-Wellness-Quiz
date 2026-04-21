import { Routes, Route } from "react-router-dom";
import SkinQuiz from "./pages/SkinQuiz";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<SkinQuiz />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Admin Route */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
    </Routes>
    </>
  );
}

export default App;