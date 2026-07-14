import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAsyncRequest } from "@hooks";
import { STAGES } from "@constants";
import { RankingImage } from "@statics";
import { poolService } from "@services";
import { Stages, StagesSelector, UpdateButton } from "./components";
import "./style.scss";

export function BolaoDetail() {
  const [pool, setPool] = useState({});
  const [selectedStage, setSelectedStage] = useState(STAGES.GROUP.id);
  const [isShowingRanking, setIsShowingRanking] = useState(false);
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

  function handleRankingClick() {
    setIsShowingRanking(true);
  }

  function renderRankingButton() {
    return (
      <button onClick={handleRankingClick} className="button ranking"></button>
    );
  }

  function renderGuessing() {
    return (
      <>
        <StagesSelector
          selectedStage={selectedStage}
          setSelectedStage={setSelectedStage}
        />
        <Stages selectedStage={selectedStage} poolId={pool.id} />
      </>
    );
  }

  function renderContent() {
    if (isShowingRanking) return <div>Ranking</div>;

    return renderGuessing();
  }

  return (
    <div id="container-my-group-id">
      <div className="container-content">
        <div className="container-upper">
          <div className="container-title">
            <span className="title">{pool.name}</span>
            {renderRankingButton()}
          </div>
          <div className="container-actions">
            <UpdateButton pool={pool} />
            <div className="container-game-code">
              <span className="text">Código</span>
              <span className="code">{pool.code}</span>
            </div>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}
