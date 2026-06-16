import { useState } from "react";
import { Link } from "react-router-dom";
import { poolService } from "@services";
import { BolaoCard } from "@components";
import { useAsyncRequest } from "@hooks";
import { useAuth } from "@context";
import "./style.scss";

export function Bolao() {
  const [code, setCode] = useState("");
  const { user } = useAuth();
  const { joinPool } = poolService();
  const { asyncRequest } = useAsyncRequest();

  // TODO silva.william 16/06/2026: Lidar com o erro e sucesso ao entrar no bolão.
  async function handleClick() {
    try {
      await asyncRequest(() => joinPool(code, user.uid));
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(event) {
    const { value } = event.target;

    setCode(value);
  }

  function renderBoloes() {
    return ["", ""].map(({ name, points, code = "teste" }) => (
      <Link to={`/bolao/${code}`} className="link">
        <BolaoCard name="Copa do mundo" points={0} />
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
