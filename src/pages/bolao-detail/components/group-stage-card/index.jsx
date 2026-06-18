import { useState } from "react";
import { MOCK_TEAMS } from "@constants";
import "./style.scss";

export function GroupStageCard() {
  const [selectedTeams, setSelectedTeams] = useState({});

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
    return MOCK_TEAMS.reduce((groups, team) => {
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
    <div id="container-group-stage-card-component">{renderGroupCards()}</div>
  );
}
