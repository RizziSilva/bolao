import { useAuth } from "@context";
import { DASHBOARD_CARDS } from "./constants";
import "./style.scss";
import { BolaoCard, Card } from "./components";

export function Dashboard() {
  const { user } = useAuth();

  function renderCards() {
    return DASHBOARD_CARDS.map(({ color, title, description }) => (
      <Card color={color} title={title} description={description} />
    ));
  }

  function renderBoloes() {
    return ["", ""].map(({ name, points }) => (
      <BolaoCard name="Copa do mundo" points={0} />
    ));
  }

  return (
    <div id="container-dashboard">
      <div className="container-content">
        <span className="title">
          Bem vindo, <span className="user">{user.displayName}</span>.
        </span>
        <div className="container-cards">{renderCards()}</div>
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
