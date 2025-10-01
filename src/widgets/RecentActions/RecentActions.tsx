import { useState } from "react";
import { StatusItem } from "../../shared";

interface ListItems {
  text: string;
  status: "users" | "workLog" | "materials";
  time: string;
  owner: "me" | "employee";
}

interface RecentActionsProps {
  data: ListItems[];
}

export const RecentActions = ({ data }: RecentActionsProps) => {
  const [activeTab, setActiveTab] = useState<"me" | "employee">("me");

  const statusMap = {
    users: { text: "Пользователи", color: "green" },
    workLog: { text: "Журнал работ", color: "blue" },
    materials: { text: "Материалы", color: "red" },
  } as const;

  const filteredData = data.filter((item) => item.owner === activeTab);

  const buttons: { id: "me" | "employee"; text: string }[] = [
    { id: "me", text: "Мои" },
    { id: "employee", text: "Сотрудники" },
  ];

  return (
    <div className="py-[24px] rounded-[20px] border border-borderGray shadow-[0px_0px_9.7px_0px_#00000003] h-[312px] flex flex-col w-full">
      <h2 className="font-[700] text-[20px] tracking-[-0.2px] text-blackText ml-[20px]">
        Последние активности
      </h2>
      <div className="ml-[20px] flex items-center gap-[14px] mt-[14px] mb-[30px]">
        {buttons.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(item.id)}
            className={`h-[30px] rounded-[4px] border border-transparent font-[600] text-[12px] leading-[14px] tracking-[-0.2px] w-[85px] cursor-pointer transition ${
              activeTab === item.id
                ? "bg-[#D0F4FF] text-[#093E8C]"
                : " !border-borderGray text-gray"
            }`}
          >
            {item.text}
          </button>
        ))}
      </div>

      <div className="ml-[20px] mr-[10px] flex flex-col gap-[16px] overflow-y-auto">
        {filteredData.map((item, index) => {
          const { text, color } = statusMap[item.status];
          return (
            <div
              key={index}
              className="flex items-center justify-between pb-[12px] border-b-[0.5px] border-borderGray w-[99%]"
            >
              <p className="w-[40%] text-blackText font-[600] text-[14px] leading-[24px] tracking-[-0.4px]">
                {item.text}
              </p>
              <StatusItem text={text} status={color} />
              <p className="font-[600] text-[14px] leading-[24px] tracking-[-0.4px] text-darkGray">
                {item.time}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
