export const CARDS = {
  POINTS: {
    color: "green",
    title: "Total de pontos",
    pointsKey: "totalPoints",
  },
  ROUND_POINTS: {
    color: "blue",
    title: "Pontos da rodada",
    description: "Pontos da última rodada",
    pointsKey: "roundPoints",
  },
  CORRECT_GUESS: {
    color: "indigo",
    title: "Palpites na mosca",
    description: "Palpites com placar correto",
    pointsKey: "perfectScores",
  },
};

export const DASHBOARD_CARDS = [
  CARDS.POINTS,
  CARDS.ROUND_POINTS,
  CARDS.CORRECT_GUESS,
];
