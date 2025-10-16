import { Link, useLocation } from "react-router";
import { Icon, RoundButton, SearchInput } from "../../shared";
import { useEffect, useState } from "react";
import { navTabs } from "./tabs";

interface NavBarProps {
  sidebarWidth: string;
}

export const NavBar = ({ sidebarWidth }: NavBarProps) => {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathnames = location.pathname.split("/").filter(Boolean);

  let breadcrumbs;

  if (location.pathname.startsWith("/objects/activation")) {
    breadcrumbs = navTabs
      .filter((tab) => tab.path === "/objects")
      .map((tab) => ({ name: tab.name, path: tab.path }));
  } else {
    breadcrumbs = pathnames
      .filter((value) => !["remark", "violation", "material"].includes(value))

      .map((value, index, arr) => {
        const path = "/" + pathnames.slice(0, index + 1).join("/");
        const route = navTabs.find((r) => r.path === path);

        const isLast = index === arr.length - 1;
        const name =
          route?.name || (isLast ? decodeURIComponent(value) : value);

        return { name, path };
      })
      .filter(Boolean);
  }

  return (
    <nav
      className={`fixed top-0 h-[78px] px-[25px] bg-white flex items-center justify-between transition-all duration-300 z-50 ${
        isScrolled && "shadow-[0px_2px_9.7px_0px_#0000000A]"
      }`}
      style={{ width: `calc(100vw - ${sidebarWidth})` }}
    >
      <div className="flex items-center gap-[4px]">
        <Icon name="Logo" />

        <div className="flex items-center gap-[8px]">
          {breadcrumbs.map((crumb) => (
            <div key={crumb.path} className="flex items-center gap-[8px]">
              <Icon name="TickRight" />

              <Link
                to={crumb.path}
                className="font-[700] text-[16px] leading-[24px] tracking-[-0.2px] text-[#686868]"
              >
                {crumb.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className=" flex items-center gap-[20px]">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Введите запрос или команду (Ctrl + G)"
        />
        <RoundButton
          icon={<Icon name="Notification" />}
          onClick={() => {}}
          hasNotification
        />
      </div>
    </nav>
  );
};
