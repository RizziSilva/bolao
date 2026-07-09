import { useEffect, useState } from "react";
import { STAGES } from "@constants";
import { matchesService } from "@services";
import { useAsyncRequest } from "@hooks";
import { Matchs } from "../matchs";
import { GroupStageCard } from "../group-stage-card";
import { groupMatchesByDay } from "../../utils";

export function Stages({ selectedStage, poolId }) {
  const [matches, setMatches] = useState([]);
  const { getAllMatches } = matchesService();
  const { asyncRequest } = useAsyncRequest();

  useEffect(() => {
    async function getAllPoolMatches() {
      try {
        const data = await asyncRequest(() => getAllMatches());

        setMatches(data);
      } catch (error) {
        console.error(error);
      }
    }

    getAllPoolMatches();
  }, []);

  function getSelectedStageMatches() {
    const filteredMatches = matches.filter(
      ({ stage }) => stage === selectedStage,
    );
    const groupedMatches = groupMatchesByDay(filteredMatches);

    return groupedMatches;
  }

  function renderStage() {
    switch (selectedStage) {
      case STAGES.GROUP.id:
        return <GroupStageCard poolId={poolId} />;
      default:
        return (
          <Matchs
            poolId={poolId}
            selectedStage={selectedStage}
            matches={getSelectedStageMatches()}
          />
        );
    }
  }

  return renderStage();
}
