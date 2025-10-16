import type { ReactNode } from "react";
import { useState } from "react";
import { NavBar, SideBar } from "../widgets";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div
        className={`transition-all duration-300 ${
          isOpen ? "ml-[274px]" : "ml-[70px]"
        }`}
      >
        <NavBar sidebarWidth={isOpen ? "274px" : "70px"} />
        <main className="pt-[78px] px-[30px] pb-[30px] min-h-dvh">{children}</main>
      </div>
    </>
  );
};
