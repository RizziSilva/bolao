import { Navigate } from "react-router-dom";
import { useAuth } from "@context";

export function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (user === undefined) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;

  return children;
}
