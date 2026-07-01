import { SCORES_KEYS } from "@constants";

export const CARDS = {
  POINTS: {
    color: "green",
    title: "Total de pontos",
    pointsKey: SCORES_KEYS.TOTAL_POINTS,
  },
  ROUND_POINTS: {
    color: "blue",
    title: "Pontos da rodada",
    description: "Pontos da última rodada",
    pointsKey: SCORES_KEYS.ROUND_POINTS,
  },
  CORRECT_GUESS: {
    color: "indigo",
    title: "Palpites na mosca",
    description: "Palpites com placar correto",
    pointsKey: SCORES_KEYS.PERFECT_SCORES,
  },
};

export const DASHBOARD_CARDS = [CARDS.POINTS, CARDS.CORRECT_GUESS];

export const SCORES_INITIAL_STATE = {
  [SCORES_KEYS.TOTAL_POINTS]: 0,
  [SCORES_KEYS.ROUND_POINTS]: 0,
  [SCORES_KEYS.PERFECT_SCORES]: 0,
};
