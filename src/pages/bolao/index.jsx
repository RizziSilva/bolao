import { useState } from "react";
import { BolaoCard } from "@components";
import "./style.scss";

export function Bolao() {
  const [code, setCode] = useState("");

  function handleClick() {}

  function handleChange(event) {
    const { value } = event.target;

    setCode(value);
  }

  function renderBoloes() {
    return ["", ""].map(({ name, points }) => (
      <BolaoCard name="Copa do mundo" points={0} />
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
