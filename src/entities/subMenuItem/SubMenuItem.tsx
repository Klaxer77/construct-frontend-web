import { Link } from "react-router";
import { Icon } from "../../shared";
import type { SubMenuItemProps } from "./type";

export const SubMenuItem: React.FC<SubMenuItemProps> = ({
  isActive,
  indicator = false,
  indicatorCount = 0,
  iconName,
  title,
  status = "red",
  link,
  isOpenSideBar,
}) => {
  return (
    <Link to={link} className="flex items-center cursor-pointer ">
      {isOpenSideBar && (
        <svg
          className="ml-[-1.5px]"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="13"
          viewBox="0 0 16 13"
          fill="none"
        >
          <path
            d="M1.07744 1.60736C1.23321 6.60495 5.19858 13.2831 14.4576 11.0912"
            stroke="#DCDCDC"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
      <div
        className={`${
          isActive ? "bg-blueSideBarActive" : "bg-transparent pr-0 pl-[12px]"
        } w-full gap-[10px] h-[44px] px-[14px] ${
          isOpenSideBar ? "rounded-[14px]" : "pl-[5px] rounded-[8px]"
        } flex items-center justify-between transition-colors duration-300`}
      >
        <div
          className={`flex items-center gap-[5px] ${
            !isOpenSideBar && isActive ? "pl-[10px]" : "pl-[0px]"
          }`}
        >
          <Icon color={`${isActive ? "white" : "#858585"}`} name={iconName} />
          <p
            className={`text-[14px] font-[600] leading-[20px] ${
              isActive ? "text-white" : "text-gray60"
            } ${
              isOpenSideBar ? "opacity-100" : "opacity-0"
            } transition-colors duration-300 whitespace-nowrap`}
          >
            {title}
          </p>
        </div>
        {indicator && (
          <div className="rounded-[50%] text-[14px] w-[26px] h-[26px] bg-[#F0EFEF] text-[#0B0B0B] font-[600] relative flex justify-center items-center">
            <p className="mt-[1px]">{indicatorCount}</p>
            <Icon
              name={status === "red" ? "RedDot" : "GreenDot"}
              className="absolute right-0 bottom-0"
            />
          </div>
        )}
      </div>
    </Link>
  );
};
