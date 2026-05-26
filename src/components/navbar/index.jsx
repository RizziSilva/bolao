import { Link, useLocation } from "react-router-dom";
import { loginService } from "@services";
import { useAuth } from "@context";

export function Navbar() {
  const { user } = useAuth();
  const location = useLocation();
  const { logout } = loginService();

  function renderUserImage() {
    if (!user?.photoURL) return null;

    return <img src={user.photoURL} alt="avatar" width={32} height={32} />;
  }

  return (
    <nav>
      <div className="nav-brand">MyApp</div>
      <div className="nav-links">
        <Link
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "active" : ""}
        >
          Dashboard
        </Link>
        <Link
          to="/bolao"
          className={location.pathname === "/bolao" ? "active" : ""}
        >
          Bolãos
        </Link>
      </div>
      <div className="nav-user">
        {renderUserImage()}
        <span>{user?.displayName}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
