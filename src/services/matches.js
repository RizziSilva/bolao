import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firebaseService } from "./firebase";

export function matchesService() {
  const { db } = firebaseService();

  async function getAllMatches() {
    const matchesRef = collection(db, "matches");
    const matchesQuery = query(matchesRef, orderBy("matchDate", "asc"));
    const snap = await getDocs(matchesQuery);

    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async function getAllFinishedMatches() {
    const matchesSnap = await getDocs(
      query(collection(db, "matches"), where("finished", "==", true)),
    );

    return matchesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  return {
    getAllMatches,
    getAllFinishedMatches,
  };
}
