import { TEAM_STATS } from "../../constants";
import "./style.scss";

export function TeamStastitics() {
  function renderHeader() {
    return (
      <div className="container-header">
        <span className="text team">Time</span>
        <span className="text">Jogos</span>
        <span className="text mobile">J.</span>
        <span className="text">Vitórias</span>
        <span className="text mobile">V.</span>
        <span className="text">Empates</span>
        <span className="text mobile">E.</span>
        <span className="text">Derrotas</span>
        <span className="text mobile">D.</span>
        <span className="text">Gols</span>
        <span className="text mobile">G.</span>
      </div>
    );
  }

  function renderStastitics() {
    return TEAM_STATS.map(
      ({ team, matchesPlayed, wins, draws, losses, goalsScored }) => (
        <div key={team} className="container-team-info">
          <span className="text">{team}</span>
          <span className="text">{matchesPlayed}</span>
          <span className="text">{wins}</span>
          <span className="text">{draws}</span>
          <span className="text">{losses}</span>
          <span className="text">{goalsScored}</span>
        </div>
      ),
    );
  }

  function renderLabels() {
    return (
      <div className="container-labels">
        <span className="text">
          * Legendas da tabela: J. : Jogos, V. : Vitórias, E. : Empates, D. :
          Derrotas e G. : Gols.
        </span>
      </div>
    );
  }

  return (
    <div id="container-team-stastitics-component">
      {renderHeader()}
      {renderStastitics()}
      {renderLabels()}
    </div>
  );
}
