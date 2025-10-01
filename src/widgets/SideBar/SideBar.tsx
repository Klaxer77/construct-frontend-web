import { useState } from "react";
import { Icon } from "../../shared";
import { DropDown } from "../../shared";
import { SubMenuItem } from "../../entities/subMenuItem/SubMenuItem";
import { Link, useLocation } from "react-router";
import { useUserStore } from "../../shared/stores/userStore";
import staff from "/img/Staff.png";

export const SideBar: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}> = ({ isOpen, setIsOpen }) => {
  const [projectsOpen, setProjectsOpen] = useState(false);
  const location = useLocation();
  const { user } = useUserStore();

  const path = location.pathname;

  return (
    <div
      className={`pt-[40px] pb-[20px] bg-[#FCFCFC] ${
        !isOpen ? "w-[70px] px-[10px]" : "w-[274px] px-[20px]"
      } flex flex-col justify-between overflow-hidden overflow-y-auto transition-all duration-300 fixed top-0 left-0 h-[100vh] [scrollbar-width:none] [-ms-overflow-style:none] [ &::-webkit-scrollbar]:hidden`}
    >
      <div>
        <div
          className={`border-b border-borderGray pb-[10px] ${
            !isOpen && "flex flex-col items-center"
          }`}
        >
          <div className="flex justify-between items-center">
            {isOpen && <Icon className="w-[27px] h-[27px]" name="Logo" />}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer w-[30px] h-[30px] rounded-[50%] flex justify-center items-center border border-borderGray"
            >
              <Icon
                className={`${
                  !isOpen && "rotate-180"
                } w-[25px] h-[15px] transition duration-300`}
                name="TickLeft"
              />
            </button>
          </div>
          {isOpen && <Icon name="LogoText" />}
          <p className="text-gray60 text-[14px] font-[600] mt-[10px] leading-[20px] h-[20px] whitespace-nowrap">
            {isOpen ? "Управление проектами" : "Меню"}
          </p>
        </div>
        <nav className="mt-[23px] flex flex-col gap-[10px]">
          <Link
            to="/dashboard"
            className={`
    flex items-center gap-[10px]
    ${
      isOpen
        ? "h-[44px] px-[12px] rounded-[14px]"
        : "pl-[13px] h-[40px] rounded-[8px]"
    }
    transition-all duration-300
    ${path === "/dashboard" ? "bg-blueSideBarActive" : "bg-transparent"}
  `}
          >
            <Icon
              color={path === "/dashboard" ? "white" : "#858585"}
              name="Home"
              className="shrink-0"
            />

            <span
              className={`
      font-[600] leading-[24px] whitespace-nowrap transition-all duration-300
     ${isOpen ? "opacity-100" : "opacity-0"}
      ${path === "/dashboard" ? "text-white" : "text-[#858585]"}
    `}
            >
              Дашборд
            </span>
          </Link>
          <div className={`gap-[10px] flex flex-col ${isOpen ? "" : ""}`}>
            <DropDown
              isOpenSideBar={isOpen}
              iconName="Projects"
              isOpen={projectsOpen}
              setOpen={setProjectsOpen}
              title="Проекты"
            >
              <div className="flex">
                {isOpen && (
                  <div>
                    <div className="h-full max-h-[165px] ml-[1px] w-[1.5px] bg-[#DCDCDC] rounded-[50%]" />
                  </div>
                )}
                <div className="w-full flex flex-col gap-[5px]">
                  <SubMenuItem
                    isOpenSideBar={isOpen}
                    link="/objects"
                    isActive={path.includes("/objects")}
                    iconName="Folder"
                    title="Объекты"
                  />
                  <SubMenuItem
                    isOpenSideBar={isOpen}
                    link="/tasks"
                    indicator
                    indicatorCount={8}
                    isActive={path.includes("/tasks")}
                    iconName="Folder"
                    title="Задачи"
                  />
                  <SubMenuItem
                    isOpenSideBar={isOpen}
                    isActive={path === "/vedomosti"}
                    link="/vedomosti"
                    iconName="Chat"
                    title="Ведомости"
                  />
                  <SubMenuItem
                    isOpenSideBar={isOpen}
                    indicator
                    link="/progress"
                    status="green"
                    indicatorCount={3}
                    isActive={path.includes("/progress")}
                    iconName="Calendar"
                    title="Ход работ"
                  />
                </div>
              </div>
            </DropDown>
            <Link
              to="/journal"
              className={`
    flex items-center gap-[10px]
    ${
      isOpen
        ? "h-[44px] px-[12px] rounded-[14px]"
        : "pl-[13px] h-[40px] rounded-[8px]"
    }
    transition-all duration-300
    ${path === "/journal" ? "bg-blueSideBarActive" : "bg-transparent"}
  `}
            >
              <Icon
                color={path === "/journal" ? "white" : "#858585"}
                name="Graph"
                className="shrink-0"
              />

              <span
                className={`
      font-[600] leading-[24px] whitespace-nowrap transition-all duration-300
     ${isOpen ? "opacity-100" : "opacity-0"}
      ${path === "/journal" ? "text-white" : "text-[#858585]"}
    `}
              >
                Журнал Работ
              </span>
            </Link>
            <Link
              to="/users"
              className={`
    flex items-center gap-[10px]
    ${
      isOpen
        ? "h-[44px] px-[12px] rounded-[14px]"
        : "pl-[13px] h-[40px] rounded-[8px]"
    }
    transition-all duration-300
    ${path === "/users" ? "bg-blueSideBarActive" : "bg-transparent"}
  `}
            >
              <Icon
                color={path === "/users" ? "white" : "#858585"}
                name="Users"
                className="shrink-0"
              />

              <span
                className={`
      font-[600] leading-[24px] whitespace-nowrap transition-all duration-300
     ${isOpen ? "opacity-100" : "opacity-0"}
      ${path === "/users" ? "text-white" : "text-[#858585]"}
    `}
              >
                Пользователи
              </span>
            </Link>
            <Link
              to="/settings"
              className={`
    flex items-center gap-[10px]
    ${
      isOpen
        ? "h-[44px] px-[12px] rounded-[14px]"
        : "pl-[13px] h-[40px] rounded-[8px]"
    }
    transition-all duration-300
    ${path === "/settings" ? "bg-blueSideBarActive" : "bg-transparent"}
  `}
            >
              <Icon
                color={path === "/settings" ? "white" : "#858585"}
                name="Settings"
                className="shrink-0"
              />

              <span
                className={`
      font-[600] leading-[24px] whitespace-nowrap transition-all duration-300
     ${isOpen ? "opacity-100" : "opacity-0"}
      ${path === "/settings" ? "text-white" : "text-[#858585]"}
    `}
              >
                Настройки
              </span>
            </Link>
          </div>
        </nav>
      </div>

      <div>
        <div className="flex justify-between items-center mt-[40px]">
          <div className="flex items-center gap-[10px]">
            <div
              className={`flex justify-center items-center rounded-[50%] w-[37px] h-[37px] border border-borderGray ${
                isOpen ? "" : "ml-[5px]"
              }`}
            >
              <Icon className="w-[21px] h-[21px]" color="#000000" name="Chat" />
            </div>
            <p
              className={`text-[#858585] font-[600] ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Чаты
            </p>
          </div>
          <div className="rounded-[50%] text-[14px] w-[26px] h-[26px] bg-[#F0EFEF] text-[#0B0B0B] font-[600] relative flex justify-center items-center">
            <p className="mt-[1px]">8</p>
            <Icon name="RedDot" className="absolute right-0 bottom-0" />
          </div>
        </div>

        <div
          className={`flex justify-between items-center bg-[#F1F1F1] rounded-[31px] max-w-[90px] w-full p-[6px] mt-[36px] ${
            isOpen ? "" : "flex-col"
          }`}
        >
          <div className="flex justify-center items-center rounded-[50%] bg-transparent w-[36px] h-[36px]">
            <Icon name="Moon" />
          </div>
          <div className="flex justify-center items-center rounded-[50%] bg-white w-[36px] h-[36px]">
            <Icon name="Sun" />
          </div>
        </div>

        <Link
          to="/profile"
          className={`w-full border border-borderGray pr-0 mt-[16px] flex items-center gap-[9px] ${
            isOpen
              ? "p-[10px] rounded-[20px] h-[62px]"
              : "border-none pl-[5px] rounded-[8px] h-[55px]"
          } ${path === "/profile" ? "bg-blueSideBarActive" : "bg-transparent"}`}
        >
          <div className="rounded-[50%] text-[14px] w-[40px]  h-[40px] bg-[#F0EFEF] text-[#0B0B0B] font-[600] relative flex justify-center items-center">
            <img
              src={user?.avatar ?? staff}
              alt="ава"
              className="h-full w-full object-cover rounded-[50%]"
            />
            <Icon name="GreenDot" className="absolute right-0 bottom-0" />
          </div>
          <div className={`flex flex-col ${isOpen ? "" : "hidden"} w-[160px]`}>
            <p
              className={` font-[600] leading-[24px] text-[15px] truncate ${
                path === "/profile" ? "text-white" : "text-[#0B0B0B]"
              }`}
            >
              {user?.fio}
            </p>
            <p
              className={` font-[600] leading-[18px] text-[12px] truncate ${
                path === "/profile" ? "text-white" : "text-[#858585]"
              }`}
            >
              {user?.email}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
