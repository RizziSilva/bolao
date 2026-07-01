import { doc, increment, writeBatch } from "firebase/firestore";
import { calculatePoolUsersPoints } from "@utils";
import { matchesService } from "./matches";
import { guessService } from "./guess";
import { firebaseService } from "./firebase";
import { groupService } from "./group";

export function pointsService() {
  const { getAllFinishedMatches } = matchesService();
  const { getAllGuessesFromPool } = guessService();
  const { getAllGroupStageQualifiers } = groupService();
  const { db } = firebaseService();

  async function calculatePoolPoints(poolId) {
    const [allMatches, poolGuesses, groupStageQualifiers] = await Promise.all([
      getAllFinishedMatches(),
      getAllGuessesFromPool(poolId),
      getAllGroupStageQualifiers(),
    ]);
    const userPoints = calculatePoolUsersPoints(
      poolGuesses,
      allMatches,
      groupStageQualifiers,
    );
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
