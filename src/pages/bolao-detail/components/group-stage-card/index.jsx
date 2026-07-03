import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TEAMS } from "@constants";
import { useAuth } from "@context";
import { groupService, guessService } from "@services";
import { useAsyncRequest } from "@hooks";
import { handleUserGroupGuesses } from "../../utils";
import { ConfirmButton } from "../confirm-button";
import {
  TODAY,
  GROUP_STAGE_STARTING_DATE,
  GROUPS_STATUS_INFO,
} from "../../constants";
import "./style.scss";

export function GroupStageCard({ poolId }) {
  const [selectedTeams, setSelectedTeams] = useState({});
  const [groupQualifiers, setGroupQualifiers] = useState([]);
  const { user } = useAuth();
  const { asyncRequest } = useAsyncRequest();
  const { getGroupGuesses: getGroupGuess, saveGroupGuess } = guessService();
  const { getAllGroupStageQualifiers } = groupService();
  const isSelectionDisabled = TODAY >= GROUP_STAGE_STARTING_DATE;

  useEffect(() => {
    async function getGroupQualifiers() {
      try {
        const data = await asyncRequest(() => getAllGroupStageQualifiers());

        setGroupQualifiers(data);
      } catch (error) {
        console.error(error);
        toast.error("Erro ao buscar os resultados da fase de grupos.");
      }
    }

    async function getUserGroupGuesses() {
      try {
        const data = await asyncRequest(() => getGroupGuess(poolId, user.uid));
        const initialGuesses = handleUserGroupGuesses(data);

        setSelectedTeams(initialGuesses);
      } catch (error) {
        console.error(error);
        toast.error("Erro ao buscar os palpites do usuário.");
      }
    }

    if (poolId) getUserGroupGuesses();
    getGroupQualifiers();
  }, [poolId]);

  async function handleSaveGuesses() {
    try {
      const guesses = [];
      const selectedTeamsArray = Object.entries(selectedTeams);

      selectedTeamsArray.forEach(([key, value]) => {
        const hasTwoQualifiers = value.length === 2;

        if (hasTwoQualifiers) guesses.push({ groupId: key, qualifiers: value });
      });

      await asyncRequest(() => saveGroupGuess(poolId, user.uid, guesses));
      toast.success("Palpites cadastrados com sucesso.");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar os palpites.");
    }
  }

  function handleSelectedTeam(group, teamId) {
    setSelectedTeams((current) => {
      const selected = current[group] || [];
      const hasTeamAlreadyBeenSelected = selected.includes(teamId);
      const hasTwoSelectedTeamsAlready = selected.length >= 2;

      if (hasTeamAlreadyBeenSelected)
        return {
          ...current,
          [group]: selected.filter((id) => id !== teamId),
        };

      if (hasTwoSelectedTeamsAlready) return current;

      return {
        ...current,
        [group]: [...selected, teamId],
      };
    });
  }

  function getGuessStatus(groupResults, teamId, isSelected) {
    if (!groupResults) return "";

    const isRunnerUp = groupResults.qualifiers.includes(teamId);

    if (!isSelected) {
      return isRunnerUp ? GROUPS_STATUS_INFO.UNSELECTED_CORRECT : "";
    } else
      return isRunnerUp ? GROUPS_STATUS_INFO.CORRECT : GROUPS_STATUS_INFO.WRONG;
  }

  function getTeamsAsGroups() {
    return TEAMS.reduce((groups, team) => {
      if (!groups[team.group]) groups[team.group] = [];

      groups[team.group].push(team);
      return groups;
    }, {});
  }

  function renderGroupTeams(teams, group, groupResults) {
    return teams.map(({ name, acronym, id }) => {
      const isSelected = selectedTeams[group]?.includes(id);
      const guessStatus = getGuessStatus(groupResults, id, isSelected);

      return (
        <div key={id} className={`container-team ${guessStatus}`}>
          <span className="name">
            {name} - <span className="acronym">{acronym}</span>
          </span>
          <button
            disabled={isSelectionDisabled}
            className={`button ${isSelected ? "selected" : ""}`}
            onClick={() => handleSelectedTeam(group, id)}
          />
        </div>
      );
    });
  }

  function renderGroupCards() {
    const groupsInfo = getTeamsAsGroups();

    return Object.entries(groupsInfo).map(([group, teams]) => {
      const groupResults = groupQualifiers.find(({ id }) => id === group);

      return (
        <div key={group} className="container-group">
          <span className="title">Grupo {group}</span>
          {renderGroupTeams(teams, group, groupResults)}
        </div>
      );
    });
  }

  return (
    <>
      <ConfirmButton
        disabled={isSelectionDisabled}
        handleConfirmClick={handleSaveGuesses}
      />
      <div id="container-group-stage-card-component">{renderGroupCards()}</div>
    </>
  );
}
