import { Navigate } from "react-router-dom";
import { Loader } from "@components";
import { useAuth } from "@context";
import { ROUTES } from "@constants";

export function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (user === undefined) return <Loader />;
  if (!user) return <Navigate to={ROUTES.LOGIN.pathname} />;

  return children;
}
