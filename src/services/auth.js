import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { firebaseService } from "@services";

export function loginService() {
  const provider = new GoogleAuthProvider();
  const { auth } = firebaseService();

  function loginWithGoogle() {
    signInWithPopup(auth, provider);
  }

  function logout() {
    signOut(auth);
  }

  return { loginWithGoogle, logout };
}
