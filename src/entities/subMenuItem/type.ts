import type { IconName } from '../../shared';

export type SubMenuItemProps = {
  isActive: boolean;
  indicator?: boolean;
  indicatorCount?: number;
  status?: 'green' | 'blue' | 'red';
  iconName: IconName;
  title: string;
  link: string;
  isOpenSideBar?: boolean;
};
