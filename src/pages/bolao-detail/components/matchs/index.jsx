import { STAGES } from "@constants";
import { formatMatchDate, formatMatchsDayDate } from "../../utils";
import "./style.scss";

export function Matchs({ matchs = [], selectedStage }) {
  function getStageLabel() {
    const stage = Object.values(STAGES).find(({ id }) => id === selectedStage);

    return stage?.label || "";
  }

  function renderTeams(awayTeam, homeTeam, awayScore, homeScore) {
    return (
      <>
        <span className="team">{awayTeam}</span>
        <span className="acronym">MX</span>
        <input className="input" />
        <span className="versus">x</span>
        <input className="input" />
        <span className="acronym">CA</span>
        <span className="team right"> {homeTeam}</span>
      </>
    );
  }

  function renderMatchsCard(dayMatchs) {
    return dayMatchs.map(
      ({ awayTeam, homeTeam, homeScore, awayScore, matchDate, finished }) => {
        const formattedDate = formatMatchDate(matchDate);
        return (
          <div className="container-match">
            <div className="container-info">
              <span className="info">{getStageLabel()}</span>
              <span className="date">{formattedDate}</span>
              <span className="status">A definir</span>
            </div>
            <div className="container-teams">
              {renderTeams(awayTeam, homeTeam, awayScore, homeScore)}
            </div>
            <div className="container-status">
              <span className="status">Aguardando</span>
            </div>
          </div>
        );
      },
    );
  }
  function renderDayMatchs(matchDays) {
    console.log(matchDays);
    return matchDays.map(({ day, matches }) => {
      const formattedDate = formatMatchsDayDate(day);

      return (
        <div className="container-day-matchs">
          <div className="container-header">
            <span className="text">{formattedDate}</span>
          </div>
          {renderMatchsCard(matches)}
        </div>
      );
    });
  }

  return <div id="container-matchs-component">{renderDayMatchs(matchs)}</div>;
}
