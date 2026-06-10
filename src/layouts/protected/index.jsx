import { Navbar } from "@components";
import { Outlet } from "react-router-dom";
import "./style.scss";

export function ProtectedLayout() {
  return (
    <>
      <Navbar />
      <div id="container-protected-layout">
        <Outlet />
      </div>
    </>
  );
}
