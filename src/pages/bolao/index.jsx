import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { poolService } from "@services";
import { BolaoCard } from "@components";
import { useAsyncRequest } from "@hooks";
import { useAuth } from "@context";
import { SCORES_KEYS } from "@constants";
import { MAX_POOL_CODE_CHARACTERS } from "./constants";
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

  async function getPools() {
    try {
      const data = await asyncRequest(() => getUserPools(user.uid));
      setPools(data);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao buscar informações sobre os bolões.");
    }
  }

  async function handleClick() {
    try {
      await asyncRequest(() => joinPool(code, user.uid));
      await getPools();
      toast.error("Sucesso ao entrar no bolão.");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao entrar na bolão.");
    }
  }

  function handleChange(event) {
    const { value = "" } = event.target;
    const hasMaxCharacters = value.length > MAX_POOL_CODE_CHARACTERS;

    if (!hasMaxCharacters) {
      const upperCaseValue = value.toUpperCase();

      setCode(upperCaseValue);
    }
  }

  function renderBoloes() {
    const hasPools = pools.length;

    if (!hasPools) return renderWithoutPoolsMessage();

    return pools.map(({ name, scores, code }) => (
      <Link key={code} to={`/bolao/${code}`} className="link">
        <BolaoCard name={name} points={scores[[SCORES_KEYS.TOTAL_POINTS]]} />
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
