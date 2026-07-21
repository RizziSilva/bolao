import { useState } from "react";
import { StastiticsSelector } from "../stastitics-selector";
import { TeamStastitics } from "../team-stastitics";
import { PlayerStastitics } from "../players-stastitics";
import { Curiosities } from "../curiosities";
import { STASTITICS_STAGES } from "../../constants";
import "./style.scss";

export function Stastitics() {
  const [selectedStastitics, setSelectedStastitics] = useState(
    STASTITICS_STAGES.PLAYER.id,
  );

  function renderSelectedStastitics() {
    switch (selectedStastitics) {
      case STASTITICS_STAGES.PLAYER.id:
        return <PlayerStastitics />;
      case STASTITICS_STAGES.TEAMS.id:
        return <TeamStastitics />;
      case STASTITICS_STAGES.CURIOSITIES.id:
        return <Curiosities />;
      default:
        return <PlayerStastitics />;
    }
  }

  return (
    <div id="container-statitics-component">
      <StastiticsSelector
        selectedStastitics={selectedStastitics}
        setSelectedStastitics={setSelectedStastitics}
      />
      {renderSelectedStastitics()}
    </div>
  );
}
