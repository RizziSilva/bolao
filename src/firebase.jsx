import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKRYqY7hYzRlZ6_kB0oofZCiPkmVe-MSI",
  authDomain: "bolao-f5239.firebaseapp.com",
  databaseURL: "https://bolao-f5239-default-rtdb.firebaseio.com",
  projectId: "bolao-f5239",
  storageBucket: "bolao-f5239.firebasestorage.app",
  messagingSenderId: "32289112107",
  appId: "1:32289112107:web:2c318d126659c899a3aa6e",
  measurementId: "G-BRJT4T6TBH",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
