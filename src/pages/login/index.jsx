import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";

export function Login() {
  async function handleLogin() {
    try {
      await signInWithPopup(auth, provider);
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
