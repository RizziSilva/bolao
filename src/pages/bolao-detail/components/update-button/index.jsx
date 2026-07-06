import { useState } from "react";
import { HOURS_IN_MILLISECONDS } from "@constants";
import { useAuth } from "@context";
import { useAsyncRequest } from "@hooks";
import { pointsService } from "@services";
import { UPDATE_BUTTON_COOLDOWN_HOURS } from "../../constants";
import "./style.scss";

export function UpdateButton({ pool }) {
  const [hasCalculated, setHasCalculated] = useState(false);
  const { user } = useAuth();
  const { calculatePoolPoints } = pointsService();
  const { asyncRequest } = useAsyncRequest();

  async function handleClick() {
    try {
      await asyncRequest(() => calculatePoolPoints(pool.id));
      setHasCalculated(true);
    } catch (error) {
      console.error(error);
    }
  }

  function getIsInCooldown() {
    const { lastCalculatedAt } = pool;
    if (!lastCalculatedAt) return 0;
    const lastCalc = lastCalculatedAt.toDate();
    const diffInHours = (new Date() - lastCalc) / HOURS_IN_MILLISECONDS;
    const isInCooldown = Math.max(
      0,
      Math.ceil(UPDATE_BUTTON_COOLDOWN_HOURS - diffInHours),
    );

    return isInCooldown || hasCalculated;
  }

  function renderContent() {
    const { createdBy } = pool;
    const isCreator = createdBy === user.email;
    const isInCooldown = getIsInCooldown();

    if (!isCreator || false) return null;

    return (
      <button onClick={handleClick} id="update-button-component">
        Atualizar pontuação
      </button>
    );
  }

  return renderContent();
}
