import {
  collection,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { firebaseService } from "./firebase";

export function guessService() {
  const { db } = firebaseService();

  async function saveGroupGuess(poolId, userId, guesses) {
    const guessesBatch = writeBatch(db);

    guesses.forEach(({ groupId, qualifiers }) => {
      const guessesRef = doc(
        db,
        "pools",
        poolId,
        "guesses",
        `${userId}_${groupId}`,
      );
      guessesBatch.set(guessesRef, {
        userId,
        groupId,
        stage: "group",
        qualifiers,
        createdAt: new Date(),
      });
    });

    await guessesBatch.commit();
  }

  async function getGroupGuesses(poolId, userId) {
    const guessesRef = collection(db, "pools", poolId, "guesses");
    const guessesQuery = query(
      guessesRef,
      where("userId", "==", userId),
      where("stage", "==", "group"),
    );
    const snap = await getDocs(guessesQuery);

    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async function saveMatchesGuesses(poolId, userId, guesses, stage) {
    const batch = writeBatch(db);
    console.log("guesses", guesses);
    guesses.forEach(({ matchId, homeScore, awayScore }) => {
      const ref = doc(db, "pools", poolId, "guesses", `${userId}_${matchId}`);
      batch.set(ref, {
        userId,
        matchId,
        stage,
        homeScore: Number(homeScore),
        awayScore: Number(awayScore),
        points: 0,
        createdAt: new Date(),
      });
    });

    await batch.commit();
  }

  async function getAllMatchesGuesses(poolId, userId, stage) {
    const guessesRef = collection(db, "pools", poolId, "guesses");
    const guessesQuery = query(
      guessesRef,
      where("userId", "==", userId),
      where("stage", "==", stage),
    );
    const snap = await getDocs(guessesQuery);

    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  return {
    saveGroupGuess,
    getGroupGuesses,
    saveMatchesGuesses,
    getAllMatchesGuesses,
  };
}
