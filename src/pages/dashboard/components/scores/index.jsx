import { useEffect, useState } from "react";
import { useAuth } from "@context";
import { userService } from "@services";
import { DASHBOARD_CARDS, CARDS } from "../../constants";
import { Card } from "../card";
import "./style.scss";

// TODO silva.william 15/06/2026: Fazer algo com o isLoading para indicar que as informações estão sendo carregadas
export function ScoreCards() {
  const { user } = useAuth();
  const [scores, setScores] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { subscribeToUserScores } = userService();

  useEffect(() => {
    let unsub = null;

    function subscribe() {
      unsub = subscribeToUserScores(user.uid, (data) => {
        setScores({
          [CARDS.POINTS.pointsKey]: data[CARDS.POINTS.pointsKey],
          [CARDS.ROUND_POINTS.pointsKey]: data[CARDS.ROUND_POINTS.pointsKey],
          [CARDS.CORRECT_GUESS.pointsKey]: data[CARDS.CORRECT_GUESS.pointsKey],
        });
        setIsLoading(false);
      });
    }

    if (user) subscribe();

    return () => unsub();
  }, [user]);

  function renderCards() {
    return DASHBOARD_CARDS.map(({ color, title, description, pointsKey }) => (
      <Card
        color={color}
        title={title}
        description={description}
        score={scores[pointsKey]}
        key={title}
      />
    ));
  }

  return <div id="container-score-cards-component">{renderCards()}</div>;
}
