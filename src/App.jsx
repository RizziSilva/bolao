import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@context";
import { ROUTES } from "@constants";
import { ProtectedRoute, Navbar } from "@components";
import { Bolao, Dashboard, Login } from "@pages";
import "./style.scss";

export default function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path={ROUTES.DASHBOARD.pathname}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.BOLAO.pathname}
          element={
            <ProtectedRoute>
              <Bolao />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
