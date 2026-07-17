import { useState } from "react";
import { StastiticsSelector } from "../stastitics-selector";
import { PlayerStastitics } from "../players-stastitics";
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
