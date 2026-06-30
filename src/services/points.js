import { doc, increment, writeBatch } from "firebase/firestore";
import { calculatePoolUsersPoints } from "@utils";
import { matchesService } from "./matches";
import { guessService } from "./guess";
import { firebaseService } from "./firebase";

export function pointsService() {
  const { getAllFinishedMatches } = matchesService();
  const { getAllGuessesFromPool } = guessService();
  const { db } = firebaseService();

  async function calculatePoolPoints(poolId) {
    const allMatches = await getAllFinishedMatches();
    const matchesInfo = {};
    allMatches.forEach((match) => {
      matchesInfo[match.id] = match;
    });
    const poolGuesses = await getAllGuessesFromPool(poolId);
    const userPoints = calculatePoolUsersPoints(poolGuesses, matchesInfo);
    const batch = writeBatch(db);

    Object.entries(userPoints).forEach(([userId, points]) => {
      const memberRef = doc(db, "pools", poolId, "members", userId);

      batch.update(memberRef, {
        totalPoints: increment(points.totalPoints),
        perfectScores: increment(points.perfectScores),
      });
    });

    const poolRef = doc(db, "pools", poolId);
    batch.update(poolRef, { lastCalculatedAt: new Date() });

    await batch.commit();
  }

  return {
    calculatePoolPoints,
  };
}
