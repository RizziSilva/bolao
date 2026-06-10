import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@context";
import { ROUTES } from "@constants";
import { ProtectedRoute, Navbar } from "@components";
import { ProtectedLayout } from "@layouts";
import { Bolao, BolaoDetail, Dashboard, Login } from "@pages";
import "./style.scss";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedLayout />}>
          <Route
            path={ROUTES.BOLAO_DETAIL.pathname}
            element={<BolaoDetail />}
          />
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
          <Route
            path="*"
            element={<Navigate to={ROUTES.DASHBOARD.pathname} />}
          />
        </Route>
        <Route path={ROUTES.LOGIN.pathname} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
