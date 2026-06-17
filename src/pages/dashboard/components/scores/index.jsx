import { useMemo } from "react";
import { DASHBOARD_CARDS, SCORES_INITIAL_STATE } from "../../constants";
import { Card } from "../card";
import "./style.scss";
import { SCORES_KEYS } from "@constants";

export function ScoreCards({ pools }) {
  const totalScores = useMemo(() => {
    return pools.reduce(
      (acc, pool) => ({
        [SCORES_KEYS.TOTAL_POINTS]:
          acc[SCORES_KEYS.TOTAL_POINTS] + pool.scores[SCORES_KEYS.TOTAL_POINTS],
        [SCORES_KEYS.ROUND_POINTS]:
          acc[SCORES_KEYS.ROUND_POINTS] + pool.scores[SCORES_KEYS.ROUND_POINTS],
        [SCORES_KEYS.PERFECT_SCORES]:
          acc[SCORES_KEYS.PERFECT_SCORES] +
          pool.scores[SCORES_KEYS.PERFECT_SCORES],
      }),
      SCORES_INITIAL_STATE,
    );
  }, [pools.length]);

  function renderCards() {
    return DASHBOARD_CARDS.map(({ color, title, description, pointsKey }) => (
      <Card
        color={color}
        title={title}
        description={description}
        score={totalScores[pointsKey]}
        key={title}
      />
    ));
  }

  return <div id="container-score-cards-component">{renderCards()}</div>;
}
