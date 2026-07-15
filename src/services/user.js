import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firebaseService } from "./firebase";

export function userService() {
  const { db } = firebaseService();

  async function saveUserIfNotExists(user) {
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    const isUserAlreadyCreated = snap.exists();
    const data = snap.data();
    const hasDisplayName = data.displayName;

    if (!isUserAlreadyCreated || !hasDisplayName) {
      await setDoc(ref, {
        totalPoints: 0,
        roundPoints: 0,
        perfectScores: 0,
        email: user.email,
        displayName: user.displayName,
        image: user.photoURL,
        createdAt: new Date(),
      });
    }
  }

  async function updateMemberInfo(poolId, user) {
    const ref = doc(db, "pools", poolId, "members", user.uid);
    const snap = await getDoc(ref);
    const isUserMember = snap.exists();
    const isUpdated = !!snap.data().displayName;

    if (!isUserMember || isUpdated) return;

    await updateDoc(ref, {
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  }

  return { saveUserIfNotExists, updateMemberInfo };
}
