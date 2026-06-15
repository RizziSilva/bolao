import {
  API_KEY,
  APP_ID,
  AUTH_DOAMIN,
  DATABASE_URL,
  MEASUREMENT_ID,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
} from "@constants";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export function firebaseService() {
  const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOAMIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const db = getFirestore(app);

  return { auth, provider, db };
}
