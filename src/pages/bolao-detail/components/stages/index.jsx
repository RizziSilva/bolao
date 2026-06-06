import { MOCK_STAGES } from "@constants";
import "./style.scss";

export function Stages({ teams, setSelectedStage, selectedStage }) {
  function handleClick(id) {
    setSelectedStage(id);
  }

  function renderStages() {
    return MOCK_STAGES.map(({ id, label }) => {
      const isSelected = id === selectedStage;

      return (
        <button
          onClick={() => handleClick(id)}
          className={`${isSelected ? "selected" : ""} container-stage`}
        >
          {label}
        </button>
      );
    });
  }

  return <div id="container-stages-page">{renderStages()}</div>;
}
