import { SmallLogo } from "@statics";
import "./style.scss";

export function Loader() {
  return (
    <div id="container-loader">
      <div className="blur" />
      <img className="logo" src={SmallLogo} alt="Loading" />
    </div>
  );
}
