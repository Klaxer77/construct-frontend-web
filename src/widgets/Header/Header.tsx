import type { ReactNode } from "react";

interface HeaderProps {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  classNameSubTitle?: string;
  className?: string;
}

export const Header = ({ children, title, subtitle, classNameSubTitle, className }: HeaderProps) => {
  return (
    <div className={`py-[30px] flex items-center justify-between ${className}`}>
      <div className="flex flex-col gap-[8px]">
        <h1 className="font-[800] text-[24px] leading-[28px] tracking-[-0.2px] text-blackText">
          {title}
        </h1>
        <p className={`font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-gray ${classNameSubTitle}`}>
          {subtitle}
        </p>
      </div>
      {children}
    </div>
  );
};
