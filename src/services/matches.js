import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firebaseService } from "./firebase";

export function matchesService() {
  const { db } = firebaseService();

  async function getAllMatches() {
    const matchesRef = collection(db, "matches");
    const matchesQuery = query(matchesRef, orderBy("matchDate", "asc"));
    const snap = await getDocs(matchesQuery);

    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  return {
    getAllMatches,
  };
}
