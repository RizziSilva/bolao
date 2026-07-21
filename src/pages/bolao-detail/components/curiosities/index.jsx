import { CURIOSITIES } from "../../constants";
import "./style.scss";

export function Curiosities() {
  function renderCuriosities() {
    return CURIOSITIES.map((text) => <p className="text">{text}</p>);
  }

  return <div id="container-curiosities-component">{renderCuriosities()}</div>;
}
