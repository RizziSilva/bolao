import { CORRECT_SCORE, CORRECT_WINNER, STAGES } from "@constants";

export function calculatePoolUsersPoints(poolGuesses, matchesInfo) {
  const userPoints = {};
  poolGuesses.forEach((guess) => {
    const userId = guess.userId;
    const match = matchesInfo[guess.matchId];
    const isGroupStage = guess.stage === STAGES.GROUP.label;

    if (!match || isGroupStage) return;

    const points = calculateMatchPoint(guess, match);
    const hasCreatedUserPointsStruct = !!userPoints[userId];
    const isPerfect = isCorrectGuess(guess, match);

    if (!hasCreatedUserPointsStruct)
      userPoints[userId] = { totalPoints: 0, perfectScores: 0 };

    if (isPerfect) userPoints[userId].perfectScores += 1;

    userPoints[userId].totalPoints += points;
  });

  return userPoints;
}

function calculateMatchPoint(guess, match) {
  const correctScore = isCorrectGuess(guess, match);
  const correctWinner =
    Math.sign(guess.homeScore - guess.awayScore) ===
    Math.sign(match.homeScore - match.awayScore);

  if (correctScore) return CORRECT_SCORE;
  if (correctWinner) return CORRECT_WINNER;

  return 0;
}

function isCorrectGuess(guess, match) {
  const correctHomeScore = guess.homeScore === match.homeScore;
  const correctAwayScore = guess.awayScore === match.awayScore;

  return correctHomeScore && correctAwayScore;
}
