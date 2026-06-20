import { STAGES } from "@constants";
import { GroupStageCard } from "../group-stage-card";
import { Matchs } from "../matchs";

export function Stages({ selectedStage }) {
  function renderStage() {
    switch (selectedStage) {
      case STAGES.GROUP.id:
        return <GroupStageCard />;
      default:
        return <Matchs />;
    }
  }

  return renderStage();
}
