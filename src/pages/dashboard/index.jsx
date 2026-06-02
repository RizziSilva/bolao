import { useAuth } from "@context";
import { DASHBOARD_CARDS } from "./constants";
import "./style.scss";
import { Card } from "./components";

export function Dashboard() {
  const { user } = useAuth();

  function renderCards() {
    return DASHBOARD_CARDS.map(({ color, title, description }) => (
      <Card color={color} title={title} description={description} />
    ));
  }

  return (
    <div id="container-dashboard">
      <div className="container-content">
        <span className="title">
          Bem vindo, <span className="user">{user.displayName}</span>.
        </span>
        <div className="container-cards">{renderCards()}</div>
      </div>
    </div>
  );
}
