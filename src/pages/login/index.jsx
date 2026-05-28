import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { firebaseService } from "@services";
import { ROUTES } from "@constants";

export function Login() {
  const { auth, provider } = firebaseService();
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      await signInWithPopup(auth, provider);
      navigate(ROUTES.DASHBOARD.pathname);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>My App</h1>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
}
