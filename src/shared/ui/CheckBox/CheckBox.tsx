"use client";

import { Icon } from "../..";

interface CheckBoxProps {
  checked: boolean;
  onClick?: () => void;
}

export const CheckBox = ({ checked, onClick }: CheckBoxProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-[24px] h-[24px] cursor-pointer rounded-[5px] bg-[#F1F1F1] flex items-center justify-center transition
        ${checked && "bg-blueSideBarActive border-blueSideBarActive"}
        
      `}
    >
      {checked && <Icon name="CheckMark" />}
    </button>
  );
};
