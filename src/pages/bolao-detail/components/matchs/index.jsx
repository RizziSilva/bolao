import { useEffect, useState } from "react";
import { STAGES, TEAMS } from "@constants";
import { useAuth } from "@context";
import { guessService } from "@services";
import { useAsyncRequest } from "@hooks";
import { TEAMS_INPUT } from "../../constants";
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
    // TODO silva.william 25/06/2026: Adicionar feedback para sucesso e erro ao buscar os palpites.
    async function getUserMatchesGuesses() {
      try {
        const data = await asyncRequest(() =>
          getAllMatchesGuesses(poolId, user.uid, selectedStage),
        );

        setUserGuesses(handleInitialGuesses(data));
      } catch (error) {
        console.error(error);
      }
    }

    getUserMatchesGuesses();
  }, []);

  // TODO silva.william 25/06/2026: Adicionar feedback para sucesso e erro ao salvar os palpites.
  async function handleSaveGuesses() {
    try {
      const guessesArray = Object.values(userGuesses);
      await asyncRequest(() =>
        saveMatchesGuesses(poolId, user.uid, guessesArray, selectedStage),
      );
    } catch (error) {
      console.error(error);
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

    if (guess) return guess[name] || "";

    return "";
  }

  function getStageLabel() {
    const stage = Object.values(STAGES).find(({ id }) => id === selectedStage);

    return stage?.label || "";
  }

  function getTeamInfo(team) {
    const foundedTeam = TEAMS.find(({ id }) => id === team);

    return {
      name: foundedTeam?.name || team,
      acronym: foundedTeam?.acronym || "",
    };
  }

  function renderAcronym(acronym) {
    if (!acronym) return null;

    return <span className="acronym">{acronym}</span>;
  }

  function renderInput(name, matchId) {
    const inputValue = getInputValue(matchId, name);

    return (
      <input
        className="input"
        name={name}
        value={inputValue}
        onChange={(e) => handleInputChange(e, matchId)}
      />
    );
  }

  function renderTeams(awayTeam, homeTeam, awayScore, homeScore, id) {
    const homeTeamInfo = getTeamInfo(homeTeam);
    const awayTeamInfo = getTeamInfo(awayTeam);

    return (
      <>
        <span className="team">{homeTeamInfo.name}</span>
        {renderAcronym(homeTeamInfo.acronym)}
        {renderInput(TEAMS_INPUT.HOME_TEAM, id)}
        <span className="versus">x</span>
        {renderInput(TEAMS_INPUT.AWAY_TEAM, id)}
        {renderAcronym(awayTeamInfo.acronym)}
        <span className="team right"> {awayTeamInfo.name}</span>
      </>
    );
  }

  function renderMatchsCard(dayMatchs) {
    return dayMatchs.map(
      ({
        awayTeam,
        homeTeam,
        homeScore,
        awayScore,
        matchDate,
        finished,
        id,
      }) => {
        const formattedDate = formatMatchDate(matchDate);
        return (
          <div key={id} className="container-match">
            <div className="container-info">
              <span className="info">{getStageLabel()}</span>
              <span className="date">{formattedDate}</span>
              <span className="status">A definir</span>
            </div>
            <div className="container-teams">
              {renderTeams(awayTeam, homeTeam, awayScore, homeScore, id)}
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
