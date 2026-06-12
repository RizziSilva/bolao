import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MOCK_BOLAO, MOCK_STAGES, MOCK_TEAMS } from "@constants";
import { GroupStageCard, Matchs, Stages } from "./components";
import "./style.scss";

export function BolaoDetail() {
  const [bolao, setBolao] = useState({});
  const [teams, setTeams] = useState([]);
  const [selectedStage, setSelectedStage] = useState(MOCK_STAGES[0].id);
  const { code } = useParams();

  useEffect(() => {
    async function getBolãoInfo() {
      try {
        setBolao(MOCK_BOLAO);
      } catch (error) {
        console.error(error);
      }
    }

    async function getTeams() {
      try {
        setTeams(MOCK_TEAMS);
      } catch (error) {
        console.error(error);
      }
    }

    getBolãoInfo();
    getTeams();
  }, [code]);

  return (
    <div id="container-my-group-id">
      <div className="container-content">
        <div className="container-upper">
          <span className="title">{bolao.name}</span>
          <div className="container-game-code">
            <span className="text">Código</span>
            <span className="code">{bolao.code}</span>
          </div>
        </div>
        <Stages
          teams={teams}
          selectedStage={selectedStage}
          setSelectedStage={setSelectedStage}
        />
        {/* <GroupStageCard /> */}
        <Matchs />
      </div>
    </div>
  );
}
