import { Link, useLocation } from "react-router-dom";
import { SmallLogo, DefaultUserImage } from "@statics";
import { loginService } from "@services";
import { ROUTES, ROUTES_ARRAY } from "@constants";
import { useAuth } from "@context";
import "./style.scss";

export function Navbar() {
  const { user } = useAuth();
  const { logout } = loginService();
  const location = useLocation();

  function getActiveClass(link) {
    const isActive = location.pathname === link;
    const isCurrentPageBolaoDetail = location.pathname.includes(
      ROUTES.BOLAO_DETAIL.bolaoDetailBasePathname,
    );
    const isBolaoOption = link === ROUTES.BOLAO.pathname;
    const isBolaoDetailAndBolaoOption =
      isBolaoOption && isCurrentPageBolaoDetail;
    const shouldBeActive = isBolaoDetailAndBolaoOption || isActive;

    return shouldBeActive ? "active" : "";
  }

  function renderUserImage() {
    const image = user?.photoURL || DefaultUserImage;

    return (
      <img
        className="image"
        src={image}
        alt="Imagem de perfil do usuário"
        width={32}
        height={32}
      />
    );
  }

  function renderLinks() {
    return ROUTES_ARRAY.map(({ label, pathname, Icon }) => (
      <Link to={pathname} className={`link ${getActiveClass(pathname)}`}>
        <div className={`border ${getActiveClass(pathname)}`} />
        <Icon className="image" />
        <span className="text">{label}</span>
      </Link>
    ));
  }

  function renderMobileFooter() {
    return (
      <div className="container-footer">
        <div className="container-links">{renderLinks()}</div>
      </div>
    );
  }

  return (
    <nav>
      <div className="container-header">
        <div className="container-image">
          <img src={SmallLogo} className="image" alt="Logo do site" />
        </div>
        <div className="container-links">{renderLinks()}</div>
        <div className="container-user">
          {renderUserImage()}
          <span className="user-name">{user?.displayName}</span>
          <button className="button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      {renderMobileFooter()}
    </nav>
  );
}
