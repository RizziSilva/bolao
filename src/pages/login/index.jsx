import { Navigate, useNavigate } from "react-router-dom";
import { firebaseService, loginService } from "@services";
import { GoogleIcon, SmallLogo } from "@statics";
import { useAuth } from "@context";
import { ROUTES } from "@constants";
import "./style.scss";

export function Login() {
  const { user } = useAuth();
  const { auth, provider } = firebaseService();
  const { loginWithGoogle } = loginService();
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      await loginWithGoogle(auth, provider);
      navigate(ROUTES.DASHBOARD.pathname);
    } catch (err) {
      console.error(err);
    }
  }

  function renderLoginPage() {
    return (
      <div id="container-login-page">
        <div className="container-content">
          <div className="container-description">
            <img className="image" src={SmallLogo} />
            <div className="container-texts">
              <span className="title">Acesse a sua conta</span>
              <span className="description">
                Participe dos jogos e faça seus palpites
              </span>
            </div>
          </div>
          <button className="button google" onClick={handleLogin}>
            <GoogleIcon /> Entrar com Google
          </button>
        </div>
      </div>
    );
  }

  function renderContent() {
    if (user) return <Navigate to={ROUTES.DASHBOARD.pathname} replace />;

    return renderLoginPage();
  }

  return renderContent();
}
