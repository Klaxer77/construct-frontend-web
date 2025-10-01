import type { ReactElement } from "react";
import { Icon } from "../..";

interface RoundButtonProps {
  icon: ReactElement;
  onClick: () => void;
  hasNotification?: boolean;
}

export const RoundButton = ({
  icon,
  onClick,
  hasNotification,
}: RoundButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-[48px] h-[48px] rounded-full border border-borderGray flex items-center justify-center relative"
    >
      {icon}
      {hasNotification && (
        <Icon name="RedDot" className="absolute top-[12px] right-[12px]" />
      )}
    </button>
  );
};
