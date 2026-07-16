import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "@context";
import { useAsyncRequest } from "@hooks";
import { STAGES } from "@constants";
import { poolService, userService } from "@services";
import {
  Stages,
  StagesSelector,
  UpdateButton,
  Ranking,
  Stastitics,
} from "./components";
import { CONTENT_BUTTONS, CONTENT_KEYS } from "./constants";
import "./style.scss";

export function BolaoDetail() {
  const [pool, setPool] = useState({});
  const [selectedStage, setSelectedStage] = useState(STAGES.GROUP.id);
  const [contentKey, setContentKey] = useState("");
  const { user } = useAuth();
  const { code } = useParams();
  const { getPoolByCode } = poolService();
  const { updateMemberInfo } = userService();
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

  useEffect(() => {
    async function updateUserInfoOnPool() {
      try {
        await asyncRequest(() => updateMemberInfo(pool.id, user));
      } catch (error) {
        console.error(error);
      }
    }

    if (pool.id) updateUserInfoOnPool();
  }, [pool.id]);

  function handleContentButtonClick(key) {
    setContentKey((prev) => {
      const isSameKey = prev === key;

      return isSameKey ? "" : key;
    });
  }

  function getContentButtonText(text, key) {
    if (key === contentKey) return "Jogos";

    return text;
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
    switch (contentKey) {
      case CONTENT_KEYS.RANKING:
        return <Ranking poolId={pool.id} />;
      case CONTENT_KEYS.STATISTICS:
        return <Stastitics />;
      default:
        return renderGuessing();
    }
  }

  function renderContentButtons() {
    return CONTENT_BUTTONS.map(({ text, key }) => {
      const buttonText = getContentButtonText(text, key);

      return (
        <button
          onClick={() => handleContentButtonClick(key)}
          className="content-button"
        >
          {buttonText}
        </button>
      );
    });
  }

  return (
    <div id="container-my-group-id">
      <div className="container-content">
        <div className="container-upper">
          <div className="container-title">
            <span className="title">{pool.name}</span>
          </div>
          <div className="container-actions">
            <UpdateButton pool={pool} />
            <div className="container-game-code">
              <span className="text">Código</span>
              <span className="code">{pool.code}</span>
            </div>
          </div>
        </div>
        <div className="container-ranking-button">{renderContentButtons()}</div>
        {renderContent()}
      </div>
    </div>
  );
}
