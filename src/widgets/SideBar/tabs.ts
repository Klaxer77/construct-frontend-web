import type { IconName } from "../../shared";

interface tabsTypes {
  icon: IconName;
  name: string;
  path: string;
}

export const tabs: tabsTypes[] = [
  {
    icon: "Home",
    name: "Дашборд",
    path: "/dashboard",
  },
];
