import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "@context";
import { BolaoCard } from "@components";
import { SCORES_KEYS } from "@constants";
import { useAsyncRequest } from "@hooks";
import { poolService } from "@services";
import { ScoreCards } from "./components";
import "./style.scss";

export function Dashboard() {
  const [pools, setPools] = useState([]);
  const { user } = useAuth();
  const { asyncRequest } = useAsyncRequest();
  const { getUserPools } = poolService();

  useEffect(() => {
    async function getPools() {
      try {
        const data = await asyncRequest(() => getUserPools(user.uid));
        setPools(data);
      } catch (error) {
        console.error(error);
        toast.error("Erro ao buscar informações sobre os bolões.");
      }
    }

    getPools();
  }, []);

  function renderBoloes() {
    const hasPools = pools.length;

    if (!hasPools) return renderWithoutPoolsMessage();

    return pools.map(({ name, code, scores }) => (
      <Link key={code} to={`/bolao/${code}`} className="link">
        <BolaoCard
          key={name}
          name={name}
          points={scores[SCORES_KEYS.TOTAL_POINTS]}
        />
      </Link>
    ));
  }

  function renderWithoutPoolsMessage() {
    return (
      <span className="warning">
        Cadastre-se em um bolão e comece a palpitar agora!
      </span>
    );
  }

  return (
    <div id="container-dashboard">
      <div className="container-content">
        <span className="title">
          Bem vindo, <span className="user">{user.displayName}</span>.
        </span>
        <ScoreCards pools={pools} />
        <div className="container-games">
          <div className="container-title">
            <div className="border" />
            <span className="text">Meus bolões</span>
            <div className="border" />
          </div>
          <div className="container-groups">{renderBoloes()}</div>
        </div>
      </div>
    </div>
  );
}
