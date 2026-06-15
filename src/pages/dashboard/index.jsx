import { useAuth } from "@context";
import { BolaoCard } from "@components";
import { ScoreCards } from "./components";
import "./style.scss";

export function Dashboard() {
  const { user } = useAuth();

  function renderBoloes() {
    return ["", ""].map(({ name, points }) => (
      <BolaoCard key={name} name="Copa do mundo" points={0} />
    ));
  }

  return (
    <div id="container-dashboard">
      <div className="container-content">
        <span className="title">
          Bem vindo, <span className="user">{user.displayName}</span>.
        </span>
        <ScoreCards />
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
