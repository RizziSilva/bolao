import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAsyncRequest } from "@hooks";
import { STAGES } from "@constants";
import { poolService } from "@services";
import { Stages, StagesSelector, UpdateButton } from "./components";
import "./style.scss";

export function BolaoDetail() {
  const [pool, setPool] = useState({});
  const [selectedStage, setSelectedStage] = useState(STAGES.GROUP.id);
  const { code } = useParams();
  const { getPoolByCode } = poolService();
  const { asyncRequest } = useAsyncRequest();

  useEffect(() => {
    async function getPoolInfo() {
      try {
        const data = await asyncRequest(() => getPoolByCode(code));

        setPool(data);
      } catch (error) {
        console.error(error);
        toast.error("Erro ao buscar as informações do bolão.");
      }
    }

    getPoolInfo();
  }, [code]);

  return (
    <div id="container-my-group-id">
      <div className="container-content">
        <div className="container-upper">
          <span className="title">{pool.name}</span>
          <div className="container-actions">
            <UpdateButton pool={pool} />
            <div className="container-game-code">
              <span className="text">Código</span>
              <span className="code">{pool.code}</span>
            </div>
          </div>
        </div>
        <StagesSelector
          selectedStage={selectedStage}
          setSelectedStage={setSelectedStage}
        />
        <Stages selectedStage={selectedStage} poolId={pool.id} />
      </div>
    </div>
  );
}
