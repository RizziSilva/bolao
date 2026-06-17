import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firebaseService } from "./firebase";
import { SCORES_KEYS } from "@constants";

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
      userId,
      joinedAt: new Date(),
    });
  }

  async function getUserPools(userId) {
    const membersRef = collectionGroup(db, "members");
    const membersQuery = query(membersRef, where("userId", "==", userId));
    const membersSnap = await getDocs(membersQuery);
    const pools = await Promise.all(
      membersSnap.docs.map(async (memberDoc) => {
        const memberData = memberDoc.data();
        const poolId = memberDoc.ref.parent.parent.id;
        const poolSnap = await getDoc(doc(db, "pools", poolId));
        const poolData = poolSnap.data();
        return {
          id: poolId,
          code: poolData.code,
          name: poolData.name,
          scores: {
            [SCORES_KEYS.TOTAL_POINTS]: memberData[SCORES_KEYS.TOTAL_POINTS],
            [SCORES_KEYS.ROUND_POINTS]: memberData[SCORES_KEYS.ROUND_POINTS],
            [SCORES_KEYS.PERFECT_SCORES]:
              memberData[SCORES_KEYS.PERFECT_SCORES],
          },
        };
      }),
    );

    return pools;
  }

  return { joinPool, getUserPools };
}
