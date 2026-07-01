import { collection, getDocs } from "firebase/firestore";
import { firebaseService } from "./firebase";

export function groupService() {
  const { db } = firebaseService();

  async function getAllGroupStageQualifiers() {
    const groupsRef = collection(db, "groups");
    const snap = await getDocs(groupsRef);

    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  return {
    getAllGroupStageQualifiers,
  };
}
