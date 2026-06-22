import { STAGES } from "@constants";
import { GroupStageCard } from "../group-stage-card";
import { Matchs } from "../matchs";

export function Stages({ selectedStage, poolId }) {
  function renderStage() {
    switch (selectedStage) {
      case STAGES.GROUP.id:
        return <GroupStageCard poolId={poolId} />;
      default:
        return <Matchs />;
    }
  }

  return renderStage();
}
