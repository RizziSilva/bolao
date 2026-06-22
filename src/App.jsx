import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "@constants";
import { Loader, ProtectedRoute } from "@components";
import { useLoading } from "@context";
import { ProtectedLayout } from "@layouts";
import { Bolao, BolaoDetail, Dashboard, Login } from "@pages";
import "./style.scss";

export default function App() {
  const { isLoading } = useLoading();

  function renderLoader() {
    if (!isLoading) return null;

    return <Loader />;
  }

  return (
    <>
      {renderLoader()}
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedLayout />}>
            <Route
              path={ROUTES.BOLAO_DETAIL.pathname}
              element={
                <ProtectedRoute>
                  <BolaoDetail />
                </ProtectedRoute>
              }
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
    </>
  );
}
