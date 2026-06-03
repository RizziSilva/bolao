import { BolaoCard } from "@components";
import "./style.scss";

export function Bolao() {
  function renderBoloes() {
    return ["", ""].map(({ name, points }) => (
      <BolaoCard name="Copa do mundo" points={0} />
    ));
  }

  return (
    <div id="container-bolao-page">
      <div className="container-content">
        <span className="title">Meus Boloes</span>
        <div className="container-groups">{renderBoloes()}</div>
        <div className="container-join">
          <div className="container-title">
            <div className="border" />
            <span className="text">Participe de um bolão</span>
            <div className="border" />
          </div>
        </div>
      </div>
    </div>
  );
}
