import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@context";
import { ProtectedRoute, Navbar } from "@components";
import { Bolao, Dashboard, Login } from "@pages";

export default function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bolao"
          element={
            <ProtectedRoute>
              <Bolao />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}
