import { TEAMS } from "@constants";
import { TEAMS_INPUT } from "../../constants";
import "./style.scss";

export function Teams({ match, userGuesses, setUserGuesses, matchStatusInfo }) {
  const { awayTeam, homeTeam, matchDate, id } = match;

  function handleInputChange(event) {
    const { name, value } = event.target;

    setUserGuesses((current) => {
      const editing = current[id] || {};
      const newGuess = { ...editing, matchId: id, [name]: value };

      return { ...current, [id]: { ...newGuess } };
    });
  }

  function handlePenaltyWinnerClick(winner) {
    setUserGuesses((current) => {
      const editing = current[id] || {};
      const newGuess = { ...editing, matchId: id, penaltyWinner: winner };

      return { ...current, [id]: { ...newGuess } };
    });
  }

  function getTeamById(team) {
    const teamAsNumber = Number(team);
    return TEAMS.find(({ id }) => id == teamAsNumber);
  }

  function getShouldShowPenaltyWinnerButton() {
    const wayTeamScore = getInputValue(TEAMS_INPUT.AWAY_TEAM);
    const homeTeamScore = getInputValue(TEAMS_INPUT.HOME_TEAM);
    const hasGuess = wayTeamScore !== "" && homeTeamScore !== "";
    const isTie = wayTeamScore === homeTeamScore;
    const isGuessingWithTie = hasGuess && isTie;

    return isGuessingWithTie;
  }

  function getTeamInfo(team) {
    const foundedTeam = getTeamById(team);

    return {
      name: foundedTeam?.name || team,
      acronym: foundedTeam?.acronym || "",
    };
  }

  function getInputValue(name) {
    const guess = userGuesses[id];

    if (guess) return guess[name] ?? "";

    return "";
  }

  function renderAcronym(acronym) {
    if (!acronym) return null;

    return <span className="acronym">{acronym}</span>;
  }

  function renderTieWinnerButton(teamId) {
    const showButton = getShouldShowPenaltyWinnerButton();

    if (!showButton) return null;

    const hasGameStarted = new Date() > new Date(matchDate);
    const matchGuess = userGuesses[id];
    const isSelected = matchGuess?.penaltyWinner === teamId;

    return (
      <button
        disabled={hasGameStarted}
        onClick={() => handlePenaltyWinnerClick(teamId)}
        className={`button ${isSelected ? "selected" : ""}`}
      >
        Vencedor
      </button>
    );
  }

  function renderInfo(team, isAway) {
    const teamInfo = getTeamInfo(team);

    return (
      <div className={`container-team-info ${isAway ? "right" : ""}`}>
        <span className="team">{teamInfo.name}</span>
        {renderAcronym(teamInfo.acronym)}
        {renderTieWinnerButton(team)}
      </div>
    );
  }

  function renderInput(name) {
    const inputValue = getInputValue(name);
    const hasGameStarted = new Date() > new Date(matchDate);

    return (
      <input
        className="input"
        name={name}
        value={inputValue}
        onChange={(e) => handleInputChange(e, id)}
        disabled={hasGameStarted}
      />
    );
  }

  return (
    <div id="container-team-component" className={`${matchStatusInfo.class}`}>
      {renderInfo(homeTeam, false)}
      {renderInput(TEAMS_INPUT.HOME_TEAM)}
      <span className="versus">x</span>
      {renderInput(TEAMS_INPUT.AWAY_TEAM)}
      {renderInfo(awayTeam, true)}
    </div>
  );
}
