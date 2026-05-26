import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

export function loginService() {
  const provider = new GoogleAuthProvider();

  function loginWithGoogle() {
    signInWithPopup(auth, provider);
  }

  function logout() {
    signOut(auth);
  }

  return { loginWithGoogle, logout };
}
