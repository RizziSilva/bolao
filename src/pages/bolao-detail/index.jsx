import { useParams } from "react-router-dom";
import "./style.scss";

export function BolaoDetail() {
  const { code } = useParams();

  return <div id="container-my-group-id"></div>;
}
