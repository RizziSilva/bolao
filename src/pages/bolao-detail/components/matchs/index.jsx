import "./style.scss";

export function Matchs({ matchs = ["", ""] }) {
  function renderTeams() {
    return (
      <>
        <span className="team">México</span>
        <span className="acronym">MX</span>
        <input className="input" />
        <span className="versus">x</span>
        <input className="input" />
        <span className="acronym">CA</span>
        <span className="team right"> Canadá</span>
      </>
    );
  }

  function renderMatchsCard() {
    return matchs.map(() => (
      <div className="container-match">
        <div className="container-info">
          <span className="info">Primeira partida</span>
          <span className="date">29 jun - 14:00</span>
          <span className="status">A definir</span>
        </div>
        <div className="container-teams">{renderTeams()}</div>
        <div className="container-status">
          <span className="status">Aguardando</span>
        </div>
      </div>
    ));
  }
  function renderDayMatchs({ dayMatchs = ["", ""] }) {
    return dayMatchs.map(() => (
      <div className="container-day-matchs">
        <div className="container-header">
          <span className="text">Segunda Feira - 29 junho</span>
        </div>
        {renderMatchsCard()}
      </div>
    ));
  }

  return <div id="container-matchs-component">{renderDayMatchs({})}</div>;
}
