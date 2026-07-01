import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TEAMS } from "@constants";
import { useAuth } from "@context";
import { guessService } from "@services";
import { useAsyncRequest } from "@hooks";
import { handleUserGroupGuesses } from "../../utils";
import { ConfirmButton } from "../confirm-button";
import "./style.scss";

export function GroupStageCard({ poolId }) {
  const [selectedTeams, setSelectedTeams] = useState({});
  const { user } = useAuth();
  const { asyncRequest } = useAsyncRequest();
  const { getGroupGuesses: getGroupGuess, saveGroupGuess } = guessService();

  useEffect(() => {
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

  function getTeamsAsGroups() {
    return TEAMS.reduce((groups, team) => {
      if (!groups[team.group]) groups[team.group] = [];

      groups[team.group].push(team);
      return groups;
    }, {});
  }

  function renderGroupTeams(teams, group) {
    return teams.map(({ name, acronym, id }) => {
      const isSelected = selectedTeams[group]?.includes(id);

      return (
        <div key={id} className="container-team">
          <span className="name">
            {name} - <span className="acronym">{acronym}</span>
          </span>
          <button
            className={`button ${isSelected ? "selected" : ""}`}
            onClick={() => handleSelectedTeam(group, id)}
          />
        </div>
      );
    });
  }

  function renderGroupCards() {
    const groupsInfo = getTeamsAsGroups();

    return Object.entries(groupsInfo).map(([group, teams]) => (
      <div key={group} className="container-group">
        <span className="title">Grupo {group}</span>
        {renderGroupTeams(teams, group)}
      </div>
    ));
  }

  return (
    <>
      <ConfirmButton handleConfirmClick={handleSaveGuesses} />
      <div id="container-group-stage-card-component">{renderGroupCards()}</div>
    </>
  );
}
