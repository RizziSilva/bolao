import { PLAYER_STASTITICS } from "../../constants";
import "./style.scss";

export function PlayerStastitics() {
  function renderHeader() {
    return (
      <div className="container-header">
        <span className="text">Jogador</span>
        <span className="text">Time</span>
        <span className="text">Gols</span>
        <span className="text">Assistências</span>
      </div>
    );
  }

  function renderStastitics() {
    return PLAYER_STASTITICS.map(({ assists, name, team, goals, acronym }) => (
      <div key={name} className="container-user-info">
        <span className="text name">{name}</span>
        <span className="text team">{team}</span>
        <span className="text acronym">{acronym}</span>
        <span className="text">{goals}</span>
        <span className="text">{assists}</span>
      </div>
    ));
  }
  return (
    <div id="container-player-stastitics-component">
      {renderHeader()}
      {renderStastitics()}
    </div>
  );
}
