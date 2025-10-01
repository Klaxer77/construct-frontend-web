import type { IconName } from "../../assets/icons/types";

export type DropDownProps = {
  className?: string;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  iconName: IconName;
  isOpenSideBar?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};