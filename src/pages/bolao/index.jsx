import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { poolService } from "@services";
import { BolaoCard } from "@components";
import { useAsyncRequest } from "@hooks";
import { useAuth } from "@context";
import { SCORES_KEYS } from "@constants";
import "./style.scss";

export function Bolao() {
  const [pools, setPools] = useState([]);
  const [code, setCode] = useState("");
  const { user } = useAuth();
  const { joinPool, getUserPools } = poolService();
  const { asyncRequest } = useAsyncRequest();

  useEffect(() => {
    getPools();
  }, []);

  // TODO silva.william 16/06/2026: Lidar com o erro e sucesso ao buscar os bolões.
  async function getPools() {
    try {
      const data = await asyncRequest(() => getUserPools(user.uid));
      setPools(data);
    } catch (error) {
      console.error(error);
    }
  }

  // TODO silva.william 16/06/2026: Lidar com o erro e sucesso ao entrar no bolão.
  async function handleClick() {
    try {
      await asyncRequest(() => joinPool(code, user.uid));
      await getPools();
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(event) {
    const { value } = event.target;

    setCode(value);
  }

  function renderBoloes() {
    return pools.map(({ name, scores, code }) => (
      <Link key={code} to={`/bolao/${code}`} className="link">
        <BolaoCard name={name} points={scores[[SCORES_KEYS.TOTAL_POINTS]]} />
      </Link>
    ));
  }

  return (
    <div id="container-bolao-page">
      <div className="container-content">
        <span className="title">Meus Bolões</span>
        <div className="container-groups">{renderBoloes()}</div>
        <div className="container-join">
          <div className="container-title">
            <div className="border" />
            <span className="text">Participe de um bolão</span>
            <div className="border" />
          </div>
          <div className="container-content">
            <input
              className="input"
              placeholder="Código do bolão"
              onChange={handleChange}
              value={code}
            />
            <button className="button" onClick={handleClick}>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
