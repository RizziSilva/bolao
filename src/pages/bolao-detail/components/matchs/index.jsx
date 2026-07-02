import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { STAGES, TEAMS } from "@constants";
import { useAuth } from "@context";
import { guessService } from "@services";
import { useAsyncRequest } from "@hooks";
import { isCorrectGuess, isCorrectWinner } from "@utils";
import { MATCH_STATUS_INFO, TEAMS_INPUT } from "../../constants";
import {
  formatMatchDate,
  formatMatchsDayDate,
  handleInitialGuesses,
} from "../../utils";
import { ConfirmButton } from "../confirm-button";
import "./style.scss";

export function Matchs({ matchs = [], selectedStage, poolId }) {
  const [userGuesses, setUserGuesses] = useState({});
  const { user } = useAuth();
  const { saveMatchesGuesses, getAllMatchesGuesses } = guessService();
  const { asyncRequest } = useAsyncRequest();

  useEffect(() => {
    async function getUserMatchesGuesses() {
      try {
        const data = await asyncRequest(() =>
          getAllMatchesGuesses(poolId, user.uid, selectedStage),
        );

        setUserGuesses(handleInitialGuesses(data));
      } catch (error) {
        console.error(error);
        toast.error("Erro ao buscar os palpites do usuário.");
      }
    }

    getUserMatchesGuesses();
  }, []);

  async function handleSaveGuesses() {
    try {
      const guessesArray = Object.values(userGuesses);
      await asyncRequest(() =>
        saveMatchesGuesses(poolId, user.uid, guessesArray, selectedStage),
      );
      toast.success("Sucesso ao salvar os palpites.");
    } catch (error) {
      console.error(error);
      toast.success("Erro ao salvar os palpites.");
    }
  }

  function handleInputChange(event, matchId) {
    const { name, value } = event.target;

    setUserGuesses((current) => {
      const editing = current[matchId] || {};
      const newGuess = { ...editing, matchId, [name]: value };

      return { ...current, [matchId]: { ...newGuess } };
    });
  }

  function getInputValue(matchId, name) {
    const guess = userGuesses[matchId];

    if (guess) return guess[name] ?? "";

    return "";
  }

  function getMatchStatusInfo(match) {
    const guess = userGuesses[match.id];
    const { finished } = match;

    if (finished && !guess) return MATCH_STATUS_INFO.WITHOUT_GUESS;
    if (!finished) return MATCH_STATUS_INFO.WAITING;

    const isPerfectGuess = isCorrectGuess(guess, match);
    const isCorrectWinnerGuess = isCorrectWinner(guess, match);

    if (isPerfectGuess) return MATCH_STATUS_INFO.PERFECT;
    if (isCorrectWinnerGuess) return MATCH_STATUS_INFO.CORRECT;

    return MATCH_STATUS_INFO.WRONG;
  }

  function getTeamById(team) {
    const teamAsNumber = Number(team);
    return TEAMS.find(({ id }) => id == teamAsNumber);
  }

  function getStageLabel() {
    const stage = Object.values(STAGES).find(({ id }) => id === selectedStage);

    return stage?.label || "";
  }

  function getTeamInfo(team) {
    const foundedTeam = getTeamById(team);

    return {
      name: foundedTeam?.name || team,
      acronym: foundedTeam?.acronym || "",
    };
  }

  function renderMatchTeamsStatus(awayTeam, homeTeam) {
    const homeTeamInfo = getTeamById(homeTeam);
    const awayTeamInfo = getTeamById(awayTeam);
    const hasTeamInfos = !!homeTeamInfo && !!awayTeamInfo;

    if (hasTeamInfos) return null;

    return <span className="status">A definir</span>;
  }

  function renderAcronym(acronym) {
    if (!acronym) return null;

    return <span className="acronym">{acronym}</span>;
  }

  function renderInput(name, matchId, finished) {
    const inputValue = getInputValue(matchId, name);

    return (
      <input
        className="input"
        name={name}
        value={inputValue}
        onChange={(e) => handleInputChange(e, matchId)}
        disabled={finished}
      />
    );
  }

  function renderTeams(awayTeam, homeTeam, id, finished) {
    const homeTeamInfo = getTeamInfo(homeTeam);
    const awayTeamInfo = getTeamInfo(awayTeam);

    return (
      <>
        <span className="team">{homeTeamInfo.name}</span>
        {renderAcronym(homeTeamInfo.acronym)}
        {renderInput(TEAMS_INPUT.HOME_TEAM, id, finished)}
        <span className="versus">x</span>
        {renderInput(TEAMS_INPUT.AWAY_TEAM, id, finished)}
        {renderAcronym(awayTeamInfo.acronym)}
        <span className="team right"> {awayTeamInfo.name}</span>
      </>
    );
  }

  function renderMatchsCard(dayMatchs) {
    return dayMatchs.map((match) => {
      const { awayTeam, homeTeam, matchDate, id, finished } = match;
      const formattedDate = formatMatchDate(matchDate);
      const matchStatusInfo = getMatchStatusInfo(match);

      return (
        <div key={id} className={`container-match ${matchStatusInfo.class}`}>
          <div className="container-info">
            <span className="info">{getStageLabel()}</span>
            <span className="date">{formattedDate}</span>
            {renderMatchTeamsStatus(awayTeam, homeTeam)}
          </div>
          <div className="container-teams">
            {renderTeams(awayTeam, homeTeam, id, finished)}
          </div>
          <div className="container-status">
            <span className="status">{matchStatusInfo.text}</span>
          </div>
        </div>
      );
    });
  }
  function renderDayMatchs(matchDays) {
    return matchDays.map(({ day, matches }, index) => {
      const formattedDate = formatMatchsDayDate(day);

      return (
        <div key={index} className="container-day-matchs">
          <div className="container-header">
            <span className="text">{formattedDate}</span>
          </div>
          {renderMatchsCard(matches)}
        </div>
      );
    });
  }

  return (
    <>
      <ConfirmButton handleConfirmClick={handleSaveGuesses} />
      <div id="container-matchs-component">{renderDayMatchs(matchs)}</div>
    </>
  );
}
