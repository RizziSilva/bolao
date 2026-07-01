import { CORRECT_SCORE, CORRECT_WINNER, STAGES } from "@constants";

export function calculatePoolUsersPoints(
  poolGuesses,
  allMatches,
  groupStageQualifiers,
) {
  const userPoints = {};
  const matchesInfo = {};
  const groupQualifiers = {};

  groupStageQualifiers.forEach((group) => {
    groupQualifiers[group.id] = group;
  });

  allMatches.forEach((match) => {
    matchesInfo[match.id] = match;
  });

  poolGuesses.forEach((guess) => {
    const userId = guess.userId;
    const match = matchesInfo[guess.matchId];
    const additionalPoints = getPoints(guess, groupQualifiers, match);
    const hasCreatedUserPointsStruct = !!userPoints[userId];
    const additionalPerfectScorePoints = getPerfectGuessPoint(guess, match);

    if (!hasCreatedUserPointsStruct)
      userPoints[userId] = { totalPoints: 0, perfectScores: 0 };

    userPoints[userId].perfectScores += additionalPerfectScorePoints;
    userPoints[userId].totalPoints += additionalPoints;
  });

  return userPoints;
}

function getPerfectGuessPoint(guess, match) {
  const isGroupStage = guess.stage === STAGES.GROUP.id;

  if (isGroupStage || !match) return 0;

  const isPerfect = isCorrectGuess(guess, match);

  return isPerfect ? 1 : 0;
}

function getPoints(guess, groupQualifiers, match) {
  const isGroupStage = guess.stage === STAGES.GROUP.id;

  if (isGroupStage) return calculateGroupStagePoint(groupQualifiers, guess);
  if (match) return calculateMatchPoint(guess, match);

  return 0;
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

function calculateGroupStagePoint(qualifiers, guess) {
  const actualQualifiers = qualifiers[guess.groupId];

  if (actualQualifiers) {
    const correctGuesses = guess.qualifiers.filter((teamId) =>
      actualQualifiers.qualifiers.includes(teamId),
    );
    const points = correctGuesses.length;

    return points;
  }

  return 0;
}

function isCorrectGuess(guess, match) {
  const correctHomeScore = guess.homeScore === match.homeScore;
  const correctAwayScore = guess.awayScore === match.awayScore;

  return correctHomeScore && correctAwayScore;
}
