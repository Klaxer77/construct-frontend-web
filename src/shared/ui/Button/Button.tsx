import type { ReactElement } from "react";

interface ButtonProps {
  text: string;
  icon?: ReactElement;
  onClick?: () => void;
  style?: "white" | "blue" | "black" | "red";
  position?: "left" | "right";
  className?: string;
}

export const Button = ({
  text,
  icon,
  onClick,
  style = "blue",
  position = "left",
  className,
}: ButtonProps) => {
  const styleMap = {
    white: { styles: "border border-borderGray bg-white text-blackText" },
    blue: { styles: "bg-blueSideBarActive text-white" },
    black: { styles: "text-white bg-black" },
    red: { styles: "text-white bg-[#E02D3C]" },
  };
  const { styles } = styleMap[style];
  return (
    <button
      onClick={onClick}
      className={`h-[36px] flex items-center gap-[10px] cursor-pointer px-[14px] rounded-[8px] font-[700] text-[14px] leading-[24px] w-max ${
        style === "white" && "shadow-[0_1px_1px_0_#0000000f]"
      } ${styles} ${className}`}
    >
      {icon && position === "left" && icon}
      {text}
      {icon && position === "right" && icon}
    </button>
  );
};
