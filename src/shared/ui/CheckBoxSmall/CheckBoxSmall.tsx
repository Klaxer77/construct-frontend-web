"use client";

import { Icon } from "../..";

interface CheckBoxSmallProps {
  checked: boolean;
  onClick: () => void;
}

export const CheckBoxSmall = ({ checked, onClick }: CheckBoxSmallProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-[20px] h-[20px] cursor-pointer rounded-[2px] border border-[#DFDFDF] flex items-center justify-center transition
        ${checked && "bg-blueSideBarActive border-blueSideBarActive"}
        
      `}
    >
      {checked && <Icon name="CheckMark" />}
    </button>
  );
};
