import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firebaseService } from "./firebase";

export function poolService() {
  const { db } = firebaseService();

  async function getPoolByCode(code) {
    const poolsRef = collection(db, "pools");
    const poolsQuery = query(poolsRef, where("code", "==", code));
    const snap = await getDocs(poolsQuery);

    if (snap.empty) return null;

    const document = snap.docs[0];
    return { id: document.id, ...document.data() };
  }

  async function joinPool(poolCode, userId) {
    const pool = await getPoolByCode(poolCode);
    if (!pool) throw new Error("Bolão não encontrado.");

    const memberRef = doc(db, "pools", pool.id, "members", userId);
    const memberSnap = await getDoc(memberRef);
    if (memberSnap.exists()) throw new Error("Você já está nesse bolão.");

    await setDoc(memberRef, {
      totalPoints: 0,
      roundPoints: 0,
      perfectScores: 0,
      joinedAt: new Date(),
    });
  }

  return { joinPool };
}
