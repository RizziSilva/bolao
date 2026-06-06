import { BolaoIcon, HomeIcon } from "@statics";

export const ROUTES = {
  DASHBOARD: {
    label: "Dashboard",
    pathname: "/dashboard",
    Icon: HomeIcon,
  },
  BOLAO: {
    label: "Bolão",
    pathname: "/bolao",
    Icon: BolaoIcon,
  },
  BOLAO_DETAIL: {
    label: "Bolão Detail",
    pathname: "/bolao/:code",
    bolaoDetailBasePathname: "/bolao/",
    Icon: BolaoIcon,
  },
};

export const ROUTES_ARRAY = [ROUTES.DASHBOARD, ROUTES.BOLAO];
