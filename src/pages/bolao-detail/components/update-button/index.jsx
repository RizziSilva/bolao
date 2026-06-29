import { HOURS_IN_MILLISECONDS } from "@constants";
import { useAuth } from "@context";
import { useAsyncRequest } from "@hooks";
import { pointsService } from "@services";

export function UpdateButton({ pool }) {
  const { user } = useAuth();
  const { calculatePoolPoints } = pointsService();
  const { asyncRequest } = useAsyncRequest();

  async function handleClick() {
    try {
      await asyncRequest(() => calculatePoolPoints(pool.id));
    } catch (error) {
      console.error(error);
    }
  }

  function getIsInCooldown() {
    const { lastCalculatedAt } = pool;
    if (!lastCalculatedAt) return 0;
    const lastCalc = lastCalculatedAt.toDate();
    const diffInHours = (new Date() - lastCalc) / HOURS_IN_MILLISECONDS;

    return Math.max(0, Math.ceil(1 - diffInHours));
  }

  function renderContent() {
    const { createdBy } = pool;
    const isCreator = createdBy === user.email;
    const isInCooldown = getIsInCooldown();

    if (!isCreator) return null;

    return (
      <button onClick={handleClick} className="button">
        Atualizar pontuação
      </button>
    );
  }

  return renderContent();
}
