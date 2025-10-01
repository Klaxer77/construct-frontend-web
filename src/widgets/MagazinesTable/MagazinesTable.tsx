import { useState } from "react";
import { Button, StatusItem } from "../../shared";
import { columns, data } from "./data";

export const MagazinesTable = () => {
  const [activeTab, setActiveTab] = useState<
    "work" | "quality" | "security" | "docs"
  >("work");
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex items-center gap-[10px]">
        <Button
          text="Работы"
          onClick={() => setActiveTab("work")}
          style={activeTab === "work" ? "blue" : "white"}
          className="h-[45px] text-[16px]"
        />
        <Button
          text="Контроль качества"
          onClick={() => setActiveTab("quality")}
          style={activeTab === "quality" ? "blue" : "white"}
          className="h-[45px] text-[16px]"
        />
        <Button
          text="Безопасность и условия труда"
          onClick={() => setActiveTab("security")}
          style={activeTab === "security" ? "blue" : "white"}
          className="h-[45px] text-[16px]"
        />
        <Button
          text="Документация и акты"
          onClick={() => setActiveTab("docs")}
          style={activeTab === "docs" ? "blue" : "white"}
          className="h-[45px] text-[16px]"
        />
      </div>
      <div className="w-full flex flex-col gap-[8px]">
        <div
          className="grid  items-center bg-[#F9F8F8] border border-borderGray rounded-t-[10px] h-[52px]"
          style={{
            gridTemplateColumns: " 1fr 1fr 1fr 0.5fr 1fr 0.5fr",
          }}
        >
          {columns.map((col, index) => (
            <div
              key={String(col.key) + index}
              className=" px-[16px] font-[700] text-[16px] leading-[24px] tracking-[-0.2px] text-[#969696] border-r border-borderGray last:border-0 h-full flex items-center"
            >
              {col.title || ""}
            </div>
          ))}
        </div>
        {data.map((row, index) => {
          return (
            <div
              key={index}
              className="grid  items-center border-b border-borderGray h-[64px]"
              style={{
                gridTemplateColumns: " 1fr 1fr 1fr 0.5fr 1fr 0.5fr ",
              }}
            >
              <div className=" px-[16px] font-[800] text-[16px] leading-[24px] tracking-[-0.2px] text-[#413F3F]">
                {row.name}
              </div>

              <div className=" px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757]">
                {row.responsible}
              </div>
              <div className=" px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757]">
                {row.date}
              </div>
              <div className=" px-[16px]">
                <StatusItem text={row.status} status="lightBlue" />
              </div>

              <div className=" px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#413F3F]">
                {row.id}
              </div>
              <div className="px-[16px] flex justify-end">
                <Button text="Открыть" onClick={() => {}} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
