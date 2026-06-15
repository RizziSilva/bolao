import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { firebaseService } from "./firebase";

export function userService() {
  const { db } = firebaseService();

  async function saveUserIfNotExists(user) {
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    const isUserAlreadyCreated = snap.exists();

    if (!isUserAlreadyCreated) {
      await setDoc(ref, {
        totalPoints: 0,
        roundPoints: 0,
        perfectScores: 0,
        email: user.email,
        createdAt: new Date(),
      });
    }
  }

  function subscribeToUserScores(userId, callback) {
    const ref = doc(db, "users", userId);
    return onSnapshot(ref, (snap) => callback(snap.data()));
  }

  return { saveUserIfNotExists, subscribeToUserScores };
}
