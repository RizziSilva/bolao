import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseService } from "@services";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const { auth } = firebaseService();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
