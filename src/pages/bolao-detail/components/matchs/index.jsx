import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { STAGES, TEAMS } from "@constants";
import { useAuth } from "@context";
import { guessService } from "@services";
import { useAsyncRequest } from "@hooks";
import { isCorrectGuess, isCorrectWinner } from "@utils";
import {
  MATCH_STATUS_INFO,
  SAVE_GUESSES_DEFAULT_MESSAGES,
} from "../../constants";
import {
  formatMatchDate,
  formatMatchsDayDate,
  handleInitialGuesses,
} from "../../utils";
import { ConfirmButton } from "../confirm-button";
import { Teams } from "../match-team";
import "./style.scss";

export function Matchs({ matches = [], selectedStage, poolId }) {
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
  }, [selectedStage]);

  async function handleSaveGuesses() {
    try {
      const guessesArray = Object.values(userGuesses);
      await asyncRequest(() =>
        saveMatchesGuesses(poolId, user.uid, guessesArray, selectedStage),
      );
      toast.success("Sucesso ao salvar os palpites.");
    } catch (error) {
      console.error(error);
      const errorMessage = error.message || SAVE_GUESSES_DEFAULT_MESSAGES;

      toast.error(errorMessage);
    }
  }

  function getIsConfirmButtonDisabled() {
    const now = new Date();
    const hasAtLeastOneGameNotStarted = matches.some(({ matches }) =>
      matches.some(({ matchDate }) => new Date(matchDate) > now),
    );

    return !hasAtLeastOneGameNotStarted;
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

  function renderActualScore(
    awayScore,
    homeScore,
    awayTeam,
    homeTeam,
    penaltyWinner,
    finished,
  ) {
    if (!finished) return null;

    const homeTeamInfo = getTeamById(homeTeam);
    const awayTeamInfo = getTeamById(awayTeam);
    const isTied = awayScore === homeScore;
    const isAwayTeamPenaltyWinner = isTied && awayTeam === penaltyWinner;
    const isHomeTeamPenaltyWinner = isTied && homeTeam === penaltyWinner;

    return (
      <span className="text game-score">
        <span
          className={`home ${isHomeTeamPenaltyWinner ? "penalty-winner" : ""}`}
        >
          {homeTeamInfo.acronym}
        </span>{" "}
        {homeScore} x {awayScore}{" "}
        <span
          className={`away ${isAwayTeamPenaltyWinner ? "penalty-winner" : ""}`}
        >
          {awayTeamInfo.acronym}
        </span>
      </span>
    );
  }

  function renderMatchTeamsStatus(awayTeam, homeTeam) {
    const homeTeamInfo = getTeamById(homeTeam);
    const awayTeamInfo = getTeamById(awayTeam);
    const hasTeamInfos = !!homeTeamInfo && !!awayTeamInfo;

    if (!hasTeamInfos) return <span className="status">A definir</span>;

    return null;
  }

  function renderMatchsCard(dayMatchs) {
    return dayMatchs.map((match) => {
      const {
        awayTeam,
        homeTeam,
        matchDate,
        id,
        awayScore,
        homeScore,
        finished,
        penaltyWinner,
      } = match;
      const formattedDate = formatMatchDate(matchDate);
      const matchStatusInfo = getMatchStatusInfo(match);

      return (
        <div
          key={id}
          className={`container-match ${matchStatusInfo.class} ${finished ? "" : "unfinished"}`}
        >
          <div className="container-info">
            <span className="info">{getStageLabel()}</span>
            <span className="date">{formattedDate}</span>
            {renderMatchTeamsStatus(awayTeam, homeTeam)}
          </div>
          <Teams
            match={match}
            userGuesses={userGuesses}
            setUserGuesses={setUserGuesses}
            matchStatusInfo={matchStatusInfo}
          />
          <div className="container-status">
            <span className="status">{matchStatusInfo.text}</span>
          </div>
          {renderActualScore(
            awayScore,
            homeScore,
            awayTeam,
            homeTeam,
            penaltyWinner,
            finished,
          )}
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
      <ConfirmButton
        handleConfirmClick={handleSaveGuesses}
        disabled={getIsConfirmButtonDisabled()}
      />
      <div id="container-matchs-component">{renderDayMatchs(matches)}</div>
    </>
  );
}
