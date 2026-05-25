import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";

export default function Login() {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      // onAuthStateChanged in App.jsx handles the redirect
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>My App</h1>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
}
