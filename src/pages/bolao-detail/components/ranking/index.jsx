import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { pointsService } from "@services";
import { useAsyncRequest } from "@hooks";
import "./style.scss";

export function Ranking({ poolId }) {
  const [members, setMembers] = useState([]);
  const { getPoolRanking } = pointsService();
  const { asyncRequest } = useAsyncRequest();

  useEffect(() => {
    async function getMembersPoints() {
      try {
        const data = await asyncRequest(() => getPoolRanking(poolId));

        setMembers(data);
      } catch (error) {
        console.error(error);

        toast.error("Erro ao buscar as pontuações do bolão.");
      }
    }

    getMembersPoints();
  }, [poolId]);

  function renderHeader() {
    return (
      <div className="container-header">
        <span className="text">Posição</span>
        <span className="text">Usuário</span>
        <span className="text">Perfeitos</span>
        <span className="text">Pontos</span>
      </div>
    );
  }

  function renderMembers() {
    return members.map(
      ({ position, displayName, perfectScores, totalPoints }) => (
        <div className="container-user-info">
          <span className="text">{position}</span>
          <span className="text name">{displayName}</span>
          <span className="text">{perfectScores}</span>
          <span className="text">{totalPoints}</span>
        </div>
      ),
    );
  }

  return (
    <div id="container-ranking-component">
      {renderHeader()}
      {renderMembers()}
    </div>
  );
}
